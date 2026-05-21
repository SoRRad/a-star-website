"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COSMIC_EDGES, COSMIC_NODES } from "./neural-nodes";

type Pulse = {
  id: number;
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
};

function vectorFromNode(index: number) {
  return new THREE.Vector3(...COSMIC_NODES[index].position);
}

export function ActivationPulses() {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const spawnPulse = () => {
      const edge = COSMIC_EDGES[Math.floor(Math.random() * COSMIC_EDGES.length)];
      const forward = Math.random() > 0.5;
      const start = vectorFromNode(forward ? edge[0] : edge[1]);
      const end = vectorFromNode(forward ? edge[1] : edge[0]);

      setPulses((current) => [
        ...current,
        { id: nextId.current++, start, end, progress: 0 },
      ]);
    };

    const interval = window.setInterval(spawnPulse, 4000 + Math.random() * 4000);
    const initial = window.setTimeout(spawnPulse, 1800);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(initial);
    };
  }, []);

  useFrame((_, delta) => {
    setPulses((current) =>
      current
        .map((pulse) => ({ ...pulse, progress: pulse.progress + delta * 0.8 }))
        .filter((pulse) => pulse.progress < 1),
    );
  });

  return (
    <>
      {pulses.map((pulse) => {
        const position = new THREE.Vector3().lerpVectors(
          pulse.start,
          pulse.end,
          pulse.progress,
        );

        return (
          <mesh key={pulse.id} position={position}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial
              color="#64B5F6"
              transparent
              opacity={1 - pulse.progress}
            />
          </mesh>
        );
      })}
    </>
  );
}
