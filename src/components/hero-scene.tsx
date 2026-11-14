"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group, Mesh } from "three";

function StarField() {
  const positions = useMemo(() => {
    const values = new Float32Array(360 * 3);
    for (let i = 0; i < 360; i += 1) {
      const seed = i + 1;
      const randomA = (Math.sin(seed * 127.1) * 43758.5453) % 1;
      const randomB = (Math.sin(seed * 311.7) * 24634.6345) % 1;
      const randomC = (Math.sin(seed * 74.7) * 56445.234) % 1;
      values[i * 3] = ((randomA + 1) % 1 - 0.5) * 6.8;
      values[i * 3 + 1] = ((randomB + 1) % 1 - 0.5) * 4.8;
      values[i * 3 + 2] = ((randomC + 1) % 1 - 0.5) * 2.8 - 0.8;
    }
    return values;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9BCBFF"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.68}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalSculpture() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      time * 0.12 + pointerX * 0.3,
      2.5,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      Math.sin(time * 0.28) * 0.045 - pointerY * 0.18,
      2.5,
      delta,
    );
    group.current.position.y = Math.sin(time * 0.62) * 0.055;

    if (core.current) {
      const pulse = 1 + Math.sin(time * 1.5) * 0.022;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[0.15, 0.12, -0.2]}>
        <torusKnotGeometry args={[1.06, 0.285, 220, 36, 2, 3]} />
        <meshPhysicalMaterial
          color="#B6C5FF"
          metalness={0.86}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={1}
          envMapIntensity={1.35}
        />
      </mesh>

      <mesh ref={core}>
        <sphereGeometry args={[0.69, 64, 64]} />
        <meshPhysicalMaterial
          color="#102DAB"
          metalness={0.52}
          roughness={0.18}
          emissive="#123BFF"
          emissiveIntensity={1.25}
          clearcoat={1}
        />
      </mesh>

      <group rotation={[0.9, 0.15, -0.34]}>
        <mesh>
          <torusGeometry args={[1.73, 0.012, 10, 180]} />
          <meshBasicMaterial color="#6B8DFF" transparent opacity={0.9} />
        </mesh>
      </group>
      <group rotation={[1.1, -0.48, 0.8]}>
        <mesh>
          <torusGeometry args={[1.88, 0.008, 8, 180]} />
          <meshBasicMaterial color="#C27BFF" transparent opacity={0.78} />
        </mesh>
      </group>
      <group rotation={[0.35, 0.9, 0.25]}>
        <mesh>
          <torusGeometry args={[1.5, 0.006, 8, 160]} />
          <meshBasicMaterial color="#67DFFF" transparent opacity={0.72} />
        </mesh>
      </group>

      <mesh position={[1.72, 0.55, 0.1]}>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshBasicMaterial color="#B8D9FF" />
      </mesh>
      <mesh position={[-1.62, -0.55, 0.28]}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshBasicMaterial color="#C98AFF" />
      </mesh>
      <mesh position={[0.15, 1.78, -0.12]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshBasicMaterial color="#6DEBFF" />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="hero-webgl-canvas"
      camera={{ position: [0, 0, 4.75], fov: 38 }}
      dpr={[1, 1.35]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      fallback={<div className="hero-webgl-fallback" />}
    >
      <ambientLight intensity={0.72} />
      <pointLight position={[3.4, 2.8, 3]} color="#7EDBFF" intensity={34} />
      <pointLight position={[-3, -1.7, 2]} color="#9B57FF" intensity={26} />
      <pointLight position={[0.3, 3.5, -1]} color="#FFFFFF" intensity={15} />
      <StarField />
      <OrbitalSculpture />
    </Canvas>
  );
}
