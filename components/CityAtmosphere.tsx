'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = { reducedMotion: boolean };

function seededRandom(initialSeed: number) {
  let seed = initialSeed;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

/** Distant architecture and light only; the interactive skyline lives in CityScene. */
export default function CityAtmosphere({ reducedMotion }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = container.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      // The surrounding HTML skyline remains usable when WebGL is unavailable.
      return;
    }

    const rand = seededRandom(27129);
    const resources = new Set<THREE.BufferGeometry | THREE.Material | THREE.Texture>();
    const remember = <T extends THREE.BufferGeometry | THREE.Material | THREE.Texture>(resource: T): T => {
      resources.add(resource);
      return resource;
    };
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#17223b', 0.0068);
    const camera = new THREE.PerspectiveCamera(48, 1, 0.5, 360);
    camera.position.set(0, 32, 54);
    camera.lookAt(0, 12, -48);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor('#0b1221', 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight('#829ec8', 1.25));
    const moonlight = new THREE.DirectionalLight('#b8c9f4', 1.2);
    moonlight.position.set(-55, 90, 25);
    scene.add(moonlight);
    const purpleLight = new THREE.DirectionalLight('#a45bd1', 0.5);
    purpleLight.position.set(45, 25, -50);
    scene.add(purpleLight);

    const windows = document.createElement('canvas');
    windows.width = 128;
    windows.height = 256;
    const ctx = windows.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#101a2c';
      ctx.fillRect(0, 0, windows.width, windows.height);
      for (let y = 5; y < 256; y += 10) {
        for (let x = 5; x < 128; x += 9) {
          const lit = rand();
          ctx.fillStyle = lit > 0.48
            ? ['#86afcd', '#a9a1d0', '#ddb899', '#688cac', '#a2c7ce'][Math.floor(rand() * 5)]
            : '#202d44';
          ctx.globalAlpha = lit > 0.48 ? 0.45 + rand() * 0.4 : 0.7;
          ctx.fillRect(x, y, 3, 4);
        }
      }
      ctx.globalAlpha = 1;
    }
    const windowTexture = remember(new THREE.CanvasTexture(windows));
    windowTexture.colorSpace = THREE.SRGBColorSpace;
    windowTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    const front = remember(new THREE.MeshStandardMaterial({
      color: '#8f9bc0', map: windowTexture, emissiveMap: windowTexture,
      emissive: '#bdd9ff', emissiveIntensity: 0.62, roughness: 0.95, metalness: 0.04,
    }));
    const side = remember(new THREE.MeshStandardMaterial({
      color: '#56627f', map: windowTexture, emissiveMap: windowTexture,
      emissive: '#789ad1', emissiveIntensity: 0.4, roughness: 1,
    }));
    const roof = remember(new THREE.MeshStandardMaterial({ color: '#28364f', roughness: 1 }));
    const buildingGeometry = remember(new THREE.BoxGeometry(1, 1, 1));
    const edgeMaterials = ['#5476a5', '#845c9d', '#458b9c'].map(color => remember(new THREE.LineBasicMaterial({
      color, transparent: true, opacity: 0.44,
    })));
    const antennaMaterial = remember(new THREE.LineBasicMaterial({ color: '#627995', transparent: true, opacity: 0.7 }));

    for (let index = 0; index < 126; index++) {
      const row = Math.floor(index / 21);
      const column = index % 21;
      const x = (column - 10) * (8.5 + row * 0.5) + (rand() - 0.5) * 5;
      const z = -39 - row * 20 - rand() * 11;
      if (row < 2 && Math.abs(x) < 12) continue;
      const width = 3.3 + rand() * 5.4;
      const depth = 4 + rand() * 6;
      const height = 8 + rand() * 22 + row * 1.9;
      const tower = new THREE.Mesh(buildingGeometry, [side, side, roof, roof, front, side]);
      tower.position.set(x, height / 2, z);
      tower.scale.set(width, height, depth);
      scene.add(tower);

      if (index % 3 === 0) {
        const corners = [
          new THREE.Vector3(x - width / 2, height + 0.04, z + depth / 2),
          new THREE.Vector3(x + width / 2, height + 0.04, z + depth / 2),
          new THREE.Vector3(x + width / 2, height + 0.04, z - depth / 2),
          new THREE.Vector3(x - width / 2, height + 0.04, z - depth / 2),
          new THREE.Vector3(x - width / 2, height + 0.04, z + depth / 2),
        ];
        const line = new THREE.Line(remember(new THREE.BufferGeometry().setFromPoints(corners)), edgeMaterials[Math.floor(index / 3) % 3]);
        scene.add(line);
      }
      if (index % 7 === 0) {
        const crown = new THREE.Mesh(buildingGeometry, roof);
        crown.position.set(x, height + 0.7, z);
        crown.scale.set(width * 0.55, 1.4, depth * 0.5);
        scene.add(crown);
        const antenna = new THREE.Line(remember(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, height + 1.4, z),
          new THREE.Vector3(x, height + 4 + rand() * 3, z),
        ])), antennaMaterial);
        scene.add(antenna);
      }
    }

    const groundGeometry = remember(new THREE.PlaneGeometry(310, 310));
    const groundMaterial = remember(new THREE.MeshBasicMaterial({ color: '#0b1425', transparent: true, opacity: 0.88 }));
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.12, -80);
    scene.add(ground);
    const roadGeometry = remember(new THREE.PlaneGeometry(12, 260));
    const roadMaterial = remember(new THREE.MeshBasicMaterial({ color: '#080f1c' }));
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, -0.06, -66);
    scene.add(road);
    const roadEdges = remember(new THREE.LineBasicMaterial({ color: '#6b76ae', transparent: true, opacity: 0.27 }));
    for (const x of [-6.3, -5.8, 5.8, 6.3]) {
      const line = new THREE.Line(remember(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0, 52), new THREE.Vector3(x, 0, -195),
      ])), roadEdges);
      scene.add(line);
    }
    const markerMaterial = remember(new THREE.MeshBasicMaterial({ color: '#768195', transparent: true, opacity: 0.24 }));
    const markerGeometry = remember(new THREE.PlaneGeometry(0.07, 1.7));
    for (let z = -180; z < 50; z += 6) {
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.rotation.x = -Math.PI / 2;
      marker.position.set(0, 0.02, z);
      scene.add(marker);
    }

    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = glowCanvas.height = 64;
    const glowCtx = glowCanvas.getContext('2d');
    if (glowCtx) {
      const gradient = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.12, 'rgba(255,255,255,.7)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,.15)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      glowCtx.fillStyle = gradient;
      glowCtx.fillRect(0, 0, 64, 64);
    }
    const glowTexture = remember(new THREE.CanvasTexture(glowCanvas));
    const hazeSpecs = [
      { x: -39, y: 3, z: -78, size: 50, color: '#983aaf', opacity: 0.11 },
      { x: 42, y: 6, z: -88, size: 56, color: '#2379a8', opacity: 0.13 },
      { x: 0, y: 10, z: -157, size: 90, color: '#7380aa', opacity: 0.13 },
    ];
    hazeSpecs.forEach(spec => {
      const material = remember(new THREE.SpriteMaterial({ map: glowTexture, color: spec.color, transparent: true, opacity: spec.opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
      const glow = new THREE.Sprite(material);
      glow.position.set(spec.x, spec.y, spec.z);
      glow.scale.setScalar(spec.size);
      scene.add(glow);
    });

    const pink = remember(new THREE.MeshBasicMaterial({ color: '#f487b4', transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
    const cyan = remember(new THREE.MeshBasicMaterial({ color: '#91d7e9', transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
    const trailGeometry = remember(new THREE.PlaneGeometry(0.11, 2.2));
    const glowMaterials = ['#f06baf', '#84cde7'].map(color => remember(new THREE.SpriteMaterial({ map: glowTexture, color, transparent: true, opacity: 0.48, depthWrite: false, blending: THREE.AdditiveBlending })));
    const cars: { group: THREE.Group; direction: number; speed: number }[] = [];
    for (let index = 0; index < 32; index++) {
      const direction = index % 2 ? 1 : -1;
      const group = new THREE.Group();
      const material = direction === 1 ? pink : cyan;
      for (const offset of [-0.16, 0.16]) {
        const trail = new THREE.Mesh(trailGeometry, material);
        trail.rotation.x = -Math.PI / 2;
        trail.position.x = offset;
        group.add(trail);
      }
      const glow = new THREE.Sprite(glowMaterials[index % 2]);
      glow.scale.set(1.15, 0.5, 1);
      glow.position.set(0, 0.08, direction * 0.8);
      group.add(glow);
      group.position.set(direction * (1.5 + rand() * 2.3), 0.09, -180 + rand() * 225);
      cars.push({ group, direction, speed: 6 + rand() * 9 });
      scene.add(group);
    }

    const starPositions: number[] = [];
    for (let index = 0; index < 95; index++) starPositions.push((rand() - 0.5) * 300, 44 + rand() * 78, -130 - rand() * 140);
    const starGeometry = remember(new THREE.BufferGeometry());
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = remember(new THREE.PointsMaterial({ color: '#b2c4e6', size: 0.16, transparent: true, opacity: 0.56, depthWrite: false, sizeAttenuation: true }));
    scene.add(new THREE.Points(starGeometry, starMaterial));
    const aircraftMaterial = remember(new THREE.SpriteMaterial({ map: glowTexture, color: '#bfd6f4', transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
    const aircraft: { sprite: THREE.Sprite; speed: number }[] = [];
    for (let index = 0; index < 2; index++) {
      const sprite = new THREE.Sprite(aircraftMaterial);
      sprite.position.set(-65 + index * 100, 43 + index * 16, -105 - index * 35);
      sprite.scale.set(0.8, 0.45, 1);
      aircraft.push({ sprite, speed: index ? -1.8 : 2.2 });
      scene.add(sprite);
    }

    let frame = 0;
    let lastFrame = 0;
    let visible = true;
    let disposed = false;
    let width = 0;
    let height = 0;
    const shouldAnimate = () => !disposed && !reducedMotion && visible && !document.hidden && width > 0 && height > 0;
    const render = (time: number) => {
      frame = 0;
      if (!shouldAnimate()) return;
      if (time - lastFrame >= 1000 / 28) {
        const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.1) : 0;
        cars.forEach(({ group, direction, speed }) => {
          group.position.z += delta * direction * speed;
          if (group.position.z > 48) group.position.z = -184;
          if (group.position.z < -184) group.position.z = 48;
        });
        aircraft.forEach(({ sprite, speed }) => {
          sprite.position.x += delta * speed;
          if (sprite.position.x > 110) sprite.position.x = -110;
          if (sprite.position.x < -110) sprite.position.x = 110;
        });
        renderer.render(scene, camera);
        lastFrame = time;
      }
      frame = requestAnimationFrame(render);
    };
    const syncAnimation = () => {
      if (!shouldAnimate()) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastFrame = 0;
      } else if (!frame) {
        lastFrame = 0;
        frame = requestAnimationFrame(render);
      }
    };
    const resize = () => {
      if (disposed) return;
      width = host.clientWidth;
      height = host.clientHeight;
      if (width > 0 && height > 0) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      }
      syncAnimation();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
      syncAnimation();
    }, { rootMargin: '80px' });
    intersectionObserver.observe(host);
    document.addEventListener('visibilitychange', syncAnimation);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', syncAnimation);
      resources.forEach(resource => resource.dispose());
      scene.clear();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reducedMotion]);

  return <div className="city-atmosphere" ref={container} aria-hidden="true" />;
}
