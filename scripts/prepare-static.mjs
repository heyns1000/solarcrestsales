import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {createHash} from 'node:crypto';

// Prepare the existing static pages. Never redraw the mark or rewrite pricing/data.
const root=process.cwd(),sourceDir=join(root,'public'),outputDir=join(root,'dist');
async function exists(p){try{await access(p);return true}catch{return false}}
// CI-DOC-001-A: transparent source-vector logo with its TM, no backing box (crest-logo.svg, SHA-256 49c73d70…).
// The earlier crest-logo.jpg (white box) stays in the repo as a source record but is no longer served.
const logoName='crest-logo.svg',logoFile=join(root,'assets',logoName);
const logo=await readFile(logoFile);
const LOGO_SHA='49c73d709d3b685213d36f1ba852c056c12ffcba7fbaa4f315350be091391de3';
if(!logo.toString('utf8',0,200).includes('<svg'))throw Error('assets/crest-logo.svg is not an SVG');
await mkdir(join(outputDir,'assets'),{recursive:true});
const outputLogo=join(outputDir,'assets',logoName);
await writeFile(outputLogo,logo);
const digest=b=>createHash('sha256').update(b).digest('hex');
if(digest(await readFile(outputLogo))!==digest(logo)||digest(logo)!==LOGO_SHA)throw Error('Logo byte-preservation check failed');
const landing=(await exists(join(root,'index.html')))?join(root,'index.html'):join(sourceDir,'index.html');
const wholesale=(await exists(join(sourceDir,'wholesale.html')))?join(sourceDir,'wholesale.html'):(await exists(join(sourceDir,'wholesale')))?join(sourceDir,'wholesale'):join(root,'wholesale.html');
const sources=[[landing,join(outputDir,'index.html')],[wholesale,join(outputDir,'wholesale.html')]];
if(await exists(join(root,'products.html')))sources.push([join(root,'products.html'),join(outputDir,'products.html')]);
// catalogue page images used by products.html are copied byte for byte
if(await exists(join(root,'assets','catalogue'))){const {readdir}=await import('node:fs/promises');await mkdir(join(outputDir,'assets','catalogue'),{recursive:true});for(const f of await readdir(join(root,'assets','catalogue')))await writeFile(join(outputDir,'assets','catalogue',f),await readFile(join(root,'assets','catalogue',f)));}
const scripts=text=>[...text.matchAll(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi)].map(x=>x[0]);
const prepared=[];
for(const [source,target] of sources){
 const original=await readFile(source,'utf8');let marks=0;
 const result=original.replace(/<img\b[^>]*>/gi,tag=>{
  const cls=tag.match(/\bclass\s*=\s*(["'])(.*?)\1/i);
  if(!cls||!cls[2].split(/\s+/).includes('logo'))return tag;
  if(!/\bsrc\s*=/.test(tag))throw Error('Logo image has no source');
  marks++;return tag.replace(/\bsrc\s*=\s*(["'])[^"']*\1/i,'src="assets/'+logoName+'"');
 });
 if(marks===0)throw Error('No existing .logo image found in '+source);
 if(JSON.stringify(scripts(original))!==JSON.stringify(scripts(result)))throw Error('Script/DATA content changed: '+source);
 prepared.push({source,target,result,marks});
}
for(const p of prepared){await mkdir(dirname(p.target),{recursive:true});await writeFile(p.target,p.result);}
console.log(JSON.stringify({logoSource:'assets/'+logoName,servedLogo:'dist/assets/'+logoName,logoSHA256:digest(logo),pages:prepared.map(p=>({file:p.target.replace(root+'/',''),logoReferences:p.marks})),scriptsAndDataPreserved:true,pricingTextPreserved:true}));
