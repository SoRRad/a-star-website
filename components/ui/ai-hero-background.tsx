"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";

// Neural dot field — adapated for A-STAR stellar-blue palette
export function AiHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fade in on mount for smooth page transitions
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
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const w0 = Math.max(1, container.clientWidth);
      const h0 = Math.max(1, container.clientHeight);
      renderer.setSize(w0, h0);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera();

      const renderPass = new RenderPass(scene, camera);
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(w0, h0),
        0.45,
        0.7,
        0.18
      );
      const rgbShift = new ShaderPass(RGBShiftShader);
      rgbShift.uniforms["amount"].value = 0.0008;
      rgbShift.uniforms["angle"].value = Math.PI / 3;

      const composer = new EffectComposer(renderer);
      composer.addPass(renderPass);
      composer.addPass(bloom);
      composer.addPass(rgbShift);

    const GRID = {
      cols: 72,
      rows: 72,
      jitter: 0.28,
      hexOffset: 0.5,
      dotRadius: 0.025,
      spacing: 0.65,
    };

    const total = GRID.cols * GRID.rows;
    const geometry = new THREE.CircleGeometry(GRID.dotRadius, 7);
    // Stellar blue dots
    const material = new THREE.MeshBasicMaterial({ color: 0x64b5f6 });
    const dots = new THREE.InstancedMesh(geometry, material, total);
    dots.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(dots);

    const basePos  = new Float32Array(total * 2);
    const distArr  = new Float32Array(total);
    const dummy    = new THREE.Object3D();
    const xOffset  = (GRID.cols - 1) * GRID.spacing * 0.5;
    const yOffset  = (GRID.rows - 1) * GRID.spacing * 0.5;

    let idx = 0;
    for (let r = 0; r < GRID.rows; r++) {
      for (let c = 0; c < GRID.cols; c++, idx++) {
        let x = c * GRID.spacing - xOffset;
        let y = r * GRID.spacing - yOffset;
        y += (c % 2) * GRID.hexOffset * GRID.spacing;
        x += (Math.random() - 0.5) * GRID.jitter;
        y += (Math.random() - 0.5) * GRID.jitter;
        basePos[idx * 2]     = x;
        basePos[idx * 2 + 1] = y;
        const len = Math.hypot(x, y);
        const ang = Math.atan2(y, x);
        distArr[idx] = len + 0.75 * Math.cos(ang * 8.0);
        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        dots.setMatrixAt(idx, dummy.matrix);
      }
    }

    function roundedSquareWave(t: number, delta: number, a: number, f: number) {
      return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
    }

    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const t    = clock.getElapsedTime();
      const phase = (Math.sin(2 * Math.PI * t * 0.3) + 1) * 0.5;
      rgbShift.uniforms["amount"].value = 0.0005 + phase * 0.0012;

      const mat = new THREE.Matrix4();
      for (let i = 0; i < total; i++) {
        const x0   = basePos[i * 2];
        const y0   = basePos[i * 2 + 1];
        const dist = distArr[i];
        const localDelta = THREE.MathUtils.lerp(0.05, 0.2, Math.min(1, dist / 70));
        const tt = t * 0.5 - dist * 0.035;
        const k  = 1 + roundedSquareWave(tt, localDelta, 0.75, 0.3);
        mat.set(1, 0, 0, x0 * k, 0, 1, 0, y0 * k, 0, 0, 1, 0, 0, 0, 0, 1);
        dots.setMatrixAt(i, mat);
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

      const observer = new ResizeObserver(resizeCamera);
      observer.observe(container);
      resizeCamera();
      animate();

      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(animationFrameId);
        while (container.firstChild) container.removeChild(container.firstChild);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.warn("AiHeroBackground: WebGL setup failed, skipping background", err);
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
