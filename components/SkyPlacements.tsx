'use client';

import { ArrowUpRight } from 'lucide-react';
import { BILLBOARDS, type Billboard } from '@/lib/market';

type Props = { onSelect: (id: string) => void; highlighted: (ad: Billboard) => boolean };

/** Additive ad targets: the moon stays at its original position and size. */
export default function SkyPlacements({onSelect,highlighted}:Props) {
  const moon=BILLBOARDS.find(ad=>ad.id==='moon');
  const signal=BILLBOARDS.find(ad=>ad.id==='sky-signal');
  if(!moon||!signal)return null;
  return <>
    <div className={`sky-projection-beam ${!highlighted(signal)?'sky-placement-dim':''}`} aria-hidden="true">
      <svg viewBox="0 0 110 58" preserveAspectRatio="none"><defs><linearGradient id="ad-sky-beam" gradientUnits="userSpaceOnUse" x1="55" y1="29" x2="190" y2="420"><stop stopColor="#a4edff" stopOpacity=".16"/><stop offset=".4" stopColor="#7a9fff" stopOpacity=".065"/><stop offset="1" stopColor="#85dbf5" stopOpacity="0"/></linearGradient></defs><path d="M190 420 L6 29 Q55 55 104 29 Z" fill="url(#ad-sky-beam)"/><path d="M9 30 L190 420 L101 30" stroke="#bbecff" strokeWidth=".6" fill="none" opacity=".06"/></svg>
    </div>
    <button type="button" className={`moon-placement sky-ad-target ${!highlighted(moon)?'sky-placement-dim':''}`} aria-label="Explore the available Moon takeover ad space, 500 by 500 pixels" onClick={()=>onSelect(moon.id)}>
      <span className="city-moon" aria-hidden="true"><span className="moon-ad-glyph">A</span><span className="moon-ad-crater"/></span>
      <span className="sky-placement-label">Moon takeover <ArrowUpRight size={10}/></span>
    </button>
    <button type="button" className={`signal-placement sky-ad-target ${!highlighted(signal)?'sky-placement-dim':''}`} aria-label="Explore the available sky signal ad space, 500 by 500 pixels" onClick={()=>onSelect(signal.id)}>
      <span className="signal-cloud-halo" aria-hidden="true"/>
      <svg className="signal-disc" viewBox="0 0 116 64" aria-hidden="true"><defs><radialGradient id="ad-sky-disc"><stop stopColor="#edfcff" stopOpacity=".88"/><stop offset=".55" stopColor="#bcecff" stopOpacity=".66"/><stop offset="1" stopColor="#8fb4f1" stopOpacity=".12"/></radialGradient></defs><ellipse cx="58" cy="32" rx="55" ry="28" fill="url(#ad-sky-disc)"/><ellipse cx="58" cy="32" rx="48" ry="23" fill="none" stroke="#c9efff" strokeOpacity=".22"/><path d="M39 45 54 17h8l16 28H66l-8-16-8 16Z" fill="#152b46" fillOpacity=".85"/><path d="M52 40h13l-7-11Z" fill="#d8f3ff" fillOpacity=".7"/></svg>
      <span className="sky-placement-label">Your signal in the sky <ArrowUpRight size={10}/></span>
    </button>
  </>;
}
