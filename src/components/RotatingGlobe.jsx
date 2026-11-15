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
    camera.position.set(0, 0.05, 5.15);

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

    // ── Atmospheric Halo (Cyan-Blue, BackSide) ─────────────────────
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.66 - dot(vNormal, vec3(0, 0, 1.0)), 2.6);
          vec3 cyanHalo   = vec3(0.18, 0.65, 1.0);
          vec3 blueHalo   = vec3(0.10, 0.40, 0.90);
          float isUpper   = smoothstep(-0.2, 0.8, vNormal.y - vNormal.x * 0.5);
          vec3 haloColor  = mix(blueHalo, cyanHalo, isUpper * 0.6) * intensity * 2.0;
          gl_FragColor    = vec4(haloColor, intensity * 0.90);
        }
      `,
      blending:    THREE.AdditiveBlending,
      side:        THREE.BackSide,
      transparent: true,
    });
    rootGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(sphereRadius * 1.025, 64, 64),
      atmoMat
    ));

    // ── Orbital Path Helper ────────────────────────────────────────
    // depthTest:false → full ellipse always visible, never clipped by globe
    function createOrbit(radiusX, radiusY, tiltX, tiltY, color, opacity, segments = 256) {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, Math.PI * 2, false, 0);
      const pts   = curve.getPoints(segments).map((p) => new THREE.Vector3(p.x, p.y, 0));
      const geo   = new THREE.BufferGeometry().setFromPoints(pts);
      const mat   = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthTest:   false,
        depthWrite:  false,
      });
      const line = new THREE.LineLoop(geo, mat);
      line.renderOrder = 999;
      line.rotation.x = tiltX;
      line.rotation.y = tiltY;
      return line;
    }

    const orbitsGroup = new THREE.Group();
    orbitsGroup.renderOrder = 999;
    rootGroup.add(orbitsGroup);

    // ── Multi-Colored Security & Intelligence Orbital Lines ──────
    // 1. Blue Lines (Electric cyan, royal blue, sky blue)
    const orbitBlue1 = createOrbit(1.95, 1.95, -0.40, 0.58, 0x38BDF8, 0.90);
    orbitsGroup.add(orbitBlue1);

    const orbitBlue2 = createOrbit(2.08, 2.08,  1.12, 0.26, 0x1676C5, 0.85);
    orbitsGroup.add(orbitBlue2);

    const orbitBlue3 = createOrbit(2.26, 2.26, -0.82, -0.68, 0x7DD3FC, 0.65);
    orbitsGroup.add(orbitBlue3);

    // 2. Gold Lines (Signature champagne gold & warm amber gold)
    const orbitGold1 = createOrbit(2.00, 2.00, 0.35, -0.48, 0xF4B323, 0.95);
    orbitsGroup.add(orbitGold1);

    const orbitGold2 = createOrbit(2.18, 2.18, -0.72, 0.82, 0xEAB308, 0.88);
    orbitsGroup.add(orbitGold2);

    // 3. Black Lines (Midnight corporate black & slate technical boundary)
    const orbitBlack1 = createOrbit(2.04, 2.04, 0.82, -0.52, 0x071A3D, 0.92);
    orbitsGroup.add(orbitBlack1);

    const orbitBlack2 = createOrbit(2.22, 2.22, -0.22, 1.15, 0x0F172A, 0.88);
    orbitsGroup.add(orbitBlack2);

    // ── Glowing Orbital Node Beads (Blue, Black, Gold) ─────────────
    function createNode(color, size = 0.014) {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(
        new THREE.SphereGeometry(size, 16, 16),
        new THREE.MeshBasicMaterial({ color, blending: THREE.AdditiveBlending })
      ));
      g.add(new THREE.Mesh(
        new THREE.SphereGeometry(size * 2.2, 16, 16),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false })
      ));
      return g;
    }

    const beads = [
      // Gold nodes
      { node: createNode(0xF4B323, 0.015), radius: 2.00, angle: 0.6, tiltX: 0.35, tiltY: -0.48, speed: 0.0028 },
      { node: createNode(0xF4B323, 0.013), radius: 2.00, angle: 3.2, tiltX: 0.35, tiltY: -0.48, speed: 0.0028 },
      { node: createNode(0xEAB308, 0.014), radius: 2.18, angle: 1.8, tiltX: -0.72, tiltY: 0.82, speed: 0.0024 },
      // Blue nodes
      { node: createNode(0x38BDF8, 0.014), radius: 1.95, angle: 0.5, tiltX: -0.40, tiltY: 0.58, speed: 0.0028 },
      { node: createNode(0x38BDF8, 0.013), radius: 1.95, angle: 2.4, tiltX: -0.40, tiltY: 0.58, speed: 0.0028 },
      { node: createNode(0x1676C5, 0.015), radius: 2.08, angle: 1.1, tiltX:  1.12, tiltY: 0.26, speed: 0.0022 },
      { node: createNode(0x7DD3FC, 0.012), radius: 2.26, angle: 4.5, tiltX: -0.82, tiltY: -0.68, speed: 0.0018 },
      // Black / Midnight corporate nodes
      { node: createNode(0x071A3D, 0.016), radius: 2.04, angle: 0.9, tiltX: 0.82, tiltY: -0.52, speed: 0.0022 },
      { node: createNode(0x0F172A, 0.015), radius: 2.22, angle: 5.1, tiltX: -0.22, tiltY: 1.15, speed: 0.0019 },
    ];
    beads.forEach(({ node }) => rootGroup.add(node));

    // ── 3D Digital Security Padlock on the Globe ───────────────────
    const lockGroup = new THREE.Group();
    // Positioned prominently hovering on the front-right limb of the Earth
    lockGroup.position.set(0.60, 0.42, 1.48);
    lockGroup.rotation.y = 0.28;
    lockGroup.rotation.x = -0.12;

    // 1. Shackle (Metallic gold U-hoop)
    const shackleMat = new THREE.MeshStandardMaterial({
      color: 0xF4B323,
      metalness: 0.90,
      roughness: 0.20,
    });
    const shackleGeo = new THREE.TorusGeometry(0.065, 0.014, 16, 32, Math.PI);
    const shackle = new THREE.Mesh(shackleGeo, shackleMat);
    shackle.position.set(0, 0.075, 0);
    lockGroup.add(shackle);

    const legGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.045, 16);
    const leftLeg = new THREE.Mesh(legGeo, shackleMat);
    leftLeg.position.set(-0.065, 0.052, 0);
    lockGroup.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeo, shackleMat);
    rightLeg.position.set(0.065, 0.052, 0);
    lockGroup.add(rightLeg);

    // 2. Lock Body (Deep navy core with polished gold beveled border)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x071A3D,
      metalness: 0.70,
      roughness: 0.30,
    });
    const bodyGeo = new THREE.BoxGeometry(0.20, 0.16, 0.055);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, -0.025, 0);
    lockGroup.add(body);

    const goldRimGeo = new THREE.BoxGeometry(0.18, 0.14, 0.060);
    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xF4B323,
      metalness: 0.85,
      roughness: 0.25,
    });
    const goldRim = new THREE.Mesh(goldRimGeo, goldRimMat);
    goldRim.position.set(0, -0.025, 0);
    lockGroup.add(goldRim);

    const innerFaceGeo = new THREE.BoxGeometry(0.15, 0.11, 0.064);
    const innerFaceMat = new THREE.MeshBasicMaterial({ color: 0x0B192C });
    const innerFace = new THREE.Mesh(innerFaceGeo, innerFaceMat);
    innerFace.position.set(0, -0.025, 0);
    lockGroup.add(innerFace);

    // 3. Glowing Keyhole (Luminous Cyan & Gold)
    const keyholeMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.95,
      depthTest: false,
    });
    const keyCircle = new THREE.Mesh(new THREE.CircleGeometry(0.018, 16), keyholeMat);
    keyCircle.position.set(0, -0.015, 0.035);
    lockGroup.add(keyCircle);

    const keySlot = new THREE.Mesh(new THREE.PlaneGeometry(0.012, 0.030), keyholeMat);
    keySlot.position.set(0, -0.035, 0.035);
    lockGroup.add(keySlot);

    // Status LED dot (Protected status green)
    const statusDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.010, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x10B981, depthTest: false })
    );
    statusDot.position.set(0.065, 0.035, 0.035);
    lockGroup.add(statusDot);

    // 4. Concentric Glowing Security Pulse Rings
    const innerRadarGeo = new THREE.RingGeometry(0.17, 0.185, 32);
    const innerRadarMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });
    const innerRadar = new THREE.Mesh(innerRadarGeo, innerRadarMat);
    innerRadar.position.set(0, 0, -0.01);
    lockGroup.add(innerRadar);

    const outerRadarGeo = new THREE.RingGeometry(0.23, 0.245, 32);
    const outerRadarMat = new THREE.MeshBasicMaterial({
      color: 0xF4B323,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });
    const outerRadar = new THREE.Mesh(outerRadarGeo, outerRadarMat);
    outerRadar.position.set(0, 0, -0.01);
    lockGroup.add(outerRadar);

    rootGroup.add(lockGroup);

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

      // Faster rotation — 2× previous speed
      if (!isDragging) targetRotY += 0.0060;

      globeGroup.rotation.y = THREE.MathUtils.lerp(globeGroup.rotation.y, targetRotY,       0.10);
      globeGroup.rotation.x = THREE.MathUtils.lerp(globeGroup.rotation.x, targetRotX * 0.35, 0.10);

      // Subtle floating breathing motion for security lock
      lockGroup.position.y = 0.42 + Math.sin(time * 1.6) * 0.015;

      // Pulse security radar rings
      const radarPulse = 1.0 + Math.sin(time * 2.6) * 0.08;
      innerRadar.scale.set(radarPulse, radarPulse, 1);
      innerRadarMat.opacity = 0.50 + Math.sin(time * 2.6) * 0.20;
      outerRadar.scale.set(1.0 + (radarPulse - 1.0) * 1.6, 1.0 + (radarPulse - 1.0) * 1.6, 1);
      outerRadarMat.opacity = 0.35 + Math.sin(time * 2.6) * 0.15;

      // Gentle orbital precession across all lines (blue, black, gold)
      orbitBlue1.rotation.z += 0.00075;
      orbitBlue2.rotation.z -= 0.00060;
      orbitBlue3.rotation.x += 0.00050;
      orbitGold1.rotation.z += 0.00080;
      orbitGold2.rotation.z -= 0.00070;
      orbitBlack1.rotation.y += 0.00065;
      orbitBlack2.rotation.x -= 0.00055;

      // Animate node beads along their orbital ellipses
      beads.forEach((b) => {
        b.angle += b.speed;
        const sinX = Math.sin(b.tiltX), cosX = Math.cos(b.tiltX);
        const sinY = Math.sin(b.tiltY), cosY = Math.cos(b.tiltY);
        const lx = b.radius * Math.cos(b.angle);
        const ly = b.radius * Math.sin(b.angle);
        const x  =  cosY * lx - sinY * sinX * ly;
        const y  =             cosX * ly;
        const z  =  sinY * lx + cosY * sinX * ly;
        b.node.position.set(x, y, z);
      });

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

      {/* Soft pulse placeholder while textures load */}
      {!loaded && (
        <div className="w-56 h-56 rounded-full bg-radial from-[#1676C5]/15 to-transparent animate-pulse absolute z-0" />
      )}
    </div>
  );
}
