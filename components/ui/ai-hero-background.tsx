"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

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

      const bloom = new UnrealBloomPass(new THREE.Vector2(w0, h0), 0.4, 0.7, 0.2);
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(bloom);

      // Reduced grid: 48×48 = 2304 particles (was 72×72 = 5184)
      const COLS = 48;
      const ROWS = 48;
      const SPACING = 0.65;
      const JITTER = 0.28;
      const total = COLS * ROWS;

      const geometry = new THREE.CircleGeometry(0.025, 6);
      const material = new THREE.MeshBasicMaterial({ color: 0x64b5f6 });
      const dots = new THREE.InstancedMesh(geometry, material, total);
      scene.add(dots);

      const basePos = new Float32Array(total * 2);
      const distArr = new Float32Array(total);
      const dummy = new THREE.Object3D();
      const xOff = (COLS - 1) * SPACING * 0.5;
      const yOff = (ROWS - 1) * SPACING * 0.5;

      let idx = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++, idx++) {
          const x = c * SPACING - xOff + (Math.random() - 0.5) * JITTER;
          const y = r * SPACING - yOff + (c % 2) * 0.5 * SPACING + (Math.random() - 0.5) * JITTER;
          basePos[idx * 2] = x;
          basePos[idx * 2 + 1] = y;
          distArr[idx] = Math.hypot(x, y);
          dummy.position.set(x, y, 0);
          dummy.updateMatrix();
          dots.setMatrixAt(idx, dummy.matrix);
        }
      }
      dots.instanceMatrix.needsUpdate = true;

      const mat4 = new THREE.Matrix4();
      const clock = new THREE.Clock();
      let animId: number;

      function animate() {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime() * 0.4;
        for (let i = 0; i < total; i++) {
          const x0 = basePos[i * 2];
          const y0 = basePos[i * 2 + 1];
          const wave = 1 + 0.6 * Math.sin(t - distArr[i] * 0.1);
          mat4.set(wave, 0, 0, x0, 0, wave, 0, y0, 0, 0, 1, 0, 0, 0, 0, 1);
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
        camera.left = -(wh * aspect) / 2;
        camera.right = (wh * aspect) / 2;
        camera.top = wh / 2;
        camera.bottom = -wh / 2;
        camera.near = -100;
        camera.far = 100;
        camera.position.set(0, 0, 10);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer.setSize(w, h);
        bloom.setSize(w, h);
      };

      const observer = new ResizeObserver(resizeCamera);
      observer.observe(container);
      resizeCamera();
      animate();

      cleanup = () => {
        observer.disconnect();
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
