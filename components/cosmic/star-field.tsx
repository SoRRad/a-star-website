"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { NeuralNodes } from "./neural-nodes";
import { ActivationPulses } from "./activation-pulses";

const STAR_COUNT = 1500;
const FIELD_DEPTH = 800;
const FIELD_RADIUS = 400;

// The star canvas is a fixed, full-screen backdrop that sits behind every
// backdrop-filtered glass surface. Rendering it at the full display refresh
// forces those surfaces to re-composite their blur on every frame, which is
// the main source of scroll jank. Driving the loop on demand at ~30fps halves
// that cost with no perceptible change to the slow ambient motion.
const TARGET_FPS = 30;

function ThrottledLoop({ fps = TARGET_FPS }: { fps?: number }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const interval = 1000 / fps;
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - last >= interval) {
        last = time;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [invalidate, fps]);

  return null;
}

function Stars() {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * FIELD_RADIUS;
      const offset = i * 3;

      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = Math.sin(angle) * radius;
      positions[offset + 2] = (Math.random() - 0.5) * FIELD_DEPTH;

      const colorRoll = Math.random();
      if (colorRoll < 0.7) {
        colors[offset] = 0.95 + Math.random() * 0.05;
        colors[offset + 1] = 0.95 + Math.random() * 0.05;
        colors[offset + 2] = 0.95 + Math.random() * 0.05;
      } else if (colorRoll < 0.95) {
        colors[offset] = 0.55 + Math.random() * 0.15;
        colors[offset + 1] = 0.75 + Math.random() * 0.15;
        colors[offset + 2] = 1;
      } else {
        colors[offset] = 1;
        colors[offset + 1] = 0.85 + Math.random() * 0.1;
        colors[offset + 2] = 0.5 + Math.random() * 0.2;
      }

      sizes[i] = Math.random() < 0.95 ? Math.random() * 1.5 + 0.3 : Math.random() * 3 + 2;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.005;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.003) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ScrollCamera() {
  const { camera } = useThree();
  const targetZ = useRef(0);
  const currentZ = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      targetZ.current = -scrollProgress * 40;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    currentZ.current += (targetZ.current - currentZ.current) * 0.05;
    camera.position.z = currentZ.current + 1;
  });

  return null;
}

export function StarField() {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>();

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 2000 }}
      dpr={[1, 1]}
      eventSource={eventSource}
      eventPrefix="client"
      gl={{ antialias: false, alpha: true, powerPreference: "default" }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <fog attach="fog" args={["#000814", 100, 600]} />
      <Stars />
      <NeuralNodes />
      <ActivationPulses />
      <ScrollCamera />
      <ThrottledLoop />
    </Canvas>
  );
}
