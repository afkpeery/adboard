import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const basePath=(process.env.NEXT_PUBLIC_BASE_PATH||'').replace(/\/$/,'');
const output=resolve('out');
const html=readFileSync(resolve(output,'index.html'),'utf8');
const buildings=(html.match(/class="prism-structure"/g)||[]).length;
assert.equal(buildings,13,'The published homepage must contain the complete skyline.');
assert.ok(!html.includes('Jekyll'),'Publish the application export, not the README.');
const assetPaths=[];
for(const tag of html.matchAll(/<(?:link|script)\b[^>]*>/g)){
  const value=tag[0].match(/(?:src|href)="([^"]+)"/)?.[1];
  if(value?.includes('/_next/'))assetPaths.push(value);
}
assert.ok(assetPaths.length>0,'The homepage must load the application CSS and JavaScript.');
for(const asset of assetPaths){
  assert.ok(asset.startsWith(`${basePath}/_next/`),`Asset does not use the configured host path: ${asset}`);
  const relative=decodeURIComponent(asset.slice(basePath.length).split('?')[0]).replace(/^\//,'');
  assert.ok(existsSync(resolve(output,relative)),`Missing exported asset: ${relative}`);
}
for(const route of ['ai-tech','lifestyle','gaming','finance','creative']){
  const guide=readFileSync(resolve(output,'industries',route,'index.html'),'utf8');
  assert.ok(guide.includes(`href="${basePath}/"`),`Guide ${route} must link back to the city on this host.`);
}
assert.ok(html.includes(`href="${basePath}/industries/ai-tech/"`),'Industry navigation must retain the host path.');
console.log(`Verified ${buildings} buildings, ${assetPaths.length} bundled assets, and industry navigation at ${basePath||'/'}.`);
