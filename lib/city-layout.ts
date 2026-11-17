/** Logical scene coordinates. The viewport scales and pans this complete city. */
export const CITY_WIDTH = 1600;
export const CITY_HEIGHT = 940;

export type CitySlotLayout = {
  billboardId: string;
  face: 'front' | 'side';
  /** Fractions of the front width/height, or the side depth/height. */
  x: number;
  y: number;
  width: number;
  height: number;
  variant?: 'hero' | 'portrait' | 'ribbon' | 'compact';
};

export type BuildingLayout = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  rise: number;
  layer: number;
  accent: string;
  crown?: 'spire' | 'setback' | 'antenna';
  slots: CitySlotLayout[];
};

/**
 * Each prism's side recedes toward x=800 and upward by `rise` pixels.
 * Back towers frame the center; shorter foreground buildings leave a street
 * canyon beneath the flagship. Every inventory ID has one selectable surface.
 */
export const BUILDING_LAYOUT: BuildingLayout[] = [
  {
    id: 'haven-tower', x: 230, y: 105, width: 135, height: 300,
    depth: 50, rise: 28, layer: 1, accent: '#9fc2a2', crown: 'setback',
    slots: [
      { billboardId: 'haven', face: 'front', x: 0.06, y: 0.08, width: 0.88, height: 0.3 },
    ],
  },
  {
    id: 'mint-tower', x: 1245, y: 110, width: 150, height: 320,
    depth: 50, rise: 29, layer: 1, accent: '#98f5b1', crown: 'antenna',
    slots: [
      { billboardId: 'mint', face: 'front', x: 0.06, y: 0.08, width: 0.78, height: 0.3 },
    ],
  },
  {
    id: 'atlas-block', x: 65, y: 265, width: 180, height: 380,
    depth: 70, rise: 42, layer: 2, accent: '#79a9ff', crown: 'setback',
    slots: [
      { billboardId: 'atlas', face: 'front', x: 0.06, y: 0.09, width: 0.88, height: 0.42 },
      { billboardId: 'mono', face: 'front', x: 0.06, y: 0.64, width: 0.88, height: 0.21, variant: 'ribbon' },
      { billboardId: 'forma', face: 'side', x: 0.1, y: 0.19, width: 0.8, height: 0.5, variant: 'portrait' },
    ],
  },
  {
    id: 'lumen-block', x: 325, y: 310, width: 170, height: 330,
    depth: 65, rise: 35, layer: 3, accent: '#caff66', crown: 'antenna',
    slots: [
      { billboardId: 'lumen', face: 'front', x: 0.05, y: 0.24, width: 0.9, height: 0.53 },
      { billboardId: 'velo', face: 'front', x: 0.05, y: 0.05, width: 0.9, height: 0.12, variant: 'ribbon' },
    ],
  },
  {
    id: 'nova-flagship', x: 655, y: 195, width: 350, height: 455,
    depth: 90, rise: 50, layer: 3, accent: '#a68bfa', crown: 'spire',
    slots: [
      { billboardId: 'nova', face: 'front', x: 0.035, y: 0.1, width: 0.93, height: 0.63, variant: 'hero' },
      { billboardId: 'flux', face: 'side', x: 0.1, y: 0.12, width: 0.8, height: 0.6, variant: 'portrait' },
    ],
  },
  {
    id: 'arc-block', x: 1110, y: 290, width: 185, height: 360,
    depth: 75, rise: 42, layer: 3, accent: '#ff8a48', crown: 'setback',
    slots: [
      { billboardId: 'arc', face: 'front', x: 0.05, y: 0.1, width: 0.9, height: 0.56, variant: 'portrait' },
      { billboardId: 'sol', face: 'front', x: 0.05, y: 0.76, width: 0.9, height: 0.2, variant: 'ribbon' },
    ],
  },
  {
    id: 'vertex-tower', x: 1430, y: 235, width: 145, height: 445,
    depth: 58, rise: 36, layer: 2, accent: '#7e9dff', crown: 'spire',
    slots: [
      { billboardId: 'vertex', face: 'front', x: 0.05, y: 0.08, width: 0.9, height: 0.72, variant: 'portrait' },
    ],
  },
  {
    id: 'pulse-podium', x: 230, y: 665, width: 270, height: 145,
    depth: 90, rise: 42, layer: 6, accent: '#64e5f4',
    slots: [
      { billboardId: 'pulse', face: 'front', x: 0.04, y: 0.1, width: 0.92, height: 0.68, variant: 'ribbon' },
    ],
  },
  {
    id: 'orbit-podium', x: 1170, y: 680, width: 220, height: 225,
    depth: 80, rise: 40, layer: 5, accent: '#ff61b7',
    slots: [
      { billboardId: 'orbit', face: 'front', x: 0.05, y: 0.08, width: 0.9, height: 0.73 },
    ],
  },
  {
    id: 'vacant-podium', x: 870, y: 660, width: 220, height: 170,
    depth: 75, rise: 35, layer: 5, accent: '#caff66',
    slots: [
      { billboardId: 'vacant', face: 'front', x: 0.04, y: 0.1, width: 0.92, height: 0.75 },
    ],
  },
  {
    id: 'blank-kiosk', x: 700, y: 760, width: 74, height: 88,
    depth: 25, rise: 12, layer: 7, accent: '#bda4ff',
    slots: [
      { billboardId: 'blank', face: 'front', x: 0.06, y: 0.07, width: 0.88, height: 0.7, variant: 'compact' },
    ],
  },
  {
    id: 'kin-kiosk', x: 1080, y: 830, width: 70, height: 80,
    depth: 22, rise: 11, layer: 7, accent: '#ffb69d',
    slots: [
      { billboardId: 'kin', face: 'front', x: 0.06, y: 0.06, width: 0.88, height: 0.8, variant: 'compact' },
    ],
  },
  {
    id: 'echo-kiosk', x: 535, y: 725, width: 100, height: 110,
    depth: 32, rise: 15, layer: 7, accent: '#b993ff',
    slots: [
      { billboardId: 'echo', face: 'front', x: 0.06, y: 0.08, width: 0.88, height: 0.75, variant: 'compact' },
    ],
  },
];

export const CITY_SLOT_IDS = BUILDING_LAYOUT.flatMap((building) =>
  building.slots.map((slot) => slot.billboardId),
);
