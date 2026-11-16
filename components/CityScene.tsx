'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowUpRight, Expand, MapPin, Sparkles } from 'lucide-react';
import { BILLBOARDS } from '@/lib/market';
import './city.css';

export interface CitySceneProps {
  zoom: number;
  view: 'perspective' | 'map';
  filter: string;
  district?: string;
  query?: string;
  onSelect: (id: string) => void;
  onExplore?: () => void;
  reducedMotion?: boolean;
}

const buildings = [
  [0, 31, 7, 53], [5, 15, 8, 70], [12, 36, 7, 41], [17, 20, 10, 59],
  [25, 39, 6, 38], [29, 14, 8, 65], [36, 4, 13, 75], [48, 0, 7, 81],
  [54, 22, 10, 58], [63, 9, 9, 69], [70, 27, 9, 50], [77, 4, 10, 75],
  [86, 19, 7, 62], [92, 30, 8, 51],
];

function randomGenerator(seed: number) {
  return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
}

function CityCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = container.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch { return; }
    const rand = randomGenerator(2129);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#100c20', 0.019);
    const camera = new THREE.PerspectiveCamera(47, 1, 0.1, 180);
    camera.position.set(0, 17, 38);
    camera.lookAt(0, 10, -28);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor('#090913', 0);
    host.appendChild(renderer.domElement);
    const disposable: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];
    const windowCanvas = document.createElement('canvas');
    windowCanvas.width = 128; windowCanvas.height = 256;
    const ctx = windowCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0b1120'; ctx.fillRect(0, 0, 128, 256);
      for (let y = 3; y < 256; y += 10) for (let x = 3; x < 128; x += 8) {
        ctx.fillStyle = rand() > 0.62 ? ['#586685', '#7e66ad', '#37677b', '#bda480'][Math.floor(rand() * 4)] : '#141a2b';
        ctx.fillRect(x, y, 3, 4);
      }
    }
    const texture = new THREE.CanvasTexture(windowCanvas);
    texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping;
    disposable.push(texture);
    const geometry = new THREE.BoxGeometry(1, 1, 1); disposable.push(geometry);
    const material = new THREE.MeshBasicMaterial({ map: texture, color: '#9998b2' }); disposable.push(material);
    const lineMaterials = ['#ff168b', '#a54bff', '#17bbd4'].map(color => {
      const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.42 }); disposable.push(m); return m;
    });
    for (let i = 0; i < 90; i++) {
      const side = i % 2 ? 1 : -1;
      const x = side * (6 + rand() * 39), z = -9 - rand() * 100;
      const w = 2 + rand() * 5, h = 6 + rand() * 26, d = 3 + rand() * 6;
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(w, h, d); mesh.position.set(x, h / 2 - 2, z); scene.add(mesh);
      if (i % 3 === 0) {
        const edgeGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x - w / 2, h - 2, z + d / 2 + .03),
          new THREE.Vector3(x + w / 2, h - 2, z + d / 2 + .03),
          new THREE.Vector3(x + w / 2, -2, z + d / 2 + .03),
        ]);
        disposable.push(edgeGeo); scene.add(new THREE.Line(edgeGeo, lineMaterials[i % 3]));
      }
    }
    const groundGeometry = new THREE.PlaneGeometry(190, 190);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: '#080b13', transparent: true, opacity: .9 });
    disposable.push(groundGeometry, groundMaterial);
    const ground = new THREE.Mesh(groundGeometry, groundMaterial); ground.rotation.x = -Math.PI / 2; ground.position.y = -2; scene.add(ground);
    for (let i = -1; i <= 1; i += 2) {
      const roadGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i * 4.5, -1.95, 40), new THREE.Vector3(i * 4.5, -1.95, -120)]);
      disposable.push(roadGeo); scene.add(new THREE.Line(roadGeo, lineMaterials[i === -1 ? 0 : 2]));
    }
    const cars: THREE.Mesh[] = [];
    const carGeo = new THREE.BoxGeometry(.12, .04, 2.5); disposable.push(carGeo);
    const pink = new THREE.MeshBasicMaterial({ color: '#ff42ab' });
    const cyan = new THREE.MeshBasicMaterial({ color: '#7beafc' }); disposable.push(pink, cyan);
    for (let i = 0; i < 28; i++) {
      const car = new THREE.Mesh(carGeo, i % 2 ? pink : cyan);
      car.position.set((i % 2 ? -1 : 1) * (1.4 + rand() * 2), -1.85, -100 + rand() * 135);
      cars.push(car); scene.add(car);
    }
    let frame = 0, last = 0;
    const render = (time: number) => {
      if (time - last > 32) {
        if (!reducedMotion) cars.forEach((car, i) => { car.position.z += (i % 2 ? .32 : -.25); if (car.position.z > 38) car.position.z = -100; if (car.position.z < -100) car.position.z = 38; });
        renderer.render(scene, camera); last = time;
      }
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix();
      if (reducedMotion) renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize); observer.observe(host); resize(); render(100);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); disposable.forEach(item => item.dispose()); renderer.dispose(); renderer.domElement.remove(); };
  }, [reducedMotion]);
  return <div className="city-three" ref={container} aria-hidden="true" />;
}

export default function CityScene({ zoom, view, filter, district = 'All districts', query = '', onSelect, reducedMotion: reduce = false }: CitySceneProps) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReducedMotion(media.matches); update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const reducedMotion = reduce || systemReducedMotion;
  const matches = (category: string, id: string) => {
    const billboard = BILLBOARDS.find(item => item.id === id);
    const categoryMatches = !filter || ['all', 'all categories'].includes(filter.toLowerCase()) || category.toLowerCase() === filter.toLowerCase();
    const districtMatches = !district || ['all', 'all districts'].includes(district.toLowerCase()) || billboard?.district.toLowerCase() === district.toLowerCase();
    const queryMatches = !query || (billboard && `${billboard.brand} ${billboard.headline} ${billboard.category} ${billboard.district}`.toLowerCase().includes(query.toLowerCase()));
    return categoryMatches && districtMatches && queryMatches;
  };
  const select = (id: string) => { if (!dragging) onSelect(id); };
  return (
    <div className={`city-scene ${view === 'map' ? 'city-map' : ''} ${reducedMotion ? 'city-still' : ''} ${dragging ? 'is-dragging' : ''}`}
      onPointerDown={event => {
        if ((event.target as HTMLElement).closest('button, a')) return;
        drag.current = { x: event.clientX, y: event.clientY, px: pan.x, py: pan.y };
        event.currentTarget.setPointerCapture(event.pointerId); setDragging(true);
      }}
      onPointerMove={event => {
        if (!drag.current) return;
        setPan({ x: Math.max(-260, Math.min(260, drag.current.px + event.clientX - drag.current.x)), y: Math.max(-120, Math.min(120, drag.current.py + event.clientY - drag.current.y)) });
      }}
      onPointerUp={() => { drag.current = null; setDragging(false); }}
      onPointerCancel={() => { drag.current = null; setDragging(false); }}
      aria-label="Interactive neon city. Drag to explore, use zoom controls, or select a billboard."
    >
      <div className="city-world" style={{ transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom > 5 ? zoom / 100 : zoom})` }}>
        <div className="city-sky"><div className="city-moon" /><span className="city-beam beam-one" /><span className="city-beam beam-two" /></div>
        <CityCanvas reducedMotion={reducedMotion} />
        <div className="city-fallback-skyline" aria-hidden="true">{buildings.map(([left, top, width, height], index) => <div key={index} className={`city-tower tower-${index}`} style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}><span /></div>)}</div>
        <div className="city-haze" aria-hidden="true" />
        <div className="city-ground" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <span className="city-coordinate">40°45′24.4″N &nbsp; 73°59′08.8″W</span>
        <div className="city-building building-lumen"><div className="building-cap" /><div className="building-windows" />
          <button className={`city-ad ad-lumen ${matches('Lifestyle', 'lumen') ? '' : 'ad-dim'}`} onClick={() => select('lumen')} aria-label="Explore Lumen wellness campaign">
            <span className="ad-small">LUMEN®</span><span className="lumen-flower" aria-hidden="true">✳</span><strong>Less noise.<br />More you.</strong><span className="ad-bottom">GOOD ENERGY, ON REPEAT <ArrowUpRight size={15} /></span>
          </button><div className="building-sign">電 子 都 市 <span>WELCOME TO THE FUTURE</span></div>
        </div>
        <div className="city-building building-nova"><div className="building-crown"><span /><span /><span /></div><div className="building-windows" />
          <button className={`city-ad ad-nova ${matches('AI & Tech', 'nova') ? '' : 'ad-dim'}`} onClick={() => select('nova')} aria-label="Explore Nova AI featured campaign">
            <span className="nova-brand"><Sparkles size={24} strokeWidth={1.4} /> nova<span>.ai</span></span>
            <strong>Make room<br />for what’s next.</strong><span className="nova-orb" aria-hidden="true"><i /><i /><i /></span>
            <span className="ad-bottom">YOUR NEXT BIG IDEA STARTS HERE <ArrowUpRight size={18} /></span>
          </button><div className="nova-under-sign"><span>●</span> THE FUTURE IS ALREADY HERE <span>●</span></div>
        </div>
        <div className="city-building building-arc"><div className="building-cap" /><div className="building-windows" />
          <button className={`city-ad ad-arc ${matches('Lifestyle', 'arc') ? '' : 'ad-dim'}`} onClick={() => select('arc')} aria-label="Explore ARC fashion campaign">
            <span className="ad-small">ARC® <ArrowUpRight size={18} /></span><span className="arc-sculpture" aria-hidden="true"><i /><i /><i /><i /></span><strong>BUILT FOR<br />THE AFTER HOURS.</strong><span className="ad-bottom">THE NEXT COLLECTION. &nbsp; 2026</span>
          </button><div className="arc-ticker">NEW SEASON · NEW ENERGY · NEW SEASON ·</div>
        </div>
        <div className="city-building building-orbit"><div className="building-windows" />
          <button className={`city-ad ad-orbit ${matches('Gaming', 'orbit') ? '' : 'ad-dim'}`} onClick={() => select('orbit')} aria-label="Explore Orbit gaming campaign"><span className="orbit-ring" aria-hidden="true" /><span className="ad-small">orbit®</span><strong>OUTSIDE<br />THE ORDINARY.</strong><span className="ad-bottom">A NEW WORLD IS CALLING <ArrowUpRight size={14} /></span></button>
        </div>
        <div className="city-building building-pulse"><div className="building-windows" />
          <button className={`city-ad ad-pulse ${matches('Finance', 'pulse') ? '' : 'ad-dim'}`} onClick={() => select('pulse')} aria-label="Explore Pulse finance campaign"><span className="ad-small">PULSE_ <span>YOUR MONEY. IN MOTION.</span></span><span className="pulse-wave" aria-hidden="true">∿∿∿</span><strong>STAY ONE<br />BEAT AHEAD.<ArrowUpRight size={23} /></strong></button>
        </div>
        <div className="city-building building-vacant"><div className="building-windows" />
          <button className={`city-ad ad-vacant ${matches('Creative', 'vacant') ? '' : 'ad-dim'}`} onClick={() => select('vacant')} aria-label="View available billboard placement"><span className="vacant-cross">+</span><strong>The city<br />is watching.</strong><span className="ad-bottom">CLAIM THIS SPACE <ArrowUpRight size={16} /></span></button>
        </div>
        <div className="city-street-sign"><MapPin size={12} /> CENTRAL SQUARE <span>01</span></div>
        <div className="city-rain" aria-hidden="true" />
      </div>
      <div className="city-vignette" aria-hidden="true" />
      {pan.x !== 0 || pan.y !== 0 ? <button className="city-reset" onClick={() => setPan({ x: 0, y: 0 })} aria-label="Reset city position"><Expand size={14} /> Recenter</button> : null}
    </div>
  );
}
