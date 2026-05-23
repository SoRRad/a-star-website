"use client";

import { useEffect, useRef, useState } from "react";

// WebGL2 cosmic nebula shader — simplified for performance (3 fbm octaves, 8 main iterations).
// IntersectionObserver pauses rAF when the element is off-screen.
export function TeamShaderBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let cleanup: (() => void) | undefined;

    try {
      const gl = canvas.getContext("webgl2");
      if (!gl) {
        console.warn("TeamShaderBg: WebGL2 unavailable");
        return;
      }

      const vertSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

      // Simplified shader: fbm 3 octaves (was 5), main loop 8 iterations (was 12)
      const fragSrc = `#version 300 es
precision mediump float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float t=.0,a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<3;i++){ t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
void main(void){
  vec2 uv=(gl_FragCoord.xy-.5*R)/MN;
  float bg=fbm(uv*2.+vec2(time*.25,0.));
  vec3 col=vec3(0);
  for(float i=1.;i<9.;i++){
    uv+=.12*cos(i*vec2(.1+.01*i,.8)+i*i+time*.3+.1*uv.x);
    float d=length(uv);
    col+=.0015/d*(cos(sin(i)*vec3(0.4,0.8,2.5))+1.);
    float b=noise(i+uv+bg*1.5);
    col+=.0018*b/length(max(uv,vec2(b*uv.x*.02,uv.y)));
    col=mix(col,vec3(bg*.02,bg*.06,bg*.18),d*.15);
  }
  O=vec4(col,1);
}`;

      const compile = (type: number, src: string) => {
        const s = gl.createShader(type);
        if (!s) throw new Error("shader create failed");
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };

      const vs = compile(gl.VERTEX_SHADER, vertSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
      const program = gl.createProgram();
      if (!program) throw new Error("program create failed");
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      const uRes  = gl.getUniformLocation(program, "resolution");
      const uTime = gl.getUniformLocation(program, "time");

      const resize = () => {
        const p = canvas.parentElement;
        if (!p) return;
        const dpr = Math.min(window.devicePixelRatio, 1);
        canvas.width  = Math.max(1, p.clientWidth)  * dpr;
        canvas.height = Math.max(1, p.clientHeight) * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      const resizeObs = new ResizeObserver(resize);
      resizeObs.observe(parent);
      resize();

      let frameId = 0;
      let elapsed = 0;
      let lastT = 0;

      const animate = (now: number) => {
        frameId = requestAnimationFrame(animate);
        // Throttle to ~30fps
        if (now - lastT < 33) return;
        elapsed += (now - lastT) * 0.001;
        lastT = now;
        gl.useProgram(program);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, elapsed);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      // Pause rAF when off-screen to stop draining GPU during scroll
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
      io.observe(parent);

      cleanup = () => {
        io.disconnect();
        resizeObs.disconnect();
        cancelAnimationFrame(frameId);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      };
    } catch (err) {
      console.warn("TeamShaderBg: WebGL setup failed", err);
    }

    return () => cleanup?.();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        opacity: mounted ? 0.85 : 0,
        transition: "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}
