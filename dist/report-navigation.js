(()=>{
 const toc=document.querySelector('.report-toc'),toggle=document.querySelector('.toc-toggle'),nav=document.querySelector('#report-toc-links');
 if(!toc||!toggle||!nav)return;
 const wide=matchMedia('(min-width: 1100px)'),links=[...nav.querySelectorAll('a')],sections=links.map(a=>document.querySelector(a.hash)).filter(Boolean);
 let preferred=true;
 function setOpen(open,remember=false){toggle.setAttribute('aria-expanded',String(open));nav.hidden=!open;document.body.dataset.tocOpen=String(open);if(remember)preferred=open;}
 toggle.addEventListener('click',()=>setOpen(nav.hidden,true));
 document.addEventListener('click',e=>{if(!nav.hidden&&!wide.matches&&!toc.contains(e.target)&&!toggle.contains(e.target))setOpen(false);});
 nav.addEventListener('click',e=>{if(e.target.closest('a')&&!wide.matches)setOpen(false);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden&&!document.querySelector('dialog[open]')){setOpen(false,true);toggle.focus();}});
 wide.addEventListener('change',()=>setOpen(preferred));
 let queued=false;
 function markCurrent(){queued=false;const threshold=document.querySelector('.header').getBoundingClientRect().bottom+90;let active=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<=threshold)active=section;else break;}for(const link of [...links,...document.querySelectorAll('.header nav a')]){if(link.hash==='#'+active.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
 window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(markCurrent);}},{passive:true});
 window.addEventListener('resize',markCurrent);window.addEventListener('hashchange',markCurrent);
 setOpen(preferred);markCurrent();
})();
