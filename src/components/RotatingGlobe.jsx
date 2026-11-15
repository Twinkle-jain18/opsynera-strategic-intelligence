import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function RotatingGlobe() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width  = container.clientWidth  || 500;
    const height = container.clientHeight || 500;

    // ── Scene / Camera / Renderer ───────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.60;
    container.appendChild(renderer.domElement);

    // ── Root Group: natural axial tilt ─────────────────────────────
    const rootGroup  = new THREE.Group();
    rootGroup.rotation.x = 0.22;
    rootGroup.rotation.z = -0.14;
    scene.add(rootGroup);

    const globeGroup = new THREE.Group();
    rootGroup.add(globeGroup);

    // ── Lighting — bright & balanced for realistic Earth ───────────
    // Neutral bright ambient: shadow side is never pitch-black
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));

    // Primary sun — warm daylight from upper-left
    const keySun = new THREE.DirectionalLight(0xfff8f0, 3.0);
    keySun.position.set(-5, 4.5, 5);
    scene.add(keySun);

    // Soft fill from opposite side — lifts the dark hemisphere
    const fillLight = new THREE.DirectionalLight(0xddeeff, 1.2);
    fillLight.position.set(5, -2, -3);
    scene.add(fillLight);

    // ── Custom Earth Shader ────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();
    let earthMesh;
    const sphereRadius = 1.50;

    const sunDir = new THREE.Vector3(-0.6, 0.55, 0.7).normalize();

    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        uMap:     { value: null },
        uNight:   { value: null },
        uSunDir:  { value: sunDir },
        uTime:    { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vUv    = uv;
          vNormal = normalize(normalMatrix * normal);
          vPos   = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform sampler2D uNight;
        uniform vec3 uSunDir;
        uniform float uTime;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPos;

        void main() {
          vec4 dayTex   = texture2D(uMap,   vUv);
          vec4 nightTex = texture2D(uNight, vUv);

          vec3 normal  = normalize(vNormal);
          vec3 viewDir = normalize(-vPos);

          // Slight saturation & contrast boost so texture "pops" on screen
          vec3 raw = dayTex.rgb;
          float lum = dot(raw, vec3(0.299, 0.587, 0.114));
          vec3 surface = mix(vec3(lum), raw, 1.20);
          surface = (surface - 0.5) * 1.04 + 0.5;
          surface = clamp(surface * 1.15, 0.0, 1.0);

          // Diffuse lighting — soft terminator, bright everywhere
          float NdotL  = dot(normal, uSunDir);
          float diff   = smoothstep(-0.65, 0.95, NdotL) * 0.55 + 0.45;
          surface *= diff;

          // Ocean specular gloss — detects ocean by blue dominance
          float isOcean = smoothstep(0.0, 0.18, dayTex.b - dayTex.r * 0.75);
          vec3  halfDir = normalize(uSunDir + viewDir);
          float spec    = pow(max(dot(normal, halfDir), 0.0), 55.0) * isOcean * 0.65;
          surface += vec3(0.70, 0.88, 1.0) * spec;

          // City lights on the night side (warm gold, as in NASA Black Marble)
          float cityI      = max(max(nightTex.r, nightTex.g), nightTex.b);
          float nightBlend = smoothstep(0.15, -0.20, NdotL);
          vec3  cityGlow   = mix(
            vec3(1.0, 0.76, 0.28) * 3.5,
            vec3(1.0, 0.95, 0.80) * 2.2,
            smoothstep(0.42, 0.88, cityI)
          );
          float landMask = 1.0 - isOcean;
          surface += cityGlow * pow(cityI, 1.1) * nightBlend * (0.5 + 0.9 * nightBlend) * landMask;

          // Fresnel atmospheric glow on the limb (cyan-blue)
          float fresnel  = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
          float sunAlign = NdotL * 0.5 + 0.5;
          vec3  rimColor = mix(
            vec3(0.18, 0.60, 1.0) * 1.8,
            vec3(0.80, 0.92, 1.0) * 1.2,
            pow(sunAlign, 2.5)
          );
          surface += rimColor * fresnel * 0.55;

          gl_FragColor = vec4(surface, 1.0);
        }
      `,
    });

    textureLoader.load('/earth-blue-marble.jpg', (dayTex) => {
      dayTex.colorSpace = THREE.SRGBColorSpace;
      dayTex.wrapS = THREE.RepeatWrapping;
      dayTex.wrapT = THREE.ClampToEdgeWrapping;
      earthMat.uniforms.uMap.value = dayTex;

      textureLoader.load('/earth-night-highres.jpg', (nightTex) => {
        nightTex.colorSpace = THREE.SRGBColorSpace;
        nightTex.wrapS = THREE.RepeatWrapping;
        nightTex.wrapT = THREE.ClampToEdgeWrapping;
        earthMat.uniforms.uNight.value = nightTex;

        earthMesh = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius, 96, 96), earthMat);
        globeGroup.add(earthMesh);
        setLoaded(true);
      });
    });

    // ── Drag-to-Rotate Interaction ─────────────────────────────────
    let isDragging = false;
    let prevMouse  = { x: 0, y: 0 };
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseDown  = (e) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; };
    const onMouseMove  = (e) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - prevMouse.x) * 0.005;
      targetRotX += (e.clientY - prevMouse.y) * 0.003;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp    = () => { isDragging = false; };
    const onTouchStart = (e) => { if (e.touches.length === 1) { isDragging = true; prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; } };
    const onTouchMove  = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      targetRotY += (e.touches[0].clientX - prevMouse.x) * 0.006;
      targetRotX += (e.touches[0].clientY - prevMouse.y) * 0.004;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd   = () => { isDragging = false; };

    container.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mousemove',     onMouseMove);
    window.addEventListener('mouseup',       onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove',     onTouchMove,  { passive: true });
    window.addEventListener('touchend',      onTouchEnd);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animation Loop ─────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (earthMat) earthMat.uniforms.uTime.value = time;

      // Earth spins smoothly on its axis (faster rotation — 2x speed)
      if (!isDragging) targetRotY += 0.0060;

      globeGroup.rotation.y = THREE.MathUtils.lerp(globeGroup.rotation.y, targetRotY,       0.10);
      globeGroup.rotation.x = THREE.MathUtils.lerp(globeGroup.rotation.x, targetRotX * 0.35, 0.10);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',     onResize);
      container.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mousemove',     onMouseMove);
      window.removeEventListener('mouseup',       onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',     onTouchMove);
      window.removeEventListener('touchend',      onTouchEnd);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 z-10" />
    </div>
  );
}
