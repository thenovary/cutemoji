window.CutemojiMonetization = (() => {
 const local = ['localhost','127.0.0.1','[::1]'].includes(location.hostname);
 const preview = local && new URLSearchParams(location.search).get('previewAds') === '1';
 let eligible=false,started=false,failed=false,ready=false,requested=false,observer;
 function supportURL(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}}
 function init(){
  const link=document.querySelector('#support-link');const url=supportURL(window.CutemojiConfig?.supportUrl);
  if(url||supportURL(window.CutemojiConfig?.kakaoUrl)||supportURL(window.CutemojiConfig?.tossUrl)||window.CutemojiConfig?.bank?.number){link.href='./support.html';link.removeAttribute('target');link.hidden=false}
  const host=document.querySelector('#infeed-ad');
  observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))requestAd()},{root:document.querySelector('.results'),rootMargin:'160px'});
  observer.observe(host);
  new MutationObserver(()=>{if(!document.querySelector('dialog[open]'))requestIfVisible()}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
 }
 function allowed(){const a=window.CutemojiConfig?.ads;return !local&&location.protocol==='https:'&&a?.enabled===true&&a?.consentReady===true}
 function requestIfVisible(){const host=document.querySelector('#infeed-ad'),root=document.querySelector('.results');if(host.hidden)return;const r=host.getBoundingClientRect(),v=root.getBoundingClientRect();if(r.top<v.bottom+160&&r.bottom>v.top)requestAd()}
 function requestAd(){
  if(requested||failed||!eligible||!allowed()||document.querySelector('dialog[open]'))return;
  const host=document.querySelector('#infeed-ad');if(host.hidden||host.clientWidth===0)return;
  if(started){if(ready){requested=true;observer.disconnect();try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch{failed=true;host.hidden=true}}return;}
  started=true;
  const a=window.CutemojiConfig.ads,ad=document.createElement('ins');
  ad.className='adsbygoogle';ad.style.display='block';ad.dataset.adFormat='fluid';ad.dataset.adLayoutKey=a.layoutKey;ad.dataset.adClient=a.client;ad.dataset.adSlot=a.slot;host.append(ad);
  const status=new MutationObserver(()=>{if(ad.dataset.adStatus==='unfilled'){failed=true;host.hidden=true;status.disconnect()}});status.observe(ad,{attributes:true,attributeFilter:['data-ad-status']});
  const script=document.createElement('script');script.async=true;script.crossOrigin='anonymous';script.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(a.client);
  script.onload=()=>{ready=true;requestIfVisible()};
  script.onerror=()=>{failed=true;host.hidden=true;status.disconnect()};document.head.append(script);
 }
 function render(count){
  eligible=count>0;document.querySelector('#ad-preview').hidden=!(preview&&eligible);
  document.querySelector('#infeed-ad').hidden=!(allowed()&&eligible&&!failed);
  requestIfVisible();
 }
 return {init,render,supportURL};
})();
