import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function RotatingGlobe() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Balanced perspective: camera pulled back slightly so globe + orbits have comfortable breathing room
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 0.05, 5.15);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% Transparent background

    // High dynamic range color grading
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.30;

    container.appendChild(renderer.domElement);

    // Root Group with Earth's natural axial tilt (~23.4 degrees)
    const rootGroup = new THREE.Group();
    rootGroup.rotation.x = 0.22;
    rootGroup.rotation.z = -0.14;
    scene.add(rootGroup);

    // Globe Rotation Group (Spins continuously on its axis)
    const globeGroup = new THREE.Group();
    rootGroup.add(globeGroup);

    // 2. Controlled Cinematic Lighting
    // Soft royal-blue ambient fill: deep navy shadows, never pitch black
    const ambientLight = new THREE.AmbientLight(0x0a224a, 1.5);
    scene.add(ambientLight);

    // Main key sunlight from upper-left: illuminates continents with rich clarity
    const keySunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keySunLight.position.set(-5, 4.5, 5);
    scene.add(keySunLight);

    // Soft champagne-gold rim fill from opposite angle
    const goldRimLight = new THREE.DirectionalLight(0xF4B323, 1.1);
    goldRimLight.position.set(5, -2, -3);
    scene.add(goldRimLight);

    // 3. Custom Digital Intelligence Earth Shader
    // Luminous Sapphire Oceans + Realistic Continents (Warm Sahara, Lush Forests, Ice Caps) + Gold City Lights
    const textureLoader = new THREE.TextureLoader();
    let earthMesh;

    const sunDirection = new THREE.Vector3(-0.6, 0.55, 0.7).normalize();

    const earthShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: null },
        uNightMap: { value: null },
        uSunDir: { value: sunDirection },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform sampler2D uNightMap;
        uniform vec3 uSunDir;
        uniform float uTime;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPos;

        void main() {
          vec4 dayTex = texture2D(uMap, vUv);
          vec4 nightTex = texture2D(uNightMap, vUv);

          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(-vPos);

          // 1. Precise Land vs Ocean Discrimination
          // In NASA Blue Marble, oceans have high blue and low red/green.
          float landFactor = smoothstep(0.03, 0.16, (dayTex.r * 0.75 + dayTex.g * 0.65) - dayTex.b * 0.65);

          // 2. Realistic Geographical Continent Coloring
          // Elevation & relief from texture brightness
          float elevation = (dayTex.r + dayTex.g) * 0.5;

          // A. Deserts (Sahara, Arabia, Kalahari, Gobi): Warm golden sand/tan
          float desertFactor = smoothstep(0.06, 0.28, dayTex.r - dayTex.b * 0.75);
          vec3 desertSand = vec3(0.68, 0.51, 0.32);      // Rich Sahara sand
          vec3 desertDunes = vec3(0.82, 0.64, 0.42);     // Sunlit dunes
          vec3 desertColor = mix(desertSand, desertDunes, elevation);

          // B. Temperate & Vegetation (Europe, Central Africa, Amazon): Deep intelligence forest-indigo/navy
          vec3 vegetLow = vec3(0.07, 0.19, 0.24);        // Coastal lowland
          vec3 vegetHigh = vec3(0.12, 0.30, 0.32);       // Highland plateau
          vec3 vegetColor = mix(vegetLow, vegetHigh, elevation);

          // Combine desert and vegetation
          vec3 continentTerrain = mix(vegetColor, desertColor, desertFactor);

          // C. Polar Ice Caps & Alpine Snow (Greenland, Arctic, High Peaks): Crisp Luminous White
          float snowFactor = smoothstep(0.62, 0.82, min(min(dayTex.r, dayTex.g), dayTex.b));
          vec3 snowColor = vec3(0.93, 0.96, 1.0);
          continentTerrain = mix(continentTerrain, snowColor, snowFactor);

          // 3. Luminous Sapphire & Royal Blue Oceans
          vec3 deepOcean = vec3(0.04, 0.16, 0.42);       // Deep sapphire ocean
          vec3 shallowOcean = vec3(0.09, 0.38, 0.76);    // Continental shelf electric sapphire
          vec3 oceanColor = mix(deepOcean, shallowOcean, pow(dayTex.b, 1.15) * 1.35);

          // Base planetary surface
          vec3 surface = mix(oceanColor, continentTerrain, landFactor);

          // 4. Controlled Diffuse Lighting (Soft wrap so shadows remain readable deep navy)
          float NdotL = dot(normal, uSunDir);
          float diff = max(NdotL * 0.62 + 0.38, 0.0);
          surface *= diff;

          // 5. Specular Ocean Gloss (Liquid sapphire reflection)
          vec3 halfDir = normalize(uSunDir + viewDir);
          float spec = pow(max(dot(normal, halfDir), 0.0), 38.0) * (1.0 - landFactor) * 0.72;
          surface += vec3(0.50, 0.82, 1.0) * spec;

          // 6. NASA Black Marble City Lights (Warm Champagne-Gold)
          float cityIntensity = max(max(nightTex.r, nightTex.g), nightTex.b);
          float nightInfluence = smoothstep(0.32, -0.25, NdotL);
          vec3 goldCity = vec3(1.0, 0.78, 0.28) * 4.0;
          vec3 whiteHotCity = vec3(1.0, 0.96, 0.85) * 2.6;
          vec3 cityColor = mix(goldCity, whiteHotCity, smoothstep(0.42, 0.86, cityIntensity));
          // Visible both at night and as delicate golden infrastructure grids in daytime
          surface += cityColor * pow(cityIntensity, 1.15) * (0.42 + 0.85 * nightInfluence) * landFactor;

          // 7. Beautiful Cyan & Champagne-Gold Edge Lighting (Fresnel)
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.6);
          // Sunlit limb gets warm champagne-white highlight; dark limb gets electric cyan
          float sunAlignment = dot(normal, uSunDir) * 0.5 + 0.5;
          vec3 sunlitRim = vec3(1.0, 0.90, 0.72) * 1.5;
          vec3 shadowRim = vec3(0.20, 0.68, 1.0) * 1.7;
          vec3 atmosphereRim = mix(shadowRim, sunlitRim, pow(sunAlignment, 2.0)) * fresnel;

          // Inner atmosphere depth on oceans
          float oceanGlow = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.2) * (1.0 - landFactor);
          surface += vec3(0.16, 0.62, 1.0) * oceanGlow * 0.38;

          gl_FragColor = vec4(surface + atmosphereRim, 1.0);
        }
      `,
    });

    // Sphere radius: 1.50 (balanced proportion with breathing room)
    const sphereRadius = 1.50;

    // Load High-Resolution Textures
    textureLoader.load('/earth-blue-marble.jpg', (dayTex) => {
      dayTex.colorSpace = THREE.SRGBColorSpace;
      dayTex.wrapS = THREE.RepeatWrapping;
      dayTex.wrapT = THREE.ClampToEdgeWrapping;
      earthShaderMat.uniforms.uMap.value = dayTex;

      textureLoader.load('/earth-night-highres.jpg', (nightTex) => {
        nightTex.colorSpace = THREE.SRGBColorSpace;
        nightTex.wrapS = THREE.RepeatWrapping;
        nightTex.wrapT = THREE.ClampToEdgeWrapping;
        earthShaderMat.uniforms.uNightMap.value = nightTex;

        const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
        earthMesh = new THREE.Mesh(sphereGeo, earthShaderMat);
        globeGroup.add(earthMesh);
        setLoaded(true);
      });
    });

    // 4. Backside-Only Silhouette Rim Glow (Electric Cyan & Champagne-Gold Halo, Zero Front Fog)
    const atmoGeo = new THREE.SphereGeometry(sphereRadius * 1.025, 64, 64);
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
          // Dual color halo: cyan fading outward with subtle golden highlight on upper limb
          vec3 cyanHalo = vec3(0.18, 0.65, 1.0);
          vec3 goldHalo = vec3(1.0, 0.88, 0.65);
          float isUpperLimb = smoothstep(-0.2, 0.8, vNormal.y - vNormal.x * 0.5);
          vec3 haloColor = mix(cyanHalo, goldHalo, isUpperLimb * 0.45) * intensity * 1.9;
          gl_FragColor = vec4(haloColor, intensity * 0.88);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    rootGroup.add(atmoMesh);

    // 5. Specular Lens Flare Burst on Upper-Left Limb (From Reference Design)
    const flareBurst = new THREE.Group();
    flareBurst.position.set(-sphereRadius * 0.68, sphereRadius * 0.70, sphereRadius * 0.45);

    const flareBurstCoreGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const flareBurstCoreMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    flareBurst.add(new THREE.Mesh(flareBurstCoreGeo, flareBurstCoreMat));

    const flareBurstHaloGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const flareBurstHaloMat = new THREE.MeshBasicMaterial({
      color: 0xBAE6FD,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    flareBurst.add(new THREE.Mesh(flareBurstHaloGeo, flareBurstHaloMat));

    const flareBurstOuterGeo = new THREE.SphereGeometry(0.40, 16, 16);
    const flareBurstOuterMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.20,
      blending: THREE.AdditiveBlending,
    });
    flareBurst.add(new THREE.Mesh(flareBurstOuterGeo, flareBurstOuterMat));
    rootGroup.add(flareBurst);

    // 6. Refined Orbital Intelligence System (2–3 Curved Paths with Blue & Champagne-Gold)
    const orbitsGroup = new THREE.Group();
    rootGroup.add(orbitsGroup);

    // Helper: Create thin, smooth wireframe orbit line
    function createSmoothOrbitLine(radiusX, radiusY, tiltX, tiltY, color, opacity = 0.75) {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, Math.PI * 2, false, 0);
      const points = curve.getPoints(128);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.LineLoop(geometry, material);
      line.rotation.x = tiltX;
      line.rotation.y = tiltY;
      orbitsGroup.add(line);
      return line;
    }

    // Helper: Create delicate dotted telemetry orbit line
    function createDottedOrbit(radiusX, radiusY, tiltX, tiltY, color, count = 48, pointSize = 0.012) {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, Math.PI * 2, false, 0);
      const pts = curve.getPoints(count);
      const dotGeo = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const dotMat = new THREE.PointsMaterial({
        color: color,
        size: pointSize,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(dotGeo, dotMat);
      points.rotation.x = tiltX;
      points.rotation.y = tiltY;
      orbitsGroup.add(points);
      return points;
    }

    // Orbit 1: Refined Champagne-Gold Intelligence Track
    const orbitGold = createSmoothOrbitLine(1.95, 1.95, -0.40, 0.58, 0xF4B323, 0.85);

    // Orbit 2: Electric Cyan-Blue Global Surveillance Track
    const orbitBlue = createSmoothOrbitLine(2.12, 2.12, 1.12, 0.26, 0x1676C5, 0.75);
    createDottedOrbit(2.16, 2.16, 1.12, 0.26, 0x38BDF8, 54, 0.011);

    // Orbit 3: Outer Atmospheric Telemetry Track
    const orbitCyan = createSmoothOrbitLine(2.28, 2.28, -0.82, -0.68, 0xFCD34D, 0.50);

    // 7. Signature Curved Golden Energy Stream across Africa & Atlantic (Thin, Refined Tube)
    const arcSpline = [
      new THREE.Vector3(-1.75, -0.60, 0.76),
      new THREE.Vector3(-1.14, -0.20, 1.35),
      new THREE.Vector3(-0.16, 0.14, 1.58),
      new THREE.Vector3(0.85, 0.40, 1.40),
      new THREE.Vector3(1.68, 0.60, 0.75),
      new THREE.Vector3(1.95, 0.48, -0.20),
      new THREE.Vector3(1.52, 0.12, -1.45),
    ];
    const arcCurve = new THREE.CatmullRomCurve3(arcSpline);

    // Slim, elegant champagne-gold core tube (radius: 0.0072 - thin and crisp, NOT thick!)
    const arcTubeGeo = new THREE.TubeGeometry(arcCurve, 90, 0.0072, 10, false);
    const arcTubeMat = new THREE.MeshBasicMaterial({
      color: 0xF4B323,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const arcTube = new THREE.Mesh(arcTubeGeo, arcTubeMat);
    rootGroup.add(arcTube);

    // Soft warm amber luminous envelope (radius: 0.018 - subtle translucent glow)
    const arcGlowGeo = new THREE.TubeGeometry(arcCurve, 90, 0.018, 10, false);
    const arcGlowMat = new THREE.MeshBasicMaterial({
      color: 0xFFAA00,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const arcGlow = new THREE.Mesh(arcGlowGeo, arcGlowMat);
    rootGroup.add(arcGlow);

    // Traveling Pulsing Flare Bead along the stream
    const flareGeo = new THREE.SphereGeometry(0.022, 16, 16);
    const flareMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      blending: THREE.AdditiveBlending,
    });
    const flare = new THREE.Mesh(flareGeo, flareMat);

    const flareHaloGeo = new THREE.SphereGeometry(0.060, 16, 16);
    const flareHaloMat = new THREE.MeshBasicMaterial({
      color: 0xF4B323,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    flare.add(new THREE.Mesh(flareHaloGeo, flareHaloMat));
    rootGroup.add(flare);

    // 8. Delicate Connection Nodes (Small, Refined Pinpoints of Light - Satellites)
    // Sized around 0.012 - 0.015, exactly as requested by user ("The stalites should be smaller in size")
    const nodeDefs = [
      { orbit: orbitGold, angle: 0.5, color: 0xF4B323, size: 0.014 },
      { orbit: orbitGold, angle: 2.1, color: 0xF4B323, size: 0.013 },
      { orbit: orbitGold, angle: 3.8, color: 0xF4B323, size: 0.015 },
      { orbit: orbitBlue, angle: 1.1, color: 0x38BDF8, size: 0.012 },
      { orbit: orbitBlue, angle: 2.7, color: 0x1676C5, size: 0.014 },
      { orbit: orbitBlue, angle: 4.5, color: 0x38BDF8, size: 0.012 },
      { orbit: orbitCyan, angle: 1.6, color: 0x38BDF8, size: 0.012 },
      { orbit: orbitCyan, angle: 4.1, color: 0xF4B323, size: 0.014 },
    ];

    const beads = [];

    nodeDefs.forEach((def, i) => {
      const bGeo = new THREE.SphereGeometry(def.size, 16, 16);
      const bMat = new THREE.MeshBasicMaterial({
        color: def.color,
        blending: THREE.AdditiveBlending,
      });
      const bead = new THREE.Mesh(bGeo, bMat);

      // Micro glowing corona
      const hGeo = new THREE.SphereGeometry(def.size * 1.8, 16, 16);
      const hMat = new THREE.MeshBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.40,
        blending: THREE.AdditiveBlending,
      });
      bead.add(new THREE.Mesh(hGeo, hMat));

      rootGroup.add(bead);
      beads.push({
        mesh: bead,
        radius: 1.95 + (i % 3) * 0.16,
        angle: def.angle,
        speed: 0.0032 + (i % 3) * 0.0018,
        tiltX: def.orbit.rotation.x,
        tiltY: def.orbit.rotation.y,
      });
    });

    // 9. Great-Circle Transcontinental Data Arcs on Globe Surface
    function createGreatCircleArc(p1, p2, color) {
      const v1 = p1.clone().normalize();
      const v2 = p2.clone().normalize();
      const arcPts = [];
      const steps = 36;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const v = new THREE.Vector3().lerpVectors(v1, v2, t).normalize();
        const altitude = sphereRadius + Math.sin(t * Math.PI) * 0.06;
        arcPts.push(v.multiplyScalar(altitude));
      }
      const curve = new THREE.CatmullRomCurve3(arcPts);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
      const mat = new THREE.LineDashedMaterial({
        color: color,
        dashSize: 0.07,
        gapSize: 0.035,
        transparent: true,
        opacity: 0.70,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      globeGroup.add(line);
      return line;
    }

    // Hub 1: North America (NY) to Europe (London)
    createGreatCircleArc(
      new THREE.Vector3(-1.0, 1.0, 0.8),
      new THREE.Vector3(0.0, 1.25, 0.95),
      0xF4B323
    );
    // Hub 2: Europe to Middle East / Asia
    createGreatCircleArc(
      new THREE.Vector3(0.0, 1.25, 0.95),
      new THREE.Vector3(0.85, 0.65, 1.15),
      0x38BDF8
    );
    // Hub 3: South America to West Africa
    createGreatCircleArc(
      new THREE.Vector3(-1.1, -0.6, 0.9),
      new THREE.Vector3(-0.2, 0.2, 1.4),
      0xF4B323
    );

    // 10. Interactive Drag-to-Rotate Handling
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      targetRotationY += dx * 0.005;
      targetRotationX += dy * 0.003;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile devices
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      targetRotationY += dx * 0.006;
      targetRotationX += dy * 0.004;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 11. Render Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Update shader time
      if (earthShaderMat) {
        earthShaderMat.uniforms.uTime.value = time;
      }

      // Elegant, slow globe rotation (Earth spins smoothly on its axis)
      if (!isDragging) {
        targetRotationY += 0.0030;
      }

      // Smooth inertia damping
      globeGroup.rotation.y = THREE.MathUtils.lerp(globeGroup.rotation.y, targetRotationY, 0.1);
      globeGroup.rotation.x = THREE.MathUtils.lerp(globeGroup.rotation.x, targetRotationX * 0.35, 0.1);

      // Subtle orbital precession
      orbitGold.rotation.z += 0.0010;
      orbitBlue.rotation.z -= 0.0008;
      orbitCyan.rotation.x += 0.0007;

      // Gentle pulse on golden beam
      const pulse = 0.88 + Math.sin(time * 3.0) * 0.12;
      arcTubeMat.opacity = 0.92 * pulse;
      arcGlowMat.opacity = 0.35 * pulse;

      // Move flare along the trajectory
      const arcT = (time * 0.10) % 1.0;
      flare.position.copy(arcCurve.getPoint(arcT));

      // Orbit data node beads along their paths
      beads.forEach((b) => {
        b.angle += b.speed;
        const x = b.radius * Math.cos(b.angle);
        const y = b.radius * Math.sin(b.angle) * Math.cos(b.tiltX);
        const z = b.radius * Math.sin(b.angle) * Math.sin(b.tiltX);
        b.mesh.position.set(x, y, z);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 z-10 flex items-center justify-center"
      />

      {/* Fallback while textures load */}
      {!loaded && (
        <div className="w-full h-full flex items-center justify-center relative z-0">
          <div className="w-56 h-56 rounded-full bg-radial from-[#1676C5]/20 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
}
