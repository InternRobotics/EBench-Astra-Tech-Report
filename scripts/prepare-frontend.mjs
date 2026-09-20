import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const destination=path.resolve('.generated/public');
fs.mkdirSync(destination,{recursive:true});
// Copy only versioned research assets; never publish local PDFs or outputs.
const files=execFileSync('git',['ls-files','-z','dist/data','dist/media','dist/vendor'],{encoding:'utf8'}).split('\0').filter(Boolean);
for(const file of files){
 if(file.endsWith('.pdf'))continue;
 const target=path.join(destination,path.relative('dist',file));
 fs.mkdirSync(path.dirname(target),{recursive:true});
 const stat=fs.statSync(file);
 if(fs.existsSync(target)&&fs.statSync(target).mtimeMs>=stat.mtimeMs&&fs.statSync(target).size===stat.size)continue;
 fs.copyFileSync(file,target);
}
const order=JSON.parse(fs.readFileSync('src/scripts/order.json','utf8'));
const code=order.map(file=>`/* ${file} */\n${fs.readFileSync('src/scripts/'+file,'utf8')}`).join('\n;\n');
fs.writeFileSync('.generated/runtime.js',`import katex from 'katex';\n${code}`);
const previousRuntime=path.join(destination,'report-runtime.js');
if(fs.existsSync(previousRuntime))fs.unlinkSync(previousRuntime);
fs.writeFileSync(path.join(destination,'.nojekyll'),'');
console.log(`Prepared ${files.length} research assets and ${order.length} interaction modules.`);
