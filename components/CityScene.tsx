'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Expand, MapPin, Plus, Sparkles } from 'lucide-react';
import { BILLBOARDS, DISTRICTS, type Billboard } from '@/lib/market';
import { BUILDING_LAYOUT, CITY_HEIGHT, CITY_WIDTH, type BuildingLayout } from '@/lib/city-layout';
import CityAtmosphere from './CityAtmosphere';
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

const distantTowers = Array.from({length: 28}, (_, i) => ({
  x: i * 62 - 35, y: 115 + ((i * 53) % 125), width: 30 + (i * 13) % 45,
  height: 270 + (i * 37) % 210, depth: 16 + (i * 7) % 15,
}));

function Creative({ad,variant='portrait',side=false}:{ad:Billboard;variant?:string;side?:boolean}) {
  const available=ad.status==='available';
  return <div className={`billboard-creative creative-${ad.id} creative-${variant} ${available?'creative-available':''} ${side?'creative-side':''}`}>
    <span className="creative-brand">{ad.id==='nova'&&<Sparkles size={23} strokeWidth={1.5}/>} {available?(ad.id==='vacant'?'Your brand.':ad.id==='blank'?'YOUR AD':ad.brand):ad.brand}<ArrowUpRight className="creative-arrow" size={17}/></span>
    <span className="creative-motif" aria-hidden="true"><i/><i/><i/><i/></span>
    <strong className="creative-headline">{ad.headline}</strong>
    <span className="creative-footer">{available?'THIS SPOTLIGHT COULD BE YOURS':ad.tagline}<ArrowUpRight size={13}/></span>
    {available&&<Plus className="creative-plus" size={30} strokeWidth={1}/>}
    <span className="screen-scanlines" aria-hidden="true"/>
  </div>;
}

function Prism({building}:{building:BuildingLayout}) {
  const {id,width:w,height:h,depth:d,rise:r,accent,crown}=building;
  const right=building.x+w/2<CITY_WIDTH/2, dx=right?d:-d;
  const side=right?`${w},0 ${w+d},${-r} ${w+d},${h-r} ${w},${h}`:`0,0 ${-d},${-r} ${-d},${h-r} 0,${h}`;
  const roof=`0,0 ${w},0 ${w+dx},${-r} ${dx},${-r}`;
  const sideMatrix=right?`matrix(1 ${-r/d} 0 1 ${w} 0)`:`matrix(1 ${r/d} 0 1 ${-d} ${-r})`;
  return <svg className="prism-structure" width={w+2*d+100} height={h+r+135} viewBox={`${-d-50} ${-r-80} ${w+2*d+100} ${h+r+135}`} style={{left:-d-50,top:-r-80}} aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-front`} x2="1" y2="1"><stop stopColor="#273041"/><stop offset=".5" stopColor="#171e2d"/><stop offset="1" stopColor="#101720"/></linearGradient>
      <linearGradient id={`${id}-side`} x2="1" y2=".3"><stop stopColor="#1b2332"/><stop offset="1" stopColor="#0a101c"/></linearGradient>
      <linearGradient id={`${id}-roof`} x2=".2" y2="1"><stop stopColor="#485067"/><stop offset="1" stopColor="#252e40"/></linearGradient>
      <linearGradient id={`${id}-shine`} x2="1" y2="0"><stop stopColor={accent} stopOpacity=".22"/><stop offset=".4" stopColor={accent} stopOpacity=".025"/><stop offset="1" stopColor={accent} stopOpacity=".1"/></linearGradient>
      <pattern id={`${id}-windows`} width="16" height="18" patternUnits="userSpaceOnUse"><path d="M 0 17 H16 M15 0 V18" stroke="#080d18" strokeWidth="4"/><rect x="3" y="4" width="3" height="7" fill="#bac3db" opacity=".27"/><rect x="9" y="4" width="3" height="7" fill={accent} opacity=".16"/></pattern>
      <filter id={`${id}-shadow`} x="-50%" y="-100%" width="200%" height="400%"><feGaussianBlur stdDeviation="13"/></filter>
      <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <ellipse cx={w*.5+dx*.3} cy={h+10} rx={w*.68+d*.4} ry="17" fill="#030611" opacity=".85" filter={`url(#${id}-shadow)`}/>
    <polygon points={side} fill={`url(#${id}-side)`} stroke="#3a4559" strokeWidth=".8"/>
    <g transform={sideMatrix}><rect width={d} height={h} fill={`url(#${id}-windows)`} opacity=".65"/><rect width={d} height={h} fill={`url(#${id}-shine)`}/><path d={`M3 0 V${h} M${d-3} 0 V${h}`} stroke={accent} strokeOpacity=".25" strokeWidth="1"/></g>
    <rect width={w} height={h} fill={`url(#${id}-front)`} stroke="#485165" strokeWidth=".85"/>
    <rect x="5" y="8" width={w-10} height={h-12} fill={`url(#${id}-windows)`}/>
    <rect x="1" y="1" width={w-2} height={h-2} fill={`url(#${id}-shine)`}/>
    {[.23,.49,.74].map(n=><path key={n} d={`M${w*n} 0 V${h}`} stroke="#080d16" strokeWidth="4" opacity=".6"/>)}
    {[.3,.62,.89].map(n=><path key={n} d={`M0 ${h*n} H${w}`} stroke="#101521" strokeWidth="7"/>)}
    <rect x="2" y={h-20} width={w-4} height="19" fill="#080f19"/><path d={`M5 ${h-17} H${w-5}`} stroke={accent} strokeWidth="1.5" opacity=".48"/>
    <polygon points={roof} fill={`url(#${id}-roof)`} stroke="#627087" strokeWidth="1"/>
    <path d={`M0 0 H${w} L${w+dx} ${-r}`} fill="none" stroke={accent} strokeWidth="2" opacity=".55"/>
    <path d={`M0 0 H${w} L${w+dx} ${-r}`} fill="none" stroke={accent} strokeWidth="4" opacity=".35" filter={`url(#${id}-glow)`}/>
    {[.22,.55,.75].map((n,i)=><g key={n} transform={`translate(${w*n+dx*.35},${-r*.35-5})`}><path d="M0 0 h18 l8 -5 h-18z" fill="#737b89" opacity=".35"/><rect width="18" height="5" fill="#151e2d"/><path d="M3 1 h12 M3 3 h12" stroke="#616c7b" strokeWidth=".5"/><path d="M18 0 l8 -5 v5 l-8 5z" fill="#1d2634"/>{i===0&&<circle cx="7" cy="-2" r="2" fill="#080e18"/>}</g>)}
    {crown&&<g className="prism-crown"><path d={`M${w*.24} ${-r*.3} v-24 h${w*.5} v24`} fill="#263044" stroke="#667084" strokeWidth=".7"/><path d={`M${w*.24} ${-r*.3-24} l${dx*.36} ${-r*.36} h${w*.5} l${-dx*.36} ${r*.36}`} fill="#363e52" stroke="#778098" strokeWidth=".7"/><path d={`M${w*.24+6} ${-r*.3-12} h${w*.5-12}`} stroke={accent} opacity=".6"/>{crown==='spire'&&<><path d={`M${w*.5+dx*.2} ${-r*.3-24} v-61`} stroke="#6d718a" strokeWidth="2"/><circle cx={w*.5+dx*.2} cy={-r*.3-85} r="2.2" fill={accent} className="antenna-beacon"/></>}{crown==='antenna'&&<><path d={`M${w*.63} ${-r*.3-24} v-35 l-13 13 m13 -4 l-13 13`} stroke="#9d9fb4" strokeWidth="1.5"/><circle cx={w*.63} cy={-r*.3-60} r="1.7" fill="#ff6cb7" className="antenna-beacon"/></>}</g>}
    <path d={`M0 0 V${h} H${w} V0`} fill="none" stroke="#8394ad" strokeOpacity=".2"/>
  </svg>;
}

export default function CityScene({zoom,view,filter,district='All districts',query='',onSelect,reducedMotion:reduce=false}:CitySceneProps) {
  const host=useRef<HTMLDivElement>(null);
  const [size,setSize]=useState({width:1400,height:730});
  const [pan,setPan]=useState({x:0,y:0});
  const [dragging,setDragging]=useState(false);
  const [systemMotion,setSystemMotion]=useState(false);
  const drag=useRef<{x:number;y:number;panX:number;panY:number}|null>(null);
  useEffect(()=>{
    if(!host.current)return;const resize=new ResizeObserver(([entry])=>setSize({width:entry.contentRect.width,height:entry.contentRect.height}));resize.observe(host.current);
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setSystemMotion(preference.matches);update();preference.addEventListener('change',update);
    return()=>{resize.disconnect();preference.removeEventListener('change',update);};
  },[]);
  const scale=Math.max(.6,Math.min(size.width/CITY_WIDTH,(size.height-25)/CITY_HEIGHT))*(zoom>5?zoom/100:zoom);
  const bounds={x:Math.max(0,(CITY_WIDTH*scale-size.width)/2)+45,y:Math.max(0,(CITY_HEIGHT*scale-size.height)/2)+45};
  const clampPan=(x:number,y:number)=>({x:Math.max(-bounds.x,Math.min(bounds.x,x)),y:Math.max(-bounds.y,Math.min(bounds.y,y))});
  useEffect(()=>{setPan(p=>({x:Math.max(-bounds.x,Math.min(bounds.x,p.x)),y:Math.max(-bounds.y,Math.min(bounds.y,p.y))}));},[bounds.x,bounds.y]);
  const matches=(ad:Billboard)=>['all','all categories',''].includes(filter.toLowerCase())||ad.category===filter;
  const highlighted=(ad:Billboard)=>matches(ad)&&(['all','all districts',''].includes(district.toLowerCase())||ad.district===district)&&`${ad.brand} ${ad.headline} ${ad.category} ${ad.district}`.toLowerCase().includes(query.toLowerCase());
  const focusPosition=(x:number,y:number,event:React.FocusEvent<HTMLButtonElement>)=>{if(event.currentTarget.matches(':focus-visible'))setPan(clampPan(-(x-CITY_WIDTH/2)*scale,-(y-CITY_HEIGHT/2)*scale));};
  const stageStyle={transform:`translate(calc(-50% + ${pan.x}px),calc(-50% + ${pan.y}px)) scale(${scale})`} as CSSProperties;
  const finishDrag=(event:React.PointerEvent<HTMLDivElement>)=>{drag.current=null;setDragging(false);if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);};
  const moving=reduce||systemMotion;
  return <div ref={host} className={`city-scene city-volume ${view==='map'?'city-map':''} ${moving?'city-still':''} ${dragging?'is-dragging':''}`} tabIndex={0} role="region" aria-label="Interactive advertising city. Drag or use arrow keys to explore. Tab to a billboard and press Enter to discover it."
    onKeyDown={event=>{if(event.target!==event.currentTarget)return;const steps:Record<string,[number,number]>={ArrowLeft:[50,0],ArrowRight:[-50,0],ArrowUp:[0,50],ArrowDown:[0,-50]};if(steps[event.key]){event.preventDefault();const [x,y]=steps[event.key];setPan(p=>clampPan(p.x+x,p.y+y));}}}
    onPointerDown={event=>{if((event.target as HTMLElement).closest('button,a')||event.button!==0)return;drag.current={x:event.clientX,y:event.clientY,panX:pan.x,panY:pan.y};event.currentTarget.setPointerCapture(event.pointerId);setDragging(true);}}
    onPointerMove={event=>{if(!drag.current)return;setPan(clampPan(drag.current.panX+event.clientX-drag.current.x,drag.current.panY+event.clientY-drag.current.y));}}
    onPointerUp={finishDrag} onPointerCancel={finishDrag}>
    <div className="city-sky" aria-hidden="true"><div className="city-aura aura-violet"/><div className="city-aura aura-cyan"/><div className="city-moon"/><div className="sky-starfield"/><div className="city-searchlight searchlight-one"/><div className="city-searchlight searchlight-two"/></div>
    <CityAtmosphere reducedMotion={moving}/>
    <div className="city-world" style={stageStyle}>
      {view==='perspective'?<>
        <div className="distant-skyline" aria-hidden="true">{distantTowers.map((b,i)=><div className="distant-tower" key={i} style={{left:b.x,top:b.y,width:b.width,height:b.height,'--distant-depth':`${b.depth}px`} as CSSProperties}><i/></div>)}</div>
        <div className="city-avenue" aria-hidden="true"><div className="avenue-lanes"/><div className="avenue-crosswalk"/><i/><i/><i/><div className="avenue-light-trail trail-cyan"/><div className="avenue-light-trail trail-pink"/></div>
        <svg className="city-ground-plan" viewBox="0 0 1600 940" aria-hidden="true"><defs><linearGradient id="street-light"><stop stopColor="#9a37a7" stopOpacity=".2"/><stop offset="1" stopColor="#090d17" stopOpacity="0"/></linearGradient></defs><path d="M685 505 L385 940 M860 505 L1165 940 M0 710 L1600 710" stroke="#3f4a61" strokeWidth="2" fill="none"/><path d="M702 505 L480 940 M840 505 L1050 940" stroke="#b84cc9" strokeWidth="1" opacity=".25"/><path d="M720 520 L655 940 M825 520 L930 940" stroke="#26364b" strokeWidth="2"/>{[670,700,740,800,875].map((y,i)=><path key={y} d={`M${630-i*80} ${y} h${280+i*160}`} stroke="#a8bbcd" strokeWidth="1" opacity=".09"/>)}</svg>
        {BUILDING_LAYOUT.map(building=><div className={`city-prism prism-${building.id}`} key={building.id} style={{left:building.x,top:building.y,width:building.width,height:building.height,zIndex:building.layer,'--building-accent':building.accent} as CSSProperties}>
          <Prism building={building}/>
          {building.slots.map(slot=>{const ad=BILLBOARDS.find(item=>item.id===slot.billboardId);if(!ad)return null;const right=building.x+building.width/2<CITY_WIDTH/2;const side=slot.face==='side';const w=(side?building.depth:building.width)*slot.width,h=building.height*slot.height;
            const x=side?(right?building.width+slot.x*building.depth:-building.depth+slot.x*building.depth):slot.x*building.width;
            const y=side?slot.y*building.height+(right?-building.rise*slot.x:-building.rise+building.rise*slot.x):slot.y*building.height;
            const skew=side?(right?-building.rise/building.depth:building.rise/building.depth):0;
            return <button key={ad.id} className={`city-surface surface-${ad.id} ${side?'surface-side':''} ${!highlighted(ad)?'surface-dim':''}`} aria-label={`Explore ${ad.brand}, ${ad.size} billboard in ${ad.district}`} onClick={()=>onSelect(ad.id)} onFocus={e=>focusPosition(building.x+x+w/2,building.y+y+h/2,e)} style={{left:x,top:y,width:w,height:h,transform:`matrix(1,${skew},0,1,0,0)`,'--ad-color':ad.color} as CSSProperties}><Creative ad={ad} variant={w<100&&h<100?'micro':slot.variant||(Math.min(w,h)<135?'compact':'portrait')} side={side}/></button>;
          })}
          <span className="building-address" aria-hidden="true">{String(BUILDING_LAYOUT.indexOf(building)+1).padStart(2,'0')} / ADBOARD</span>
          <div className="building-ground-glow" aria-hidden="true"/>
        </div>)}
        <div className="plaza-sign" aria-hidden="true"><MapPin size={12}/><span>CENTRAL SQUARE</span><b>01</b><i/></div>
        <div className="street-detail street-detail-left" aria-hidden="true"><i/><i/><span>NEON AVENUE</span></div><div className="street-detail street-detail-right" aria-hidden="true"><i/><i/><span>THE CITY IS YOUR CANVAS</span></div>
      </>:<><div className="city-map-grid" aria-hidden="true"/><div className="map-district district-central">CENTRAL SQUARE</div><div className="map-district district-neon">NEON DISTRICT</div><div className="map-district district-skyline">SKYLINE HEIGHTS</div>{BILLBOARDS.map(ad=>{const districtIndex=DISTRICTS.indexOf(ad.district),districtOrder=BILLBOARDS.filter(item=>item.district===ad.district).findIndex(item=>item.id===ad.id);const x=42+(districtIndex*2+districtOrder%2)*255,y=120+Math.floor(districtOrder/2)*260;return <button key={ad.id} className={`city-map-card city-surface ${!highlighted(ad)?'surface-dim':''}`} onClick={()=>onSelect(ad.id)} onFocus={e=>focusPosition(x+112,y+112,e)} aria-label={`Explore ${ad.brand}, ${ad.size} billboard in ${ad.district}`} style={{left:x,top:y,width:230,height:220,'--ad-color':ad.color} as CSSProperties}><Creative ad={ad} variant="compact"/><span className="map-space-label">{ad.district} · {ad.size}</span></button>;})}</>}
    </div>
    <div className="city-depth-haze" aria-hidden="true"/><div className="city-rain" aria-hidden="true"/><div className="city-vignette" aria-hidden="true"/>
    {(pan.x!==0||pan.y!==0)&&<button className="city-reset" onClick={()=>setPan({x:0,y:0})} aria-label="Reset city position"><Expand size={13}/> Recenter</button>}
  </div>;
}
