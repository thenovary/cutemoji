window.CutemojiSEO=(()=>{
 const root=new URL('.',document.baseURI),meta=window.CutemojiSEOMeta;
 const routes={faces:'kaomoji',line:'text-dividers',phrases:'copypasta',art:'ascii-art',fonts:'font-generator',nickname:'nickname-generator'};
 document.querySelector('base').href=root.href;
 const page=document.documentElement.dataset.page||'kaomoji';
 const initial={feature:Object.keys(routes).find(k=>routes[k]===page)|| (page==='username-generator'?'nickname':page==='image-to-dot-art'?'art':'faces'),artKind:page==='image-to-dot-art'?'create':'all',nicknameMode:page==='username-generator'?'id':'decor'};
 function href(feature,lang=I18n.language){return new URL(lang+'-'+(routes[feature]||feature)+'.html',root).href}
 function sync({feature,artKind,nicknameMode,view}){
  const slug=feature==='art'&&artKind==='create'?'image-to-dot-art':feature==='nickname'&&nicknameMode==='id'?'username-generator':routes[feature]||'kaomoji',lang=I18n.language,m=meta[lang]?.[slug];if(!m)return;
  const url='https://cutemoji.pages.dev/'+lang+'-'+slug+'.html';document.title=m.title;
  for(const [selector,value] of [['meta[name="description"]',m.description],['meta[property="og:title"]',m.title],['meta[property="og:description"]',m.description],['meta[property="og:url"]',url],['meta[name="twitter:title"]',m.title],['meta[name="twitter:description"]',m.description]])document.querySelector(selector)?.setAttribute('content',value);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href',url);
  document.querySelectorAll('link[hreflang]').forEach(a=>a.href='https://cutemoji.pages.dev/'+(a.hreflang==='x-default'?'en':a.hreflang)+'-'+slug+'.html');
  document.querySelectorAll('[data-seo-page]').forEach(a=>a.href=href(a.dataset.seoPage));
  document.querySelectorAll('#features a[data-feature]').forEach(a=>a.href=href(a.dataset.feature));
  const ld=document.querySelector('script[type="application/ld+json"]');if(ld){const data=JSON.parse(ld.textContent);Object.assign(data,{name:m.title,description:m.description,url,inLanguage:lang});ld.textContent=JSON.stringify(data)}
  const target=href(slug);if(location.href!==target)history.replaceState(null,'',target)
 }
 return {initial,href,sync};
})();
