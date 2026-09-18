// A contained digital-rain background; static when reduced motion is requested.
(()=>{
 const quote=document.querySelector('.opening-quote'),canvas=quote?.querySelector('.matrix-rain'),toggle=quote?.querySelector('.matrix-motion');
 if(!canvas||!toggle)return;
 const ctx=canvas.getContext('2d');if(!ctx){toggle.hidden=true;return;}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),glyphs='アイウエオカキクケコサシスセソタチツテトナニヌネノ012345789';
 let enabled=!reduced.matches,visible=false,width=0,height=0,raf=0,last=0,time=0;
 function draw(){
  ctx.clearRect(0,0,width,height);ctx.font='14px ui-monospace, monospace';ctx.textAlign='center';
  for(let col=0;col<Math.ceil(width/19);col++){
   const speed=11+(col*17%23),offset=(time*speed+col*41)%(height+180)-90;
   for(let row=0;row<13;row++){
    const y=offset-row*17;if(y<0||y>height+14)continue;
    const index=(col*13+row*7+Math.floor(time*.6))%glyphs.length;
    ctx.fillStyle=row===0?'rgba(186,255,209,.65)':`rgba(61,199,121,${.42*(1-row/13)})`;
    ctx.fillText(glyphs[index],col*19+8,y);
   }
  }
 }
 function frame(now){raf=0;if(!enabled||!visible||document.hidden)return;if(now-last>=80){time+=Math.min((now-last)/1000,.16);last=now;draw();}raf=requestAnimationFrame(frame);}
 function sync(){cancelAnimationFrame(raf);raf=0;toggle.setAttribute('aria-pressed',String(enabled));toggle.setAttribute('aria-label',enabled?'Pause Matrix background animation':'Play Matrix background animation');toggle.textContent=enabled?'Pause background':'Play background';canvas.dataset.motion=enabled&&visible&&!document.hidden?'running':'paused';if(enabled&&visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame);}else draw();}
 function resize(){const box=quote.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);width=box.width;height=box.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
 toggle.addEventListener('click',()=>{enabled=!enabled;sync();});
 reduced.addEventListener('change',()=>{enabled=!reduced.matches;sync();});document.addEventListener('visibilitychange',sync);
 new ResizeObserver(resize).observe(quote);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(quote);
 resize();sync();
})();
