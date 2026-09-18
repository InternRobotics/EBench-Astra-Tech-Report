import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const packages=JSON.parse(readFileSync('dist/data/icl-packages.json','utf8'));
const tasks=JSON.parse(readFileSync('dist/data/tasks.json','utf8'));
assert.equal(packages.length,26);
assert.equal(new Set(packages.map(p=>p.task)).size,26);
let images=0,texts=0;
for(const pkg of packages){
 assert(tasks.some(t=>(t.task||t.id)===pkg.task),`Unknown task ${pkg.task}`);
 assert(pkg.inputs[0].text.startsWith('HISTORICAL DEMONSTRATION'));
 assert(pkg.inputs.at(-1).text.startsWith('END OF HISTORICAL DEMONSTRATION'));
 for(const input of pkg.inputs){
  if(input.type==='text'){assert.equal(typeof input.text,'string');texts++;continue;}
  assert.equal(input.type,'localImage');
  assert(input.path.startsWith(`media/icl/${pkg.task}/`)&&!input.path.includes('..'));
  const path='dist/'+input.path;assert(existsSync(path),path);
  assert.equal(createHash('sha256').update(readFileSync(path)).digest('hex'),input.sha256,path);
  images++;
 }
}
assert.equal(images,365);assert.equal(texts,417);
console.log(`Validated ${packages.length} complete ICL packages: ${texts} text blocks and ${images} source-matched images.`);
