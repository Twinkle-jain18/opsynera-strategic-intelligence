import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function RotatingGlobe() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent

    container.appendChild(renderer.domElement);

    // Group for entire globe system (globe + atmosphere + rings + points)
    const globeGroup = new THREE.Group();
    // Default tilt like Earth's axis (~23.5 degrees)
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.z = -0.15;
    scene.add(globeGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const goldPointLight = new THREE.PointLight(0xF4B323, 3, 20);
    goldPointLight.position.set(-4, -2, 4);
    scene.add(goldPointLight);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    let earthMesh;

    // Load textures
    textureLoader.load(
      '/earth-blue.jpg',
      (dayTexture) => {
        textureLoader.load(
          '/earth-lights.png',
          (lightsTexture) => {
            // Earth Sphere
            const geometry = new THREE.SphereGeometry(1.68, 64, 64);
            const material = new THREE.MeshStandardMaterial({
              map: dayTexture,
              emissiveMap: lightsTexture,
              emissive: new THREE.Color(0xF4B323),
              emissiveIntensity: 1.6,
              roughness: 0.6,
              metalness: 0.15,
            });

            earthMesh = new THREE.Mesh(geometry, material);
            globeGroup.add(earthMesh);
            setLoaded(true);
          },
          undefined,
          () => {
            // Fallback without night lights
            const geometry = new THREE.SphereGeometry(1.68, 64, 64);
            const material = new THREE.MeshStandardMaterial({
              map: dayTexture,
              roughness: 0.5,
              metalness: 0.1,
            });
            earthMesh = new THREE.Mesh(geometry, material);
            globeGroup.add(earthMesh);
            setLoaded(true);
          }
        );
      },
      undefined,
      (err) => {
        console.warn('Globe texture failed, using procedural fallback', err);
      }
    );

    // Atmosphere Glow Layer
    const atmosphereGeo = new THREE.SphereGeometry(1.73, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
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
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.08, 0.46, 0.88, 1.0) * intensity * 1.8 + vec4(0.95, 0.7, 0.14, 1.0) * pow(intensity, 4.0) * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);

    // Golden Orbital Rings
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    function createOrbitalRing(radius, tubeRadius, tiltX, tiltY, color = 0xF4B323) {
      const ringGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      orbitalGroup.add(ring);
      return ring;
    }

    const ring1 = createOrbitalRing(2.08, 0.007, 1.1, 0.4, 0xF4B323);
    const ring2 = createOrbitalRing(2.25, 0.006, -0.85, 0.7, 0xE0A218);
    const ring3 = createOrbitalRing(2.42, 0.005, 0.45, -1.2, 0x1676C5);

    // Glowing Orbital Particles (satellites & data nodes)
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const r = 1.95 + (i % 4) * 0.14;
      const inclination = ((i % 5) - 2) * 0.45;

      particlePositions[i * 3] = r * Math.cos(angle);
      particlePositions[i * 3 + 1] = r * Math.sin(angle) * Math.sin(inclination);
      particlePositions[i * 3 + 2] = r * Math.sin(angle) * Math.cos(inclination);

      particleSpeeds.push({
        radius: r,
        angle: angle,
        speed: 0.006 + (i % 3) * 0.004,
        inclination: inclination,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.3, '#F4B323');
    grad.addColorStop(1, 'rgba(244, 179, 35, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvas);
    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interactive Drag to Rotate
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let userRotationY = 0;
    let userRotationX = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      userRotationY += deltaX * 0.005;
      userRotationX += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
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
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      userRotationY += deltaX * 0.006;
      userRotationX += deltaY * 0.006;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
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

    // Animation Loop
    let animationId;
    let autoRotationAngle = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Constant smooth rotation
      if (!isDragging) {
        autoRotationAngle += 0.0035;
      }

      // Rotate Earth Mesh
      if (earthMesh) {
        earthMesh.rotation.y = autoRotationAngle + userRotationY;
        earthMesh.rotation.x = userRotationX * 0.3;
      }

      // Rotate rings subtly
      ring1.rotation.z += 0.002;
      ring2.rotation.z -= 0.0018;
      ring3.rotation.x += 0.0015;

      // Animate orbiting data points
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const p = particleSpeeds[i];
        p.angle += p.speed;

        positions[i * 3] = p.radius * Math.cos(p.angle);
        positions[i * 3 + 1] = p.radius * Math.sin(p.angle) * Math.sin(p.inclination);
        positions[i * 3 + 2] = p.radius * Math.sin(p.angle) * Math.cos(p.inclination);
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
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
      {/* Three.js Container */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 z-10 flex items-center justify-center"
      />

      {/* Fallback image shown while textures load */}
      {!loaded && (
        <img
          src="/hero-globe.png"
          alt="Opsynera Strategic Intelligence Globe"
          className="w-full h-full object-contain relative z-0 globe-pulse"
        />
      )}
    </div>
  );
}
