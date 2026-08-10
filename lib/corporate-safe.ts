/**
 * Corporate-safe mode: a reduced-fidelity rendering path for visitors behind
 * corporate web-isolation proxies (e.g. Zscaler Browser Isolation), where
 * WebGL/Three.js, smooth-scroll, and backdrop-filter/mix-blend-mode effects
 * can be unreliable or unsupported.
 *
 * Detection runs synchronously in an inline script (see app/layout.tsx)
 * before hydration, which adds CORPORATE_SAFE_CLASS to <html>. Client
 * components read that class at runtime to skip heavy effects.
 */
export const CORPORATE_SAFE_CLASS = "corporate-safe";

/**
 * Marks the document as JS-capable. Scroll reveals hide their content behind
 * `html.js`, so this class is what arms them — it must be applied before first
 * paint, and the watchdog below strips it again if the app bundle never boots
 * (blocked script, failed chunk, runtime error). Content then renders visible
 * instead of stranding the visitor on a blank page.
 */
export const JS_ENABLED_CLASS = "js";

/** Set by the reveal controller once it has taken over. */
export const REVEAL_BOOTED_FLAG = "__astarRevealBooted";

/** How long to wait for the client bundle before force-revealing content. */
const REVEAL_WATCHDOG_MS = 4000;

/** Inline script source — kept here so detection logic has one source of truth. */
export const corporateSafeDetectScript = `(function(){try{var d=document.documentElement;var h=window.location.hostname||"";var u=window.location.href||"";if(h.indexOf("zscaler.com")!==-1||h.indexOf("isolation.zscaler.com")!==-1||u.indexOf("original_url=")!==-1){d.classList.add("${CORPORATE_SAFE_CLASS}");}d.classList.add("${JS_ENABLED_CLASS}");window.setTimeout(function(){if(!window.${REVEAL_BOOTED_FLAG}){d.classList.remove("${JS_ENABLED_CLASS}");}},${REVEAL_WATCHDOG_MS});}catch(e){}})();`;

export function isCorporateSafe(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains(CORPORATE_SAFE_CLASS);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True when heavy visual effects (WebGL, smooth-scroll, cursor glow) should be skipped. */
export function shouldSkipHeavyEffects(): boolean {
  return isCorporateSafe() || prefersReducedMotion();
}
