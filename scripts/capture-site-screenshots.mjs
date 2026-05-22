#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium, devices } from "playwright";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { imageSize } from "image-size";

const DEFAULT_SITE_URL = "https://a-starlab.com";
const SITE_URL = normalizeSiteUrl(process.env.SITE_URL || DEFAULT_SITE_URL);
const ROOT_DIR = process.cwd();
const OUTPUT_ROOT = path.join(ROOT_DIR, "site-review-output");
const OUTPUT_DIRS = {
  desktop: path.join(OUTPUT_ROOT, "desktop"),
  mobile: path.join(OUTPUT_ROOT, "mobile"),
  pdf: path.join(OUTPUT_ROOT, "pdf"),
  report: path.join(OUTPUT_ROOT, "report"),
};

const PDF_PATHS = {
  desktop: path.join(OUTPUT_DIRS.pdf, "A-STAR-desktop-screenshots.pdf"),
  mobile: path.join(OUTPUT_DIRS.pdf, "A-STAR-mobile-screenshots.pdf"),
  combined: path.join(OUTPUT_DIRS.pdf, "A-STAR-desktop-mobile-screenshots.pdf"),
};

const REPORT_PATHS = {
  markdown: path.join(OUTPUT_DIRS.report, "screenshot-capture-report.md"),
  json: path.join(OUTPUT_DIRS.report, "screenshot-capture-report.json"),
};

const MAIN_ROUTES = [
  { index: "01", name: "Home", slug: "home", route: "/" },
  { index: "02", name: "Projects", slug: "projects", route: "/research" },
  { index: "03", name: "Team", slug: "team", route: "/team" },
  { index: "04", name: "News & Events", slug: "news-events", route: "/events" },
  { index: "05", name: "Contact", slug: "contact", route: "/contact" },
  { index: "06", name: "GoNoGoNet", slug: "gonogonet", route: "/projects/gonogonet" },
  { index: "07", name: "MOSI", slug: "mosi", route: "/projects/mosi" },
  { index: "08", name: "SIRIS", slug: "siris", route: "/projects/siris" },
];

const LEGACY_ROUTES = ["/projects", "/resources", "/join", "/news", "/publications"];

const CAPTURE_CSS = `
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  scroll-behavior: auto !important;
}

[data-cursor],
[data-custom-cursor],
[data-scroll-progress],
.cursor,
.custom-cursor,
.customCursor,
.scroll-progress,
#cursor,
#custom-cursor,
#scroll-progress,
#nprogress {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
`;

const mobileDevice = devices["iPhone 14 Pro"] || {
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  viewport: { width: 393, height: 852 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
};

const VIEWPORTS = [
  {
    key: "desktop",
    name: "Desktop",
    contextOptions: {
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    },
  },
  {
    key: "mobile",
    name: "Mobile",
    contextOptions: mobileDevice,
  },
];

await main();

async function main() {
  console.log(`Capturing A-STAR screenshots from ${SITE_URL}`);
  await ensureOutputFolders();
  await removeStaleKnownOutputs();

  const browser = await chromium.launch({ headless: true });
  const startedAt = new Date();
  const mainResults = [];
  let legacyResults = [];
  const pdfResults = [];

  try {
    for (const viewport of VIEWPORTS) {
      const context = await createContext(browser, viewport.contextOptions);

      try {
        for (const routeConfig of MAIN_ROUTES) {
          const result = await captureMainRoute(context, viewport, routeConfig);
          mainResults.push(result);
          logMainResult(result);
        }
      } finally {
        await context.close();
      }
    }

    legacyResults = await probeLegacyRoutes(browser);
    for (const result of legacyResults) {
      logLegacyResult(result);
    }

    const desktopCaptures = mainResults.filter(
      (result) => result.viewportKey === "desktop" && result.status === "captured",
    );
    const mobileCaptures = mainResults.filter(
      (result) => result.viewportKey === "mobile" && result.status === "captured",
    );

    pdfResults.push(await writePdf(PDF_PATHS.desktop, desktopCaptures));
    pdfResults.push(await writePdf(PDF_PATHS.mobile, mobileCaptures));
    pdfResults.push(await writePdf(PDF_PATHS.combined, [...desktopCaptures, ...mobileCaptures]));

    const report = buildReport({
      startedAt,
      completedAt: new Date(),
      mainResults,
      legacyResults,
      pdfResults,
    });

    await fs.writeFile(REPORT_PATHS.json, `${JSON.stringify(report, null, 2)}\n`);
    await fs.writeFile(REPORT_PATHS.markdown, renderMarkdownReport(report));

    const desktopCount = desktopCaptures.length;
    const mobileCount = mobileCaptures.length;
    const failedMain = mainResults.filter((result) => result.status !== "captured");

    console.log("");
    console.log(`Desktop screenshots captured: ${desktopCount}/${MAIN_ROUTES.length}`);
    console.log(`Mobile screenshots captured: ${mobileCount}/${MAIN_ROUTES.length}`);
    console.log(`Report: ${toRelativePath(REPORT_PATHS.markdown)}`);

    if (failedMain.length > 0) {
      console.warn("");
      console.warn("Failed main route captures:");
      for (const result of failedMain) {
        console.warn(`- ${result.viewportName} ${result.route}: ${result.error || result.status}`);
      }
    }

    if (desktopCount + mobileCount === 0) {
      console.error("No screenshots were captured.");
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

async function ensureOutputFolders() {
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  await Promise.all(Object.values(OUTPUT_DIRS).map((dir) => fs.mkdir(dir, { recursive: true })));
}

async function removeStaleKnownOutputs() {
  const knownFiles = [
    ...Object.values(PDF_PATHS),
    ...Object.values(REPORT_PATHS),
    ...VIEWPORTS.flatMap((viewport) =>
      MAIN_ROUTES.map((routeConfig) => screenshotPath(viewport, routeConfig)),
    ),
  ];

  await Promise.all(
    knownFiles.map(async (filePath) => {
      try {
        await fs.unlink(filePath);
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
    }),
  );
}

async function createContext(browser, contextOptions) {
  const context = await browser.newContext({
    ...contextOptions,
    serviceWorkers: "block",
  });

  context.setDefaultNavigationTimeout(60000);
  context.setDefaultTimeout(60000);

  await context.addInitScript((cssText) => {
    const installCaptureStyles = () => {
      if (document.querySelector("style[data-a-star-capture-styles]")) {
        return;
      }

      const style = document.createElement("style");
      style.setAttribute("data-a-star-capture-styles", "true");
      style.textContent = cssText;
      (document.head || document.documentElement).appendChild(style);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", installCaptureStyles, { once: true });
    } else {
      installCaptureStyles();
    }
  }, CAPTURE_CSS);

  return context;
}

async function captureMainRoute(context, viewport, routeConfig) {
  const page = await context.newPage();
  const targetUrl = routeToUrl(routeConfig.route);
  const outputPath = screenshotPath(viewport, routeConfig);
  const titleLabel = formatTitle(viewport.name, routeConfig.name, routeConfig.route);

  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const loaded = await loadRoute(page, targetUrl);

    if (!loaded.ok) {
      return {
        type: "main",
        status: "failed",
        viewportKey: viewport.key,
        viewportName: viewport.name,
        route: routeConfig.route,
        name: routeConfig.name,
        titleLabel,
        targetUrl,
        finalUrl: loaded.finalUrl,
        httpStatus: loaded.httpStatus,
        error: loaded.error,
        screenshotPath: null,
      };
    }

    if (!isSuccessfulStatus(loaded.httpStatus)) {
      return {
        type: "main",
        status: "failed",
        viewportKey: viewport.key,
        viewportName: viewport.name,
        route: routeConfig.route,
        name: routeConfig.name,
        titleLabel,
        targetUrl,
        finalUrl: loaded.finalUrl,
        httpStatus: loaded.httpStatus,
        error: `HTTP ${loaded.httpStatus}`,
        screenshotPath: null,
        warnings: loaded.warnings,
      };
    }

    await page.screenshot({
      path: outputPath,
      fullPage: true,
      scale: "css",
      timeout: 60000,
    });

    const dimensions = imageSize(await fs.readFile(outputPath));

    return {
      type: "main",
      status: "captured",
      viewportKey: viewport.key,
      viewportName: viewport.name,
      route: routeConfig.route,
      name: routeConfig.name,
      titleLabel,
      targetUrl,
      finalUrl: loaded.finalUrl,
      httpStatus: loaded.httpStatus,
      pageTitle: loaded.pageTitle,
      screenshotPath: toRelativePath(outputPath),
      width: dimensions.width,
      height: dimensions.height,
      warnings: loaded.warnings,
    };
  } catch (error) {
    return {
      type: "main",
      status: "failed",
      viewportKey: viewport.key,
      viewportName: viewport.name,
      route: routeConfig.route,
      name: routeConfig.name,
      titleLabel,
      targetUrl,
      finalUrl: page.url() || null,
      httpStatus: null,
      error: formatError(error),
      screenshotPath: null,
    };
  } finally {
    await page.close();
  }
}

async function probeLegacyRoutes(browser) {
  const context = await createContext(browser, VIEWPORTS[0].contextOptions);
  const results = [];

  try {
    for (const route of LEGACY_ROUTES) {
      const page = await context.newPage();
      const targetUrl = routeToUrl(route);

      try {
        await page.emulateMedia({ reducedMotion: "reduce" });
        const loaded = await loadRoute(page, targetUrl);
        const finalUrl = loaded.finalUrl || page.url() || null;
        const redirected = finalUrl ? normalizeComparableUrl(finalUrl) !== normalizeComparableUrl(targetUrl) : false;

        results.push({
          type: "legacy",
          route,
          status: loaded.ok && isSuccessfulStatus(loaded.httpStatus) ? "resolved" : "failed",
          targetUrl,
          finalUrl,
          finalPath: finalUrl ? urlToPath(finalUrl) : null,
          redirected,
          httpStatus: loaded.httpStatus,
          pageTitle: loaded.pageTitle,
          includedInPdf: false,
          error: loaded.ok && isSuccessfulStatus(loaded.httpStatus) ? null : loaded.error || `HTTP ${loaded.httpStatus}`,
          warnings: loaded.warnings,
        });
      } catch (error) {
        results.push({
          type: "legacy",
          route,
          status: "failed",
          targetUrl,
          finalUrl: page.url() || null,
          finalPath: page.url() ? urlToPath(page.url()) : null,
          redirected: false,
          httpStatus: null,
          pageTitle: null,
          includedInPdf: false,
          error: formatError(error),
          warnings: [],
        });
      } finally {
        await page.close();
      }
    }
  } finally {
    await context.close();
  }

  return results;
}

async function loadRoute(page, targetUrl) {
  const warnings = [];
  let response = null;

  try {
    response = await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  } catch (error) {
    return {
      ok: false,
      finalUrl: page.url() || null,
      httpStatus: null,
      pageTitle: null,
      error: formatError(error),
      warnings,
    };
  }

  try {
    await page.waitForLoadState("networkidle", { timeout: 15000 });
  } catch (error) {
    warnings.push(`networkidle wait skipped: ${formatError(error)}`);
  }

  try {
    await page.addStyleTag({ content: CAPTURE_CSS });
  } catch (error) {
    warnings.push(`style injection after load failed: ${formatError(error)}`);
  }

  await page.waitForTimeout(1000);

  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (error) {
    warnings.push(`scroll reset failed: ${formatError(error)}`);
  }

  return {
    ok: true,
    finalUrl: page.url(),
    httpStatus: response ? response.status() : null,
    pageTitle: await page.title().catch(() => null),
    error: null,
    warnings,
  };
}

async function writePdf(filePath, captures) {
  if (captures.length === 0) {
    return {
      path: toRelativePath(filePath),
      status: "skipped",
      pages: 0,
      reason: "No screenshots captured for this PDF.",
    };
  }

  const pdfDoc = await PDFDocument.create();
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const labelColor = rgb(0.08, 0.1, 0.14);

  for (const capture of captures) {
    const imagePath = path.join(ROOT_DIR, capture.screenshotPath);
    const imageBytes = await fs.readFile(imagePath);
    const dimensions = imageSize(imageBytes);
    const image = await pdfDoc.embedPng(imageBytes);
    const imageWidth = dimensions.width || image.width;
    const imageHeight = dimensions.height || image.height;
    const pxToPt = 0.75;
    const margin = 36;
    const titleBlockHeight = 46;
    const maxImageWidth = capture.viewportKey === "desktop" ? 1080 : 360;
    const drawnWidth = Math.min(imageWidth * pxToPt, maxImageWidth);
    const scale = drawnWidth / imageWidth;
    const drawnHeight = imageHeight * scale;
    const pageWidth = drawnWidth + margin * 2;
    const pageHeight = drawnHeight + titleBlockHeight + margin * 2;
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    page.drawText(capture.titleLabel, {
      x: margin,
      y: pageHeight - margin - 14,
      size: 14,
      font: titleFont,
      color: labelColor,
    });

    page.drawImage(image, {
      x: margin,
      y: margin,
      width: drawnWidth,
      height: drawnHeight,
    });
  }

  await fs.writeFile(filePath, await pdfDoc.save());

  return {
    path: toRelativePath(filePath),
    status: "written",
    pages: captures.length,
  };
}

function buildReport({ startedAt, completedAt, mainResults, legacyResults, pdfResults }) {
  const desktopCaptured = mainResults.filter(
    (result) => result.viewportKey === "desktop" && result.status === "captured",
  ).length;
  const mobileCaptured = mainResults.filter(
    (result) => result.viewportKey === "mobile" && result.status === "captured",
  ).length;
  const failedMainRoutes = mainResults.filter((result) => result.status !== "captured");

  return {
    generatedAt: completedAt.toISOString(),
    startedAt: startedAt.toISOString(),
    completedAt: completedAt.toISOString(),
    siteUrl: SITE_URL,
    counts: {
      expectedPerViewport: MAIN_ROUTES.length,
      desktopCaptured,
      mobileCaptured,
      failedMainRoutes: failedMainRoutes.length,
      legacyRoutesProbed: legacyResults.length,
    },
    output: {
      root: toRelativePath(OUTPUT_ROOT),
      desktop: toRelativePath(OUTPUT_DIRS.desktop),
      mobile: toRelativePath(OUTPUT_DIRS.mobile),
      pdf: toRelativePath(OUTPUT_DIRS.pdf),
      report: toRelativePath(OUTPUT_DIRS.report),
    },
    pdfs: pdfResults,
    mainRoutes: mainResults,
    legacyRoutes: legacyResults,
    failedRoutes: failedMainRoutes.map((result) => ({
      viewport: result.viewportName,
      route: result.route,
      error: result.error || result.status,
      httpStatus: result.httpStatus,
      finalUrl: result.finalUrl,
    })),
  };
}

function renderMarkdownReport(report) {
  const lines = [
    "# A-STAR Screenshot Capture Report",
    "",
    `Generated: ${report.generatedAt}`,
    `SITE_URL: ${report.siteUrl}`,
    `Output folder: ${report.output.root}`,
    "",
    "## Summary",
    "",
    `- Desktop screenshots: ${report.counts.desktopCaptured}/${report.counts.expectedPerViewport}`,
    `- Mobile screenshots: ${report.counts.mobileCaptured}/${report.counts.expectedPerViewport}`,
    `- Failed main route captures: ${report.counts.failedMainRoutes}`,
    `- Legacy routes probed: ${report.counts.legacyRoutesProbed}`,
    "",
    "## PDFs",
    "",
    "| PDF | Status | Pages |",
    "| --- | --- | ---: |",
    ...report.pdfs.map((pdf) => `| ${cell(pdf.path)} | ${cell(pdf.status)} | ${pdf.pages} |`),
    "",
    "## Main Routes",
    "",
    "| Viewport | Label | Route | Status | HTTP | Final path | Screenshot | Notes |",
    "| --- | --- | --- | --- | ---: | --- | --- | --- |",
    ...report.mainRoutes.map((result) =>
      [
        cell(result.viewportName),
        cell(result.name),
        cell(result.route),
        cell(result.status),
        result.httpStatus ?? "",
        cell(result.finalUrl ? urlToPath(result.finalUrl) : ""),
        cell(result.screenshotPath || ""),
        cell([result.error, ...(result.warnings || [])].filter(Boolean).join("; ")),
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
    "## Legacy / Redirect Routes",
    "",
    "| Route | Status | HTTP | Final path | Redirected | Included in PDFs | Notes |",
    "| --- | --- | ---: | --- | --- | --- | --- |",
    ...report.legacyRoutes.map((result) =>
      [
        cell(result.route),
        cell(result.status),
        result.httpStatus ?? "",
        cell(result.finalPath || ""),
        result.redirected ? "yes" : "no",
        result.includedInPdf ? "yes" : "no",
        cell([result.error, ...(result.warnings || [])].filter(Boolean).join("; ")),
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
  ];

  if (report.failedRoutes.length > 0) {
    lines.push("## Failed Routes", "");
    for (const failure of report.failedRoutes) {
      lines.push(
        `- ${failure.viewport} ${failure.route}: ${failure.error || "failed"}${
          failure.httpStatus ? ` (HTTP ${failure.httpStatus})` : ""
        }`,
      );
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function screenshotPath(viewport, routeConfig) {
  return path.join(
    OUTPUT_DIRS[viewport.key],
    `${routeConfig.index}-${routeConfig.slug}-${viewport.key}.png`,
  );
}

function routeToUrl(route) {
  return new URL(route, `${SITE_URL}/`).href;
}

function normalizeSiteUrl(value) {
  const parsed = new URL(value);
  return parsed.href.replace(/\/+$/, "");
}

function normalizeComparableUrl(value) {
  return value.replace(/\/+$/, "");
}

function urlToPath(value) {
  try {
    const parsed = new URL(value);
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return value;
  }
}

function isSuccessfulStatus(status) {
  return status === null || (status >= 200 && status < 400);
}

function formatTitle(viewportName, pageName, route) {
  return `${viewportName} \u2014 ${pageName} \u2014 ${route}`;
}

function formatError(error) {
  if (!error) {
    return "Unknown error";
  }

  return error.message || String(error);
}

function toRelativePath(filePath) {
  return path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
}

function cell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

function logMainResult(result) {
  if (result.status === "captured") {
    console.log(
      `[${result.viewportKey}] captured ${result.route} -> ${result.screenshotPath} (${result.width}x${result.height})`,
    );
    return;
  }

  console.warn(`[${result.viewportKey}] failed ${result.route}: ${result.error || result.status}`);
}

function logLegacyResult(result) {
  const landed = result.finalPath || result.finalUrl || "unknown";
  console.log(`[legacy] ${result.route} -> ${landed} (${result.status})`);
}
