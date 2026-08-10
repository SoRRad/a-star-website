"use client";

import { useEffect, useRef, useState } from "react";
import { shouldSkipHeavyEffects } from "@/lib/corporate-safe";

// Aurora-style shader — 20 loop iterations, throttled to ~30fps and paused off-screen.
//
// This draws a single full-screen quad, which is the one job three.js adds nothing to.
// Running it on the raw WebGL2 API instead keeps ~350 kB of three.js off /research.
// The GLSL below is byte-for-byte the shader three.js was compiling, including the
// prelude three injects for ShaderMaterial (see WebGLProgram: it always emits
// `#version 300 es` and aliases gl_FragColor to a `pc_fragColor` out variable), so
// the rendered output is unchanged.

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor

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
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("ResearchShaderBg: shader compile failed", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ResearchShaderBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldSkipHeavyEffects()) return;
    const container = containerRef.current;
    if (!container) return;

    let cleanup: (() => void) | undefined;

    try {
      const canvas = document.createElement("canvas");
      canvas.style.cssText = "display:block;width:100%;height:100%";
      // Matches the three.js WebGLRenderer defaults this replaces.
      const gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        powerPreference: "low-power",
      });
      if (!gl) {
        console.warn("ResearchShaderBg: WebGL2 unavailable");
        return;
      }

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.bindAttribLocation(program, 0, "position");
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn("ResearchShaderBg: program link failed", gl.getProgramInfoLog(program));
        return;
      }
      gl.deleteShader(vs);
      gl.deleteShader(fs);

      // Full-screen quad as a triangle strip — same covered area as the
      // PlaneGeometry(2, 2) it replaces, and the shader only reads gl_FragCoord.
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(program, "iTime");
      const uRes = gl.getUniformLocation(program, "iResolution");

      gl.useProgram(program);
      gl.clearColor(0, 0, 0, 0);
      // three.js NormalBlending with premultipliedAlpha: true
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      container.appendChild(canvas);

      const ratio = Math.min(window.devicePixelRatio, 1);
      let width = 0;
      let height = 0;

      const resize = () => {
        const w = Math.max(1, container.clientWidth);
        const h = Math.max(1, container.clientHeight);
        if (w === width && h === height) return;
        width = w;
        height = h;
        canvas.width = Math.floor(w * ratio);
        canvas.height = Math.floor(h * ratio);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, canvas.width, canvas.height);
      };
      resize();

      let frameId = 0;
      let lastT = 0;
      let iTime = 0;
      let contextLost = false;

      const animate = (now: number) => {
        frameId = requestAnimationFrame(animate);
        // Throttle to ~30fps
        if (now - lastT < 33) return;
        iTime += (now - lastT) * 0.001 * 0.8;
        lastT = now;
        gl.uniform1f(uTime, iTime);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const start = () => {
        if (frameId || contextLost) return;
        lastT = performance.now();
        frameId = requestAnimationFrame(animate);
      };
      const stop = () => {
        cancelAnimationFrame(frameId);
        frameId = 0;
      };

      const resizeObs = new ResizeObserver(resize);
      resizeObs.observe(container);

      // Pause when off-screen
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) start();
          else stop();
        },
        { threshold: 0 },
      );
      io.observe(container);

      // A lost context (GPU reset, tab backgrounded too long) would otherwise
      // leave a permanently blank canvas.
      const onLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        stop();
      };
      const onRestored = () => {
        contextLost = false;
      };
      canvas.addEventListener("webglcontextlost", onLost);
      canvas.addEventListener("webglcontextrestored", onRestored);

      cleanup = () => {
        io.disconnect();
        resizeObs.disconnect();
        stop();
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
        gl.deleteProgram(program);
        gl.deleteBuffer(buffer);
        gl.deleteVertexArray(vao);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        if (canvas.parentNode === container) container.removeChild(canvas);
      };
    } catch (err) {
      console.warn("ResearchShaderBg: WebGL setup failed", err);
    }

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}
