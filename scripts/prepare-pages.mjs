import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

// Publish tracked website assets only. The report PDF is not ready for release.
const files=execFileSync('git',['ls-files','-z','dist'],{encoding:'utf8'})
  .split('\0').filter(file=>file&&!file.toLowerCase().endsWith('.pdf'));
const destination=path.resolve('_site');
if(fs.existsSync(destination))throw Error('_site must be absent before packaging.');
let bytes=0;
for(const file of files){
  const stat=fs.lstatSync(file);
  if(!stat.isFile())throw Error(`Not a regular file: ${file}`);
  const fd=fs.openSync(file,'r'),header=Buffer.alloc(128);
  fs.readSync(fd,header,0,header.length,0);fs.closeSync(fd);
  if(header.toString().startsWith('version https://git-lfs.github.com/spec/v1'))
    throw Error(`Git LFS object is missing: ${file}`);
  const target=path.join(destination,path.relative('dist',file));
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.copyFileSync(file,target);bytes+=stat.size;
}
if(!fs.existsSync(path.join(destination,'index.html')))throw Error('Missing index.html');
if(bytes>=1024**3)throw Error('Published website exceeds the GitHub Pages 1 GiB limit.');
// Use one deployment version for every script and stylesheet.
const release=process.env.GITHUB_RUN_ID?`pages-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT||1}`:`preview-${Date.now()}`;
const indexPath=path.join(destination,'index.html');
const html=fs.readFileSync(indexPath,'utf8').replace(/((?:src|href)=")([^"]+\.(?:css|js))(?:\?[^"]*)?(")/g,(match,prefix,asset,suffix)=>/^(?:https?:|data:|\/\/)/.test(asset)?match:`${prefix}${asset}?v=${release}${suffix}`);
fs.writeFileSync(indexPath,html);
fs.writeFileSync(path.join(destination,'.nojekyll'),'');
console.log(`Prepared ${files.length} files (${(bytes/1024**2).toFixed(1)} MiB), excluding unpublished PDFs.`);
