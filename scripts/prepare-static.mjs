import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {createHash} from 'node:crypto';

// Prepare the existing static pages. Never redraw the mark or rewrite pricing/data.
const root=process.cwd(),sourceDir=join(root,'public'),outputDir=join(root,'dist');
async function exists(p){try{await access(p);return true}catch{return false}}
const logoFile=join(root,'assets','crest-logo.jpg');
const logo=await readFile(logoFile);
if(logo.length<4||logo[0]!==255||logo[1]!==216||logo[2]!==255)throw Error('assets/crest-logo.jpg is not the expected JPEG source');
await mkdir(join(outputDir,'assets'),{recursive:true});
const outputLogo=join(outputDir,'assets','crest-logo.jpg');
await writeFile(outputLogo,logo);
const digest=b=>createHash('sha256').update(b).digest('hex');
if(digest(await readFile(outputLogo))!==digest(logo))throw Error('Logo byte-preservation check failed');
const landing=(await exists(join(root,'index.html')))?join(root,'index.html'):join(sourceDir,'index.html');
const wholesale=(await exists(join(sourceDir,'wholesale.html')))?join(sourceDir,'wholesale.html'):(await exists(join(sourceDir,'wholesale')))?join(sourceDir,'wholesale'):join(root,'wholesale.html');
const sources=[[landing,join(outputDir,'index.html')],[wholesale,join(outputDir,'wholesale.html')]];
const scripts=text=>[...text.matchAll(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi)].map(x=>x[0]);
const prepared=[];
for(const [source,target] of sources){
 const original=await readFile(source,'utf8');let marks=0;
 const result=original.replace(/<img\b[^>]*>/gi,tag=>{
  const cls=tag.match(/\bclass\s*=\s*(["'])(.*?)\1/i);
  if(!cls||!cls[2].split(/\s+/).includes('logo'))return tag;
  if(!/\bsrc\s*=/.test(tag))throw Error('Logo image has no source');
  marks++;return tag.replace(/\bsrc\s*=\s*(["'])[^"']*\1/i,'src="assets/crest-logo.jpg"');
 });
 if(marks===0)throw Error('No existing .logo image found in '+source);
 if(JSON.stringify(scripts(original))!==JSON.stringify(scripts(result)))throw Error('Script/DATA content changed: '+source);
 prepared.push({source,target,result,marks});
}
for(const p of prepared){await mkdir(dirname(p.target),{recursive:true});await writeFile(p.target,p.result);}
console.log(JSON.stringify({logoSource:'assets/crest-logo.jpg',servedLogo:'dist/assets/crest-logo.jpg',logoSHA256:digest(logo),pages:prepared.map(p=>({file:p.target.replace(root+'/',''),logoReferences:p.marks})),scriptsAndDataPreserved:true,pricingTextPreserved:true}));
