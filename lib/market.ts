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
