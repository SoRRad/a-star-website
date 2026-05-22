"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COSMIC_EDGES, COSMIC_NODES } from "./neural-nodes";

// Fixed pool of meshes — no React state in the render loop
const MAX_PULSES = 5;

type PulseSlot = {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  active: boolean;
};

export function ActivationPulses() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(MAX_PULSES).fill(null));
  const slots = useRef<PulseSlot[]>(
    Array.from({ length: MAX_PULSES }, () => ({
      start: new THREE.Vector3(),
      end: new THREE.Vector3(),
      progress: 1,
      active: false,
    })),
  );
  const lerpScratch = useRef(new THREE.Vector3());

  const spawnPulse = () => {
    const idx = slots.current.findIndex((s) => !s.active || s.progress >= 1);
    if (idx === -1) return;
    const edge = COSMIC_EDGES[Math.floor(Math.random() * COSMIC_EDGES.length)];
    const fwd = Math.random() > 0.5;
    const s = slots.current[idx];
    s.start.set(...COSMIC_NODES[fwd ? edge[0] : edge[1]].position);
    s.end.set(...COSMIC_NODES[fwd ? edge[1] : edge[0]].position);
    s.progress = 0;
    s.active = true;
  };

  useEffect(() => {
    const interval = window.setInterval(spawnPulse, 4000 + Math.random() * 4000);
    const initial = window.setTimeout(spawnPulse, 1800);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(initial);
    };
  }, []);

  useFrame((_, delta) => {
    slots.current.forEach((slot, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      if (!slot.active) {
        mesh.visible = false;
        return;
      }
      slot.progress += delta * 0.8;
      if (slot.progress >= 1) {
        slot.active = false;
        mesh.visible = false;
        return;
      }
      lerpScratch.current.lerpVectors(slot.start, slot.end, slot.progress);
      mesh.position.copy(lerpScratch.current);
      mesh.visible = true;
      (mesh.material as THREE.MeshBasicMaterial).opacity = 1 - slot.progress;
    });
  });

  return (
    <>
      {Array.from({ length: MAX_PULSES }, (_, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} visible={false}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#64B5F6" transparent opacity={0} />
        </mesh>
      ))}
    </>
  );
}
