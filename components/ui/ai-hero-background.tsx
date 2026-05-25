"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";

// Neural dot field — 56×56 hexagonal grid, radial position wave, UnrealBloom + subtle RGB shift.
// Starts immediately; IntersectionObserver toggles a `paused` flag to skip renders off-screen.
export function AiHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    let cleanup: (() => void) | undefined;

    try {
      while (container.firstChild) container.removeChild(container.firstChild);

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      const w0 = Math.max(1, container.clientWidth);
      const h0 = Math.max(1, container.clientHeight);
      renderer.setSize(w0, h0);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera();

      const bloom = new UnrealBloomPass(new THREE.Vector2(w0, h0), 0.45, 0.7, 0.18);
      const rgbShift = new ShaderPass(RGBShiftShader);
      rgbShift.uniforms["amount"].value = 0.0008;
      rgbShift.uniforms["angle"].value = Math.PI / 3;
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(bloom);
      composer.addPass(rgbShift);

      // 56×56 = 3136 dots — visible density without overloading the GPU
      const COLS = 56;
      const ROWS = 56;
      const SPACING = 0.65;
      const JITTER = 0.28;
      const HEX_OFFSET = 0.5;
      const total = COLS * ROWS;

      const geometry = new THREE.CircleGeometry(0.025, 7);
      const material = new THREE.MeshBasicMaterial({ color: 0x64b5f6 });
      const dots = new THREE.InstancedMesh(geometry, material, total);
      dots.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(dots);

      const basePos = new Float32Array(total * 2);
      const distArr = new Float32Array(total);
      const angArr  = new Float32Array(total);
      const dummy = new THREE.Object3D();
      const xOff = (COLS - 1) * SPACING * 0.5;
      const yOff = (ROWS - 1) * SPACING * 0.5;

      let idx = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++, idx++) {
          const x = c * SPACING - xOff + (c % 2) * HEX_OFFSET * SPACING + (Math.random() - 0.5) * JITTER;
          const y = r * SPACING - yOff + (Math.random() - 0.5) * JITTER;
          basePos[idx * 2]     = x;
          basePos[idx * 2 + 1] = y;
          const len = Math.hypot(x, y);
          const ang = Math.atan2(y, x);
          distArr[idx] = len + 0.75 * Math.cos(ang * 8.0);
          angArr[idx]  = ang;
          dummy.position.set(x, y, 0);
          dummy.updateMatrix();
          dots.setMatrixAt(idx, dummy.matrix);
        }
      }
      dots.instanceMatrix.needsUpdate = true;

      // Rounded square wave: softer than sine, gives that neural-pulse stepped feel
      function rsw(t: number, delta: number, a: number, f: number) {
        return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
      }

      const mat4 = new THREE.Matrix4();
      let animId = 0;
      let paused = false;
      let lastT  = performance.now();
      let elapsed = 0;

      function animate(now: number) {
        animId = requestAnimationFrame(animate);
        if (paused) return;

        // Throttle to ~30fps to keep the main thread free for scrolling
        if (now - lastT < 33) return;
        const dt = Math.min(now - lastT, 100); // clamp so big gaps don't jump
        elapsed += dt * 0.001;
        lastT = now;

        rgbShift.uniforms["amount"].value = 0.0005 + 0.0010 * (Math.sin(elapsed * 0.6) * 0.5 + 0.5);

        for (let i = 0; i < total; i++) {
          const x0   = basePos[i * 2];
          const y0   = basePos[i * 2 + 1];
          const dist = distArr[i];
          // localDelta: tighter wave near center, looser at edges
          const localDelta = THREE.MathUtils.lerp(0.05, 0.2, Math.min(1, dist / 70));
          const tt = elapsed * 0.5 - dist * 0.035;
          const k  = 1 + rsw(tt, localDelta, 0.75, 0.3);
          // Radial position wave: dots expand outward from origin
          mat4.set(1, 0, 0, x0 * k, 0, 1, 0, y0 * k, 0, 0, 1, 0, 0, 0, 0, 1);
          dots.setMatrixAt(i, mat4);
        }
        dots.instanceMatrix.needsUpdate = true;
        composer.render();
      }

      const resizeCamera = () => {
        if (!container) return;
        const w = Math.max(1, container.clientWidth);
        const h = Math.max(1, container.clientHeight);
        const aspect = w / h;
        const wh = 10;
        camera.left   = -(wh * aspect) / 2;
        camera.right  =  (wh * aspect) / 2;
        camera.top    =   wh / 2;
        camera.bottom =  -wh / 2;
        camera.near   = -100;
        camera.far    =  100;
        camera.position.set(0, 0, 10);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer.setSize(w, h);
        bloom.setSize(w, h);
      };

      const resizeObs = new ResizeObserver(resizeCamera);
      resizeObs.observe(container);
      resizeCamera();

      // Start immediately — don't defer to IO (IO fires async and can miss initial state)
      animId = requestAnimationFrame(animate);

      // IO only toggles the paused flag — loop keeps running, renders are skipped
      const io = new IntersectionObserver(
        (entries) => { paused = !entries[0].isIntersecting; },
        { threshold: 0 },
      );
      io.observe(container);

      cleanup = () => {
        io.disconnect();
        resizeObs.disconnect();
        cancelAnimationFrame(animId);
        while (container.firstChild) container.removeChild(container.firstChild);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.warn("AiHeroBackground: WebGL setup failed", err);
    }

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}
