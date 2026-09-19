// Whole-episode public actions, synchronized by recorded execution chunks.
(() => {
 const root=document.querySelector('#episode-viewer');
 if(!root)return;
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const time=value=>`${Math.floor(value/60)}:${String(Math.floor(value%60)).padStart(2,'0')}`;
 let entries=[],episode,index=0,request=0,segmentEnd=null,visibilityObserver,inView=false,userPaused=false;
 const get=async path=>{const r=await fetch(path);if(!r.ok)throw Error('Episode data unavailable');return r.json();};
 const actionName=call=>call.arguments.reason || `${call.arguments.opening===0?'Close':call.arguments.opening===1?'Open':'Adjust'} the ${call.arguments.side} gripper`;
 async function load(id){
  const token=++request;visibilityObserver?.disconnect();inView=false;root.querySelector('video')?.pause();
  root.innerHTML='<p role="status">Loading the episode…</p>';
  try{
   const data=await get(`data/episodes/${id}.json`);if(token!==request)return;
   episode=data;index=0;segmentEnd=null;userPaused=false;render();
  }catch{if(token===request)root.innerHTML='<p role="alert">The episode could not be loaded.</p><button data-episode-retry>Retry</button>';}
 }
 function render(){
  root.innerHTML=`<div class="episode-picker" aria-label="Choose an episode">${entries.map(e=>`<button data-episode="${e.id}" aria-pressed="${e.id===episode.id}">${escape(e.title)}</button>`).join('')}</div>
   <div class="episode-heading"><div><h4>${escape(episode.instruction)}</h4><p>${escape(episode.description)}</p></div><span class="episode-outcome">${episode.result.sr?'Successful':'Incomplete'}<small>Final score ${episode.result.score.toFixed(1)}</small></span></div>
   <div class="episode-bookmarks" aria-label="Key moments">${episode.bookmarks.map(b=>`<button data-call="${b.call-1}">${escape(b.label)}</button>`).join('')}</div>
   <div class="episode-stage"><div class="episode-screen"><div class="episode-cameras" aria-label="Video camera"><button data-episode-camera="0" aria-pressed="true">Overview</button><button data-episode-camera="1" aria-pressed="false">Left wrist</button><button data-episode-camera="2" aria-pressed="false">Right wrist</button><button data-episode-camera="all" aria-pressed="false">All views</button></div><div class="episode-viewport"><video data-camera-ready="true" data-custom-controls="true" preload="metadata" muted loop playsinline src="${escape(episode.video)}" aria-label="Recorded execution: ${escape(episode.instruction)}"></video></div><div class="episode-playback"><button data-play aria-label="Play episode">Play</button><input data-seek type="range" min="0" max="${episode.duration}" step="0.01" value="0" aria-label="Video position"><output data-time>0:00 / ${time(episode.duration)}</output><label>Speed<select data-speed aria-label="Playback speed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option></select></label></div><p class="episode-caption" role="status"></p></div><div class="episode-interaction"><div class="episode-step-nav"><button data-prev aria-label="Previous interaction">←</button><span data-counter></span><button data-next aria-label="Next interaction">→</button></div><div data-interaction></div></div></div>
   <details class="episode-log"><summary>Full interaction timeline · ${episode.calls.length} calls</summary><ol>${episode.calls.map((c,i)=>`<li><button data-call="${i}"><time>${time(c.video_start)}</time><span>${escape(actionName(c))}</span></button></li>`).join('')}</ol></details>
   <div class="episode-source-links"><button class="appendix-link" data-icl-package="${escape(episode.task)}">Historical ICL input ↗</button><a href="data/episodes/${episode.id}.json" download>Download public interaction log</a></div>
   <details class="episode-log"><summary>Initial task prompt</summary><div class="episode-prompt">${episode.initial_prompt.split('\n').filter(Boolean).map(p=>`<p>${escape(p)}</p>`).join('')}</div></details>
`;
  const video=root.querySelector('video');
  video.muted=true;video.defaultMuted=true;video.loop=true;
  video.addEventListener('timeupdate',()=>{
   if(segmentEnd!==null&&video.currentTime>=segmentEnd){userPaused=true;video.pause();video.currentTime=segmentEnd;segmentEnd=null;}
   root.querySelector('[data-seek]').value=video.currentTime;
   root.querySelector('[data-time]').textContent=`${time(video.currentTime)} / ${time(episode.duration)}`;
   const next=episode.calls.findIndex(c=>video.currentTime>=c.video_start&&video.currentTime<c.video_end);
   if(next>=0&&next!==index){index=next;renderCall();}
  });
  for(const event of ['play','pause','ended'])video.addEventListener(event,()=>{const b=root.querySelector('[data-play]');b.textContent=video.paused?'Play':'Pause';b.setAttribute('aria-label',video.paused?'Play episode':'Pause episode');});
  video.addEventListener('error',()=>{root.querySelector('.episode-caption').textContent='Video unavailable. The complete interaction log remains available below.';});
  renderCall();
  visibilityObserver=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting&&entry.intersectionRatio>=0.25;syncPlayback();},{threshold:[0,0.25]});
  visibilityObserver.observe(root.querySelector('.episode-viewport'));
  video.addEventListener('canplay',syncPlayback);
 }
 function renderCall(){
  const c=episode.calls[index],reason=c.arguments.reason,result=c.response.episode_results[0];
  root.querySelector('[data-counter]').textContent=`Interaction ${index+1} / ${episode.calls.length}`;
  root.querySelector('[data-prev]').disabled=index===0;root.querySelector('[data-next]').disabled=index===episode.calls.length-1;
  root.querySelector('[data-interaction]').innerHTML=`<p class="episode-speaker">GPT-6-Astra <span>${escape(c.tool)}</span></p>${reason?`<blockquote>${escape(reason)}</blockquote>`:`<p class="episode-no-reason">${escape(actionName(c))}</p>`}<div class="episode-return"><strong>Tool response</strong><p>${c.response.success?'Command executed.':'Command reported a failure.'} Steps ${c.start_step}–${c.end_step}.</p>${result?`<p class="episode-terminal"><strong>Evaluator: ${result.sr?'task successful':'task incomplete'} · score ${result.score.toFixed(1)}</strong></p>`:''}</div><button class="episode-play-call" data-play-call>Play this action</button><details class="episode-raw"><summary>Exact tool arguments & response</summary><pre>${escape(JSON.stringify({tool:c.tool,arguments:c.arguments,response_summary:c.response},null,2))}</pre></details>`;
  root.querySelectorAll('[data-call]').forEach(b=>{const active=Number(b.dataset.call)===index;b.setAttribute('aria-current',String(active));});
 }
 function select(i){
  const video=root.querySelector('video');video.pause();segmentEnd=null;
  index=Math.max(0,Math.min(episode.calls.length-1,i));video.currentTime=episode.calls[index].video_start;renderCall();
  syncPlayback();
 }
 function syncPlayback(){const video=root.querySelector('video');if(!video)return;if(inView&&!document.hidden&&!userPaused)play(video);else video.pause();}
 async function play(video){try{await video.play();}catch(error){if(error.name!=='AbortError'&&root.querySelector('video')===video)root.querySelector('.episode-caption').textContent='Press Play to start the recorded video.';}}
 document.addEventListener('visibilitychange',syncPlayback);
 root.addEventListener('toggle',e=>{if(e.target.tagName==='DETAILS'&&e.target.open){userPaused=true;root.querySelector('video')?.pause();}},true);
 root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.hasAttribute('data-episode-retry')){init();return;}
  if(b.dataset.episode){load(b.dataset.episode);return;}
  if(b.hasAttribute('data-call')){select(Number(b.dataset.call));return;}
  if(b.hasAttribute('data-prev')){select(index-1);return;}
  if(b.hasAttribute('data-next')){select(index+1);return;}
  const video=root.querySelector('video');
  if(b.hasAttribute('data-play')){segmentEnd=null;userPaused=!video.paused;video.paused?play(video):video.pause();}
  if(b.hasAttribute('data-play-call')){const c=episode.calls[index];userPaused=false;video.currentTime=c.video_start;segmentEnd=c.video_end-0.015;play(video);}
  if(b.hasAttribute('data-icl-package')){userPaused=true;video.pause();}
  if(b.hasAttribute('data-episode-camera')){
   const all=b.dataset.episodeCamera==='all';root.querySelector('.episode-viewport').classList.toggle('all-views',all);
   video.style.transform=all?'none':`translateX(-${Number(b.dataset.episodeCamera)*100/3}%)`;
   root.querySelectorAll('[data-episode-camera]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  }
 });
 root.addEventListener('input',e=>{if(e.target.hasAttribute('data-seek')){segmentEnd=null;root.querySelector('video').currentTime=Number(e.target.value);}});
 root.addEventListener('change',e=>{if(e.target.hasAttribute('data-speed'))root.querySelector('video').playbackRate=Number(e.target.value);});
 async function init(){try{entries=await get('data/episodes/index.json');await load(entries[0].id);}catch{root.innerHTML='<p>Episode data unavailable.</p><button data-episode-retry>Retry</button>';}}
 init();
})();
