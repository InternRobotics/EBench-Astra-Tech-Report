import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const nodes=new Map();
function node(selector){
 if(!nodes.has(selector))nodes.set(selector,{innerHTML:'',textContent:'',value:selector==='#demo-search'?'':'all',listeners:{},addEventListener(event,handler){this.listeners[event]=handler;},querySelectorAll(){return [];}});
 return nodes.get(selector);
}
const tasks=JSON.parse(fs.readFileSync('dist/data/tasks.json','utf8'));
const demos=JSON.parse(fs.readFileSync('dist/data/demo-videos.json','utf8'));
const context=vm.createContext({
 document:{addEventListener(){},querySelector:node,querySelectorAll(){return [];}},
 $:node,tasks,demos,title:value=>value.replaceAll('_',' '),pct:value=>Number(value)*100,
 video:(path,label)=>`<video src="${path}" aria-label="${label}"></video>`,initVideos(){}
});
for(const file of ['charts.js','research.js','narrative.js'])vm.runInContext(fs.readFileSync(`dist/${file}`,'utf8'),context,{filename:file});
// Opening copy must be present even before benchmark initialization runs.
const intro=node('[data-narrative="introduction"]').innerHTML;
assert.equal((intro.match(/<p>/g)||[]).length,3);
assert.ok(intro.includes('Recent reports have begun to explore this frontier.'));
assert.ok(intro.includes('https://robodojo-benchmark.com/report/gpt-6-astra-eval'));
// Exercise the library's real startup and filter handlers, including shared helpers.
vm.runInContext('initDemoLibrary()',context);
assert.ok(node('#demo-group').innerHTML.includes('Tabletop (7)'));
assert.equal((node('#library-grid').innerHTML.match(/class="library-item"/g)||[]).length,6);
assert.ok(node('#library-count').textContent.startsWith('26 tasks'));
node('#demo-group').value='mobility:Fixed';node('#demo-group').listeners.change();
assert.ok(node('#library-count').textContent.startsWith('7 tasks'));
node('#demo-next').listeners.click();
assert.equal(node('#demo-page').textContent,'2 / 2');
assert.equal((node('#library-grid').innerHTML.match(/class="library-item"/g)||[]).length,1);
console.log('Startup checks: all three introduction paragraphs, library rendering, subgroup filtering and pagination pass.');
