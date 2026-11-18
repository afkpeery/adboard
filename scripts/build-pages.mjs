import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const basePath='/adboard';
const siteUrl='https://afkpeery.github.io/adboard';
const env={...process.env,NEXT_PUBLIC_BASE_PATH:basePath,NEXT_PUBLIC_SITE_URL:siteUrl};
execFileSync(process.execPath,['node_modules/next/dist/bin/next','build'],{stdio:'inherit',env});
execFileSync(process.execPath,['scripts/verify-export.mjs'],{stdio:'inherit',env});

// Pages currently serves main:/; publish only generated files at that path.
const manifestPath='.github-pages-files.json';
const previous=existsSync(manifestPath)?JSON.parse(readFileSync(manifestPath,'utf8')).files:[];
const files=readdirSync('out').sort();
const allowed=new Set(['_next','index.html','index.txt','404','404.html','industries','robots.txt','sitemap.xml']);
for(const name of [...previous,...files]){
  if(!allowed.has(name))throw new Error(`Unexpected Pages output path: ${name}`);
}
for(const name of previous)rmSync(resolve(name),{recursive:true,force:true});
for(const name of files){
  if(existsSync(resolve(name))&&!previous.includes(name))throw new Error(`Refusing to replace an unmanaged root path: ${name}`);
  cpSync(resolve('out',name),resolve(name),{recursive:true});
}
writeFileSync('.nojekyll','');
writeFileSync(manifestPath,JSON.stringify({basePath,siteUrl,files},null,2)+'\n');
console.log(`Prepared the application at the existing Pages source main:/ (${siteUrl}/).`);
