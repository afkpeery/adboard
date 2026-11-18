export const DISTRICTS = ['Central Square', 'Neon District', 'Skyline Heights'] as const;
export type District = (typeof DISTRICTS)[number];

export const CATEGORIES = ['AI & Tech', 'Lifestyle', 'Gaming', 'Finance', 'Creative'] as const;
export type Category = (typeof CATEGORIES)[number];

export type Billboard = {
  id: string;
  brand: string;
  headline: string;
  tagline: string;
  category: Category;
  district: District;
  size: string;
  width: number;
  height: number;
  dailyPrice: number;
  impressions: number;
  ctr: number;
  color: string;
  status: 'live' | 'available' | 'auction';
  website: string;
  description: string;
  promotion: string;
};

/** Illustrative inventory. Figures are demo data, not measured traffic. */
export const BILLBOARDS: Billboard[] = [
  {
    id: 'nova', brand: 'nova.ai', headline: 'Make room for what’s next.',
    tagline: 'A little intelligence. Unlimited possibility.', category: 'AI & Tech',
    district: 'Central Square', size: '1000 × 1000', width: 1000, height: 1000,
    dailyPrice: 324, impressions: 248600, ctr: 4.8, color: '#a68bfa', status: 'auction',
    website: 'https://example.com/#nova',
    description: 'A flagship canvas at the heart of Central Square. This fictional AI campaign shows what a city-defining placement can look like.',
    promotion: 'Discover your next big idea',
  },
  {
    id: 'arc', brand: 'ARC', headline: 'Built for the after hours.',
    tagline: 'Move differently.', category: 'Lifestyle', district: 'Central Square',
    size: '500 × 500', width: 500, height: 500, dailyPrice: 81,
    impressions: 96400, ctr: 3.6, color: '#ff8a48', status: 'live',
    website: 'https://example.com/#arc',
    description: 'Independent streetwear for the people who make a city their own. A fictional campaign in a high-visibility corner placement.',
    promotion: 'Explore the night collection',
  },
  {
    id: 'lumen', brand: 'LUMEN', headline: 'Less noise. More you.',
    tagline: 'Good energy, on repeat.', category: 'Lifestyle', district: 'Neon District',
    size: '500 × 500', width: 500, height: 500, dailyPrice: 54,
    impressions: 78200, ctr: 4.2, color: '#caff66', status: 'live',
    website: 'https://example.com/#lumen',
    description: 'A fictional wellness brand with a bright, unmistakable identity. Discover a campaign designed to stand out in Neon District.',
    promotion: 'Find your everyday glow',
  },
  {
    id: 'orbit', brand: 'ORBIT', headline: 'Outside the ordinary.',
    tagline: 'A new world is calling.', category: 'Gaming', district: 'Neon District',
    size: '500 × 500', width: 500, height: 500, dailyPrice: 54,
    impressions: 82100, ctr: 5.1, color: '#ff61b7', status: 'live',
    website: 'https://example.com/#orbit',
    description: 'An imagined immersive gaming universe. Its vibrant billboard brings a little otherworldly energy to the city.',
    promotion: 'Enter the next dimension',
  },
  {
    id: 'pulse', brand: 'PULSE', headline: 'Stay one beat ahead.',
    tagline: 'Your money. In motion.', category: 'Finance', district: 'Skyline Heights',
    size: '100 × 100', width: 100, height: 100, dailyPrice: 1.8,
    impressions: 18700, ctr: 2.9, color: '#64e5f4', status: 'live',
    website: 'https://example.com/#pulse',
    description: 'A fictional finance app demonstrating a compact, accessible placement. Sample content only; no financial products are offered.',
    promotion: 'Meet a clearer money picture',
  },
  {
    id: 'vacant', brand: 'Your brand here', headline: 'The city is watching.',
    tagline: 'Make your next move a big one.', category: 'Creative', district: 'Central Square',
    size: '500 × 500', width: 500, height: 500, dailyPrice: 81,
    impressions: 108400, ctr: 0, color: '#caff66', status: 'available',
    website: 'https://example.com/#your-brand',
    description: 'An open canvas overlooking Central Square. Create a local campaign draft to preview your dimensions, placement, and budget.',
    promotion: 'Claim your spotlight',
  },
  {
    id: 'atlas', brand: 'ATLAS', headline: 'Go find your somewhere.',
    tagline: 'The best stories start outside.', category: 'Lifestyle', district: 'Skyline Heights',
    size: '1000 × 1000', width: 1000, height: 1000, dailyPrice: 180,
    impressions: 135200, ctr: 3.8, color: '#79a9ff', status: 'auction',
    website: 'https://example.com/#atlas',
    description: 'An imagined travel collective with a skyline-sized story to tell. Sample auction inventory for exploring premium placements.',
    promotion: 'Discover your next chapter',
  },
  {
    id: 'blank', brand: 'A space for your next idea', headline: 'Small space. Big possibility.',
    tagline: 'Start your city story.', category: 'AI & Tech', district: 'Skyline Heights',
    size: '100 × 100', width: 100, height: 100, dailyPrice: 1.8,
    impressions: 12400, ctr: 0, color: '#bda4ff', status: 'available',
    website: 'https://example.com/#next-idea',
    description: 'An entry-level placement for independent creators and emerging businesses. Plan a campaign without making a purchase.',
    promotion: 'Build your first campaign',
  },
  {
    id: 'mono', brand: 'MONO', headline: 'Make less. Mean more.',
    tagline: 'A new perspective on everyday design.', category: 'Creative', district: 'Central Square',
    size: '1000 × 500', width: 1000, height: 500, dailyPrice: 162,
    impressions: 142800, ctr: 3.7, color: '#f4f1e8', status: 'live',
    website: 'https://example.com/#mono',
    description: 'A fictional independent design studio taking over a wide podium display. A quieter campaign with a generous canvas in the middle of Central Square.',
    promotion: 'See a different kind of design',
  },
  {
    id: 'forma', brand: 'FORMA', headline: 'Shape what’s next.',
    tagline: 'Big ideas deserve a bigger canvas.', category: 'Creative', district: 'Neon District',
    size: '500 × 1000', width: 500, height: 1000, dailyPrice: 108,
    impressions: 118300, ctr: 4.1, color: '#ff705d', status: 'auction',
    website: 'https://example.com/#forma',
    description: 'An imagined creative platform on a tall, street-facing tower panel. Explore a portrait-format auction placement with room for a bold visual story.',
    promotion: 'Create your next great thing',
  },
  {
    id: 'velo', brand: 'VELO', headline: 'Move your own way.',
    tagline: 'Take the long way home.', category: 'Lifestyle', district: 'Central Square',
    size: '1000 × 250', width: 1000, height: 250, dailyPrice: 81,
    impressions: 101600, ctr: 3.4, color: '#f6d45f', status: 'live',
    website: 'https://example.com/#velo',
    description: 'A fictional urban cycling brand stretching across a rooftop ribbon. This wide-format placement follows the rhythm of the city streets below.',
    promotion: 'Find your next route',
  },
  {
    id: 'echo', brand: 'ECHO', headline: 'Play beyond the screen.',
    tagline: 'Your next world starts here.', category: 'Gaming', district: 'Neon District',
    size: '500 × 500', width: 500, height: 500, dailyPrice: 54,
    impressions: 86700, ctr: 4.9, color: '#b993ff', status: 'live',
    website: 'https://example.com/#echo',
    description: 'An imagined social gaming platform with a vivid corner display. A fictional campaign for people who find new adventures after dark.',
    promotion: 'Discover your next world',
  },
  {
    id: 'kin', brand: 'KIN', headline: 'Find your people.',
    tagline: 'Good things happen together.', category: 'Lifestyle', district: 'Neon District',
    size: '100 × 100', width: 100, height: 100, dailyPrice: 2.16,
    impressions: 16400, ctr: 3.2, color: '#ffb69d', status: 'available',
    website: 'https://example.com/#kin',
    description: 'A neighborhood-sized kiosk placement inspired by a fictional community brand. An accessible canvas for a local business or an independent creator.',
    promotion: 'Start something close to home',
  },
  {
    id: 'sol', brand: 'SOL', headline: 'Chase the golden hour.',
    tagline: 'A little sunshine goes a long way.', category: 'Lifestyle', district: 'Skyline Heights',
    size: '1000 × 500', width: 1000, height: 500, dailyPrice: 90,
    impressions: 112500, ctr: 3.9, color: '#ffca64', status: 'live',
    website: 'https://example.com/#sol',
    description: 'An imagined outdoor brand bringing a warm glow to a wide skyline display. A fictional campaign with a view across the elevated district.',
    promotion: 'Follow a brighter path',
  },
  {
    id: 'flux', brand: 'FLUX', headline: 'Ideas, in motion.',
    tagline: 'Go from what if to what’s next.', category: 'AI & Tech', district: 'Neon District',
    size: '500 × 1000', width: 500, height: 1000, dailyPrice: 108,
    impressions: 124900, ctr: 4.6, color: '#60f0e1', status: 'live',
    website: 'https://example.com/#flux',
    description: 'A fictional collaboration platform on a luminous portrait tower. Its tall display illustrates how a vertical campaign can anchor a busy city block.',
    promotion: 'Give your ideas momentum',
  },
  {
    id: 'haven', brand: 'HAVEN', headline: 'Make room for calm.',
    tagline: 'Your everyday, a little softer.', category: 'Lifestyle', district: 'Skyline Heights',
    size: '500 × 500', width: 500, height: 500, dailyPrice: 45,
    impressions: 73400, ctr: 0, color: '#9fc2a2', status: 'available',
    website: 'https://example.com/#haven',
    description: 'A calm, open canvas in Skyline Heights inspired by a fictional home brand. Plan a campaign on a medium-sized building face with an elevated outlook.',
    promotion: 'Picture your brand here',
  },
  {
    id: 'vertex', brand: 'VERTEX', headline: 'The future takes shape.',
    tagline: 'Think beyond the horizon.', category: 'AI & Tech', district: 'Central Square',
    size: '1200 × 1600', width: 1200, height: 1600, dailyPrice: 622.08,
    impressions: 386200, ctr: 5.3, color: '#7e9dff', status: 'auction',
    website: 'https://example.com/#vertex',
    description: 'An entire-building flagship canvas overlooking Central Square. This fictional technology campaign demonstrates a premium portrait takeover with a 1.92-million-pixel footprint.',
    promotion: 'Explore a bigger possibility',
  },
  {
    id: 'mint', brand: 'MINT', headline: 'A fresh start for money.',
    tagline: 'A little clarity. A brighter tomorrow.', category: 'Finance', district: 'Skyline Heights',
    size: '200 × 200', width: 200, height: 200, dailyPrice: 7.2,
    impressions: 24600, ctr: 3.1, color: '#98f5b1', status: 'live',
    website: 'https://example.com/#mint',
    description: 'A fictional personal finance brand on a compact street-level display. An illustrative campaign only; no financial products or services are offered.',
    promotion: 'See the bigger picture',
  },
  {
    id: 'spotlight', brand: 'Your next spotlight', headline: 'Make your next move a big one.',
    tagline: 'A fresh canvas in the heart of the city.', category: 'Creative', district: 'Central Square',
    size: '1000 × 250', width: 1000, height: 250, dailyPrice: 81,
    impressions: 86400, ctr: 0, color: '#cefa70', status: 'available',
    website: 'https://example.com/#spotlight',
    description: 'An available wide-format screen on the lower face of the flagship building in Central Square. Save the space or create a campaign draft to preview your brand and budget. This is illustrative inventory, with no reservation or charge.',
    promotion: 'Put your next big idea in the spotlight',
  },
  {
    id: 'moon', brand: 'Moon takeover', headline: 'Your brand. Beyond the skyline.',
    tagline: 'An out-of-this-world canvas for your next idea.', category: 'Creative', district: 'Skyline Heights',
    size: '500 × 500', width: 500, height: 500, dailyPrice: 45,
    impressions: 92400, ctr: 0, color: '#e7d6ff', status: 'available',
    website: 'https://example.com/#moon',
    description: 'An available moon-inspired placement above Skyline Heights. Save the space or create a campaign draft to explore a lunar takeover. Traffic figures are illustrative demo estimates; creating a draft does not reserve inventory or trigger a charge.',
    promotion: 'Take your next idea beyond the skyline',
  },
  {
    id: 'sky-signal', brand: 'Sky signal', headline: 'Give the city a sign.',
    tagline: 'Send your next big idea into the night.', category: 'Creative', district: 'Central Square',
    size: '500 × 500', width: 500, height: 500, dailyPrice: 81,
    impressions: 116800, ctr: 0, color: '#8ff5ff', status: 'available',
    website: 'https://example.com/#sky-signal',
    description: 'An available holographic-style sky display above Central Square. Save this city-wide signal or create a campaign draft to preview your message and budget. Traffic figures are illustrative demo estimates; creating a draft does not reserve inventory or trigger a charge.',
    promotion: 'Let your brand light up the night',
  },
  {
    id: 'rooftop', brand: 'Rooftop spotlight', headline: 'A new angle on attention.',
    tagline: 'Put your next launch above the everyday.', category: 'AI & Tech', district: 'Neon District',
    size: '250 × 1000', width: 250, height: 1000, dailyPrice: 54,
    impressions: 87300, ctr: 0, color: '#f4e68c', status: 'available',
    website: 'https://example.com/#rooftop',
    description: 'An available tall rooftop placement in Neon District, built for a launch with an elevated point of view. Save the space or create a campaign draft to explore the portrait canvas. Traffic figures are illustrative demo estimates; creating a draft does not reserve inventory or trigger a charge.',
    promotion: 'Give your next launch a higher profile',
  },
];

export const billboards = BILLBOARDS;

const DISTRICT_FACTORS: Record<District, number> = {
  'Central Square': 1.8,
  'Neon District': 1.2,
  'Skyline Heights': 1,
};
const cents = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;
const dimensionIsValid = (value: number) => Number.isInteger(value) && value >= 100 && value <= 2000;
const durationIsValid = (value: number) => Number.isInteger(value) && value >= 1 && value <= 365;
const districtIsValid = (value: string): value is District => DISTRICTS.includes(value as District);

/** Area-based indicative pricing. Demand is bounded to prevent runaway estimates. */
export function quotePlacement(width: number, height: number, days: number, district: string, multiplier = 1) {
  if (!dimensionIsValid(width) || !dimensionIsValid(height)) {
    throw new RangeError('Width and height must be whole pixels between 100 and 2000.');
  }
  if (!durationIsValid(days)) throw new RangeError('Duration must be a whole number of days between 1 and 365.');
  if (!districtIsValid(district)) throw new RangeError('Choose a valid district.');
  if (!Number.isFinite(multiplier) || multiplier <= 0) throw new RangeError('Demand must be a positive finite number.');
  const pixels = width * height;
  const demand = Math.min(3, Math.max(0.5, multiplier));
  const daily = cents(pixels * 0.00018 * DISTRICT_FACTORS[district] * demand);
  return { daily, total: cents(daily * days), pixels };
}

/** Minimum next bid: at least $1 or 5% above the current amount, rounded up to a cent. */
export function minimumBid(current: number): number {
  if (!Number.isFinite(current) || current < 0 || current > 1_000_000_000) {
    throw new RangeError('Current bid must be between $0 and $1,000,000,000.');
  }
  return Math.ceil((current + Math.max(1, current * 0.05)) * 100 - 1e-8) / 100;
}

export type CampaignInput = {
  name: string;
  url: string;
  width: number;
  height: number;
  days: number;
  district: District;
  plan?: 'one-time' | 'monthly' | 'annual';
  headline?: string;
};

export type Campaign = CampaignInput & {
  id: string;
  createdAt: string;
  status: 'draft';
  dailyPrice: number;
  total: number;
  pixels: number;
  billboardId?: string;
};

export function validateCampaign(input: CampaignInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (typeof input.name !== 'string' || input.name.trim().length < 2 || input.name.trim().length > 80) {
    errors.name = 'Enter a campaign name between 2 and 80 characters.';
  }
  try {
    const url = new URL(input.url);
    if (url.protocol !== 'https:' || !url.hostname.includes('.') || url.username || url.password) throw new Error();
  } catch {
    errors.url = 'Enter a complete HTTPS website URL, such as https://example.com.';
  }
  if (!dimensionIsValid(input.width)) errors.width = 'Choose a whole width from 100 to 2000 pixels.';
  if (!dimensionIsValid(input.height)) errors.height = 'Choose a whole height from 100 to 2000 pixels.';
  if (!durationIsValid(input.days)) errors.days = 'Choose a whole duration from 1 to 365 days.';
  if (!districtIsValid(input.district)) errors.district = 'Choose a district from the list.';
  if (input.plan && !['one-time', 'monthly', 'annual'].includes(input.plan)) errors.plan = 'Choose a valid placement plan.';
  if (input.headline && input.headline.length > 140) errors.headline = 'Keep your headline under 141 characters.';
  return errors;
}

/** Draft creation never makes a reservation or triggers a charge. */
export function createCampaign(input: CampaignInput, billboard?: Billboard): Campaign {
  const errors = validateCampaign(input);
  if (Object.keys(errors).length) throw new Error(Object.values(errors).join(' '));
  const quote = quotePlacement(input.width, input.height, input.days, input.district);
  return {
    ...input,
    name: input.name.trim(),
    url: new URL(input.url).href,
    id: globalThis.crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'draft',
    dailyPrice: quote.daily,
    total: quote.total,
    pixels: quote.pixels,
    ...(billboard ? { billboardId: billboard.id } : {}),
  };
}

export const money = (amount: number) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  maximumFractionDigits: 2,
}).format(amount);

export const formatCount = (amount: number) => new Intl.NumberFormat('en-US', {
  notation: 'compact', maximumFractionDigits: 1,
}).format(amount);
