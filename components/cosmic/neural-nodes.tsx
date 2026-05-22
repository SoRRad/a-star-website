"use client";

import { Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

type NodePosition = [number, number, number];

export const COSMIC_NODES: Array<{ id: string; label: string; position: NodePosition }> = [
  { id: "computer-vision", label: "Computer Vision", position: [3, 2, -5] },
  { id: "decision-support", label: "Decision Support", position: [-3, 2, -5] },
  { id: "validation", label: "Validation", position: [2, -2, -4] },
  { id: "patient-education", label: "Patient Education", position: [-2, -2, -4] },
  { id: "phase-recognition", label: "Phase Recognition", position: [4, 0, -6] },
  { id: "go-no-go", label: "Go / No-Go Zones", position: [-4, 0, -6] },
  { id: "neural-networks", label: "Neural Networks", position: [0, 3, -5] },
  { id: "outcomes", label: "Outcomes Research", position: [0, -3, -5] },
  { id: "anatomy-segmentation", label: "Anatomy Segmentation", position: [3, 0, -7] },
  { id: "risk-stratification", label: "Risk Stratification", position: [-3, 0, -7] },
  { id: "augmentation", label: "Surgical Augmentation", position: [2, 2, -8] },
  { id: "translation", label: "Clinical Translation", position: [-2, 2, -8] },
  { id: "guidance", label: "Operative Guidance", position: [0, 1.2, -4.3] },
  { id: "simulation", label: "Simulation AI", position: [1.2, -3.2, -6.5] },
];

export const COSMIC_EDGES: Array<[number, number]> = [
  [0, 6],
  [0, 8],
  [0, 2],
  [1, 6],
  [1, 9],
  [1, 3],
  [2, 7],
  [2, 4],
  [3, 7],
  [3, 5],
  [4, 8],
  [4, 10],
  [5, 9],
  [5, 11],
  [6, 10],
  [6, 11],
  [7, 8],
  [7, 9],
  [12, 0],
  [12, 1],
  [13, 7],
];

export function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {COSMIC_EDGES.map(([a, b]) => {
        const isActive = hoveredId === COSMIC_NODES[a].id || hoveredId === COSMIC_NODES[b].id;

        return (
          <Line
            key={`${COSMIC_NODES[a].id}-${COSMIC_NODES[b].id}`}
            points={[COSMIC_NODES[a].position, COSMIC_NODES[b].position]}
            color={isActive ? "#64B5F6" : "#1E88E5"}
            lineWidth={isActive ? 1.5 : 0.8}
            transparent
            opacity={isActive ? 0.6 : 0.18}
          />
        );
      })}

      {COSMIC_NODES.map((node) => {
        const isHovered = hoveredId === node.id;

        return (
          <group key={node.id} position={node.position}>
            <mesh
              scale={isHovered ? 2 : 1}
              onPointerEnter={() => setHoveredId(node.id)}
              onPointerLeave={() => setHoveredId(null)}
            >
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial
                color={isHovered ? "#64B5F6" : "#1E88E5"}
                transparent
                opacity={isHovered ? 1 : 0.7}
              />
            </mesh>
            <mesh scale={isHovered ? 2 : 1}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial
                color="#1E88E5"
                transparent
                opacity={isHovered ? 0.3 : 0.08}
              />
            </mesh>
            {isHovered && (
              <Html position={[0, 0.3, 0]} center style={{ pointerEvents: "none" }}>
                <div className="whitespace-nowrap rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white backdrop-blur-sm">
                  {node.label}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
