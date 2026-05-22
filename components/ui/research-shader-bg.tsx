"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Aurora-style shader — simplified to 20 loop iterations (was 35) and paused off-screen.
export function ResearchShaderBg() {
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
      const scene    = new THREE.Scene();
      const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
      const w0 = Math.max(1, container.clientWidth);
      const h0 = Math.max(1, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      renderer.setSize(w0, h0);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          iTime:       { value: 0 },
          iResolution: { value: new THREE.Vector2(w0, h0) },
        },
        transparent: true,
        vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
        fragmentShader: /* glsl */ `
          uniform float iTime;
          uniform vec2 iResolution;

          #define NUM_OCTAVES 3

          float rand(vec2 n) {
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
          }
          float noise(vec2 p) {
            vec2 ip = floor(p), u = fract(p);
            u = u*u*(3.0-2.0*u);
            return mix(mix(rand(ip),rand(ip+vec2(1,0)),u.x),mix(rand(ip+vec2(0,1)),rand(ip+vec2(1,1)),u.x),u.y);
          }
          float fbm(vec2 x) {
            float v=0., a=0.3;
            vec2 shift=vec2(100);
            mat2 rot=mat2(cos(.5),sin(.5),-sin(.5),cos(.5));
            for(int i=0;i<NUM_OCTAVES;++i){ v+=a*noise(x); x=rot*x*2.+shift; a*=.4; }
            return v;
          }

          void main() {
            vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y
                     * mat2(6.0,-4.0,4.0,6.0);
            vec2 v;
            vec4 o = vec4(0.0);
            float f = 2.0 + fbm(p + vec2(iTime * 3.0, 0.0)) * 0.5;

            for(float i = 0.; i < 20.; i++) {
              v = p + cos(i*i + (iTime + p.x*0.08)*0.025 + i*vec2(13,11))*3.5;
              vec4 auroraColors = vec4(
                0.03 + 0.08 * sin(i * 0.2 + iTime * 0.4),
                0.08 + 0.16 * cos(i * 0.3 + iTime * 0.5),
                0.50 + 0.40 * sin(i * 0.4 + iTime * 0.3),
                1.0
              );
              float thin = smoothstep(0., 1., i/20.) * 0.6;
              o += auroraColors * exp(sin(i*i + iTime*0.6)) / length(max(v, vec2(v.x*f*0.015, v.y*1.5))) * thin;
            }

            o = tanh(pow(o / 80.0, vec4(1.6)));
            gl_FragColor = vec4(o.rgb * 1.2, o.a * 0.75);
          }
        `,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));

      let frameId = 0;
      let lastT = 0;

      const animate = (now: number) => {
        frameId = requestAnimationFrame(animate);
        // Throttle to ~30fps
        if (now - lastT < 33) return;
        material.uniforms.iTime.value += (now - lastT) * 0.001 * 0.8;
        lastT = now;
        renderer.render(scene, camera);
      };

      const handleResize = () => {
        if (!container) return;
        const w = Math.max(1, container.clientWidth);
        const h = Math.max(1, container.clientHeight);
        renderer.setSize(w, h);
        material.uniforms.iResolution.value.set(w, h);
      };
      const resizeObs = new ResizeObserver(handleResize);
      resizeObs.observe(container);

      // Pause when off-screen
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!frameId) {
            lastT = performance.now();
            frameId = requestAnimationFrame(animate);
          }
        } else {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      }, { threshold: 0 });
      io.observe(container);

      cleanup = () => {
        io.disconnect();
        resizeObs.disconnect();
        cancelAnimationFrame(frameId);
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.warn("ResearchShaderBg: WebGL setup failed", err);
    }

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}
