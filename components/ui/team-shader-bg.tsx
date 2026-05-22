"use client";

import { useEffect, useRef, useState } from "react";

// WebGL2 cosmic nebula/star-field shader — adapted for A-STAR deep-space palette.
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
        console.warn("TeamShaderBg: WebGL2 unavailable, skipping background");
        return;
      }

      const vertSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

      const fragSrc = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float t=.0,a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){ t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p){
  float d=1.,t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}
void main(void){
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(0.5,1.0,2.8))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.03,bg*.08,bg*.22),d);
  }
  O=vec4(col,1);
}`;

      const compile = (type: number, src: string) => {
        const shader = gl.createShader(type);
        if (!shader) throw new Error("Failed to create shader");
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        return shader;
      };

      const vs = compile(gl.VERTEX_SHADER, vertSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
      const program = gl.createProgram();
      if (!program) throw new Error("Failed to create program");
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
        const dpr = Math.min(window.devicePixelRatio, 1.5);
        canvas.width  = Math.max(1, p.clientWidth)  * dpr;
        canvas.height = Math.max(1, p.clientHeight) * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(parent);
      resize();

      let frameId = 0;
      const animate = (now: number) => {
        frameId = requestAnimationFrame(animate);
        const t = now * 0.001;
        gl.useProgram(program);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
      frameId = requestAnimationFrame(animate);

      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frameId);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      };
    } catch (err) {
      console.warn("TeamShaderBg: WebGL setup failed, skipping background", err);
    }

    return () => cleanup?.();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        opacity: mounted ? 0.9 : 0,
        transition: "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}
