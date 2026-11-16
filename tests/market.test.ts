import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BILLBOARDS, createCampaign, minimumBid, quotePlacement, validateCampaign,
  type CampaignInput,
} from '../lib/market.ts';

const valid: CampaignInput = {
  name: 'Launch campaign', url: 'https://example.com/launch',
  width: 500, height: 500, days: 7, district: 'Central Square',
};

test('quotes charge by area, district and duration without floating point currency artifacts', () => {
  assert.deepEqual(quotePlacement(100, 100, 7, 'Skyline Heights'), { daily: 1.8, total: 12.6, pixels: 10000 });
  assert.equal(quotePlacement(200, 100, 1, 'Skyline Heights').daily, 3.6);
  assert.equal(quotePlacement(500, 500, 7, 'Central Square').total, 567);
  assert.equal(quotePlacement(500, 500, 1, 'Neon District').daily, 54);
});

test('demand is bounded while invalid parameters are rejected', () => {
  assert.equal(quotePlacement(500, 500, 1, 'Central Square', 100).daily, 243);
  assert.equal(quotePlacement(500, 500, 1, 'Central Square', 0.01).daily, 40.5);
  for (const width of [0, 99, 2001, 100.5, NaN, Infinity]) {
    assert.throws(() => quotePlacement(width, 100, 1, 'Central Square'), RangeError);
  }
  for (const days of [0, 366, 1.5, NaN]) {
    assert.throws(() => quotePlacement(100, 100, days, 'Central Square'), RangeError);
  }
  assert.throws(() => quotePlacement(100, 100, 1, 'Missing'), RangeError);
  assert.throws(() => quotePlacement(100, 100, 1, 'Central Square', -1), RangeError);
});

test('campaign validation rejects unsafe URLs and malformed entries', () => {
  assert.deepEqual(validateCampaign(valid), {});
  for (const url of ['javascript:alert(1)', 'http://example.com', 'example.com', 'https://user:secret@example.com', 'https://localhost']) {
    assert.ok(validateCampaign({ ...valid, url }).url, url);
  }
  const errors = validateCampaign({ ...valid, name: ' ', width: 50, height: 2001, days: 0 });
  assert.deepEqual(Object.keys(errors).sort(), ['days', 'height', 'name', 'width']);
});

test('next bids always clear the current bid by the required increment', () => {
  assert.equal(minimumBid(0), 1);
  assert.equal(minimumBid(10), 11);
  assert.equal(minimumBid(324), 340.2);
  assert.equal(minimumBid(324.01), 340.22);
  for (const bid of [NaN, Infinity, -1, 1_000_000_001]) assert.throws(() => minimumBid(bid), RangeError);
});

test('drafts are validated, normalized, quoted and unique without purchasing inventory', () => {
  const draft = createCampaign({ ...valid, name: '  Product launch  ' }, BILLBOARDS[0]);
  assert.equal(draft.name, 'Product launch');
  assert.equal(draft.status, 'draft');
  assert.equal(draft.total, 567);
  assert.equal(draft.billboardId, 'nova');
  assert.notEqual(draft.id, createCampaign(valid).id);
  assert.throws(() => createCampaign({ ...valid, url: 'invalid' }));
});

test('demo inventory has unique IDs, sensible dimensions and HTTPS sample destinations', () => {
  assert.equal(BILLBOARDS.length, 8);
  assert.equal(new Set(BILLBOARDS.map(item => item.id)).size, BILLBOARDS.length);
  for (const item of BILLBOARDS) {
    assert.equal(new URL(item.website).protocol, 'https:');
    assert.ok(item.width >= 100 && item.height >= 100);
    assert.ok(item.dailyPrice > 0);
  }
});
