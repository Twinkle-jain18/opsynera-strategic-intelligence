import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import "../styles/opsynera-globe.css";

const EARTH_TEXTURE = "/textures/earth_atmos_2048.jpg";
const NORMAL_TEXTURE = "/textures/earth_normal_2048.jpg";

function Earth() {
  const earthRef = useRef();
  const [earthMap, normalMap] = useTexture([
    EARTH_TEXTURE,
    NORMAL_TEXTURE,
  ]);

  useMemo(() => {
    earthMap.colorSpace = THREE.SRGBColorSpace;
    earthMap.anisotropy = 8;
    normalMap.anisotropy = 8;
  }, [earthMap, normalMap]);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group ref={earthRef}>
      <mesh>
        <sphereGeometry args={[1.18, 128, 128]} />
        <meshStandardMaterial
          map={earthMap}
          normalMap={normalMap}
          color="#C3DDFB"
          roughness={0.92}
          metalness={0.02}
        />
      </mesh>

      {/* Thin blue atmospheric rim */}
      <mesh scale={1.035}>
        <sphereGeometry args={[1.18, 96, 96]} />
        <meshBasicMaterial
          color="#168BFF"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Soft outer atmosphere */}
      <mesh scale={1.085}>
        <sphereGeometry args={[1.18, 96, 96]} />
        <meshBasicMaterial
          color="#67C9FF"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function OrbitalRing({
  radius = 1.48,
  stretch = 0.72,
  tilt = 0,
  color = "#44BFFF",
  speed = 0.025,
  opacity = 0.8,
  nodeAngles = [0, 2.1, 4.4],
}) {
  const ringRef = useRef();

  const points = useMemo(() => {
    const result = [];
    for (let i = 0; i <= 180; i += 1) {
      const angle = (i / 180) * Math.PI * 2;
      result.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * stretch,
          0
        )
      );
    }
    return result;
  }, [radius, stretch]);

  return (
    <group
      ref={ringRef}
      rotation={[tilt, 0, 0.5]}
    >
      <Line
        points={points}
        color={color}
        transparent
        opacity={opacity}
        lineWidth={1.35}
        toneMapped={false}
      />

      {nodeAngles.map((angle, index) => {
        const position = [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * stretch,
          0,
        ];

        return (
          <group key={`${color}-${index}`} position={position}>
            <mesh>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial
                color={color}
                toneMapped={false}
              />
            </mesh>
            <mesh scale={2.7}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.16}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function GlobeScene() {
  const orbitalGroup = useRef();

  useFrame((_, delta) => {
    if (orbitalGroup.current) {
      orbitalGroup.current.rotation.y += delta * 0.009;
    }
  });

  return (
    <>
      <ambientLight intensity={1.35} />
      <directionalLight
        position={[4, 3, 5]}
        intensity={2.0}
        color="#E5F2FF"
      />
      <pointLight
        position={[-3, 1, 3]}
        intensity={1.5}
        color="#168BFF"
      />
      <pointLight
        position={[2, -2, 2]}
        intensity={0.8}
        color="#F5BE55"
      />

      <Earth />

      <group ref={orbitalGroup}>
        <OrbitalRing
          radius={1.49}
          stretch={0.72}
          tilt={0.48}
          color="#38AFFF"
          speed={0.025}
          opacity={0.82}
          nodeAngles={[0.2, 2.1, 4.4]}
        />
        <OrbitalRing
          radius={1.54}
          stretch={0.43}
          tilt={-0.62}
          color="#E8B34E"
          speed={-0.02}
          opacity={0.9}
          nodeAngles={[0.5, 2.8, 5.1]}
        />
        <OrbitalRing
          radius={1.43}
          stretch={0.88}
          tilt={1.12}
          color="#70D5FF"
          speed={0.016}
          opacity={0.48}
          nodeAngles={[1.2, 3.5]}
        />
      </group>
    </>
  );
}

function GlobeFallback() {
  return (
    <div className="opsynera-globe__fallback" aria-label="Loading globe">
      <span />
    </div>
  );
}

/**
 * Opsynera's white-background 3D intelligence globe.
 *
 * Place this component inside the right-hand visual column of the homepage hero.
 * The component intentionally has a transparent/white background and does not
 * modify the surrounding page styles.
 */
export default function OpsyneraGlobe({
  className = "",
  height = "540px",
}) {
  return (
    <div
      className={`opsynera-globe ${className}`.trim()}
      style={{ height }}
      aria-label="Animated blue digital Earth with intelligence network orbits"
      role="img"
    >
      <div className="opsynera-globe__map-pattern" />
      <div className="opsynera-globe__ambient-glow" />

      <Canvas
        camera={{ position: [0, 0, 4.65], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#FFFFFF", 0);
        }}
      >
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
      <GlobeFallback />
    </div>
  );
}
