window.CutemojiMonetization = (() => {
 const local=['localhost','127.0.0.1','[::1]'].includes(location.hostname);
 const preview=local&&new URLSearchParams(location.search).get('previewAds')==='1';
 const slots=[];let observer,scriptPromise,scriptFailed=false;
 function supportURL(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}}
 function allowed(){const a=window.CutemojiConfig?.ads;return !local&&location.protocol==='https:'&&a?.enabled===true&&a?.consentReady===true&&a.hosts?.includes(location.hostname)}
 function near(host){const r=host.getBoundingClientRect(),v=document.querySelector('.results').getBoundingClientRect();return !host.hidden&&host.clientWidth>0&&r.top<v.bottom+160&&r.bottom>v.top}
 function loadScript(){
  if(scriptPromise)return scriptPromise;
  scriptPromise=new Promise(resolve=>{const script=document.createElement('script');script.async=true;script.crossOrigin='anonymous';script.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(window.CutemojiConfig.ads.client);script.onload=()=>resolve(true);script.onerror=()=>{scriptFailed=true;slots.forEach(s=>s.host.hidden=true);resolve(false)};document.head.append(script)});
  return scriptPromise;
 }
 async function request(slot){
  if(!allowed()||scriptFailed||slot.requested||slot.pending||slot.failed||!near(slot.host)||document.querySelector('dialog[open]'))return;
  slot.pending=true;const loaded=await loadScript();slot.pending=false;
  if(!loaded||!near(slot.host)||document.querySelector('dialog[open]'))return;
  slot.requested=true;observer.unobserve(slot.host);
  const a=window.CutemojiConfig.ads,ad=document.createElement('ins');ad.className='adsbygoogle';ad.style.display='block';ad.dataset.adFormat='fluid';ad.dataset.adLayoutKey=a.layoutKey;ad.dataset.adClient=a.client;ad.dataset.adSlot=a.slot;slot.host.append(ad);
  const status=new MutationObserver(()=>{if(ad.dataset.adStatus==='unfilled'){slot.failed=true;slot.host.hidden=true;status.disconnect()}});status.observe(ad,{attributes:true,attributeFilter:['data-ad-status']});
  try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch{slot.failed=true;slot.host.hidden=true;status.disconnect()}
 }
 function init(){
  const link=document.querySelector('#support-link'),c=window.CutemojiConfig;
  if(supportURL(c?.supportUrl)||supportURL(c?.kakaoUrl)||supportURL(c?.tossUrl)||c?.bank?.number){link.href='./support.html';link.removeAttribute('target');link.hidden=false}
  observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){const slot=slots.find(s=>s.host===e.target);if(slot)request(slot)}},{root:document.querySelector('.results'),rootMargin:'160px'});
  new MutationObserver(()=>{if(!document.querySelector('dialog[open]'))slots.forEach(request)}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
 }
 // Keep existing ad DOM in place when favorites, categories or pagination rerender cards.
 function prepare(count){
  const needed=(allowed()||preview)?Math.floor(count/15):0,grid=document.querySelector('#grid');
  while(slots.length<needed){const host=document.createElement('aside');host.className='infeed-ad';host.setAttribute('aria-label','Advertisement');const slot={host,requested:false,pending:false,failed:false};slots.push(slot);grid.append(host);
   if(preview){host.classList.add('infeed-preview');const label=document.createElement('small'),title=document.createElement('strong'),desc=document.createElement('p');label.textContent=I18n.t('ads.preview');title.textContent='cutemoji';desc.textContent=I18n.t('ads.description');host.append(label,title,desc)}else observer.observe(host);
  }
  slots.forEach((s,i)=>s.host.hidden=i>=needed||s.failed||scriptFailed);
 }
 function appendCard(card,index){document.querySelector('#grid').insertBefore(card,slots[Math.floor(index/15)]?.host||null)}
 function render(){if(!preview)slots.forEach(request)}
 return {init,prepare,appendCard,render,supportURL};
})();
