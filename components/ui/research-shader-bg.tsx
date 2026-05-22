"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Aurora-style shader background adapted for A-STAR stellar-blue palette.
// Adapted from the aurora shader template — colors shifted to deep blue/indigo.
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

    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime:       { value: 0 },
        iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
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
          float res = mix(mix(rand(ip),rand(ip+vec2(1,0)),u.x),mix(rand(ip+vec2(0,1)),rand(ip+vec2(1,1)),u.x),u.y);
          return res * res;
        }
        float fbm(vec2 x) {
          float v=0., a=0.3;
          vec2 shift=vec2(100);
          mat2 rot=mat2(cos(.5),sin(.5),-sin(.5),cos(.5));
          for(int i=0;i<NUM_OCTAVES;++i){ v+=a*noise(x); x=rot*x*2.+shift; a*=.4; }
          return v;
        }

        void main() {
          vec2 shake = vec2(sin(iTime*1.2)*0.005, cos(iTime*2.1)*0.005);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5)
                   / iResolution.y * mat2(6.0,-4.0,4.0,6.0);
          vec2 v;
          vec4 o = vec4(0.0);
          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          for(float i = 0.; i < 35.; i++) {
            v = p + cos(i*i + (iTime + p.x*0.08)*0.025 + i*vec2(13,11))*3.5
                + vec2(sin(iTime*3.+i)*0.003, cos(iTime*3.5-i)*0.003);
            float tailNoise = fbm(v + vec2(iTime*0.5, i)) * 0.3 * (1.0 - (i/35.0));

            // A-STAR palette: deep blue / indigo aurora
            vec4 auroraColors = vec4(
              0.03 + 0.10 * sin(i * 0.2 + iTime * 0.4),
              0.10 + 0.20 * cos(i * 0.3 + iTime * 0.5),
              0.55 + 0.45 * sin(i * 0.4 + iTime * 0.3),
              1.0
            );
            vec4 contrib = auroraColors
              * exp(sin(i*i + iTime*0.8))
              / length(max(v, vec2(v.x*f*0.015, v.y*1.5)));
            float thin = smoothstep(0., 1., i/35.) * 0.6;
            o += contrib * (1.0 + tailNoise*0.8) * thin;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          // Tint output toward stellar-blue, keep alpha at 0.82 for subtlety
          gl_FragColor = vec4(o.rgb * 1.3, o.a * 0.82);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      material.uniforms.iTime.value += 0.012;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.iResolution.value.set(w, h);
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}
