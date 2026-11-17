(function(){
 const KEY='cutemoji-language';let fallback={},dictionary={},language='ko',languages=[];const loaded=new Map();
 async function json(path){const response=await fetch(path);if(!response.ok)throw Error('locale_load_failed');return response.json()}
 function t(key,vars={}){const value=dictionary[key]??fallback[key]??key;return String(value).replace(/\{(\w+)\}/g,(match,name)=>Object.hasOwn(vars,name)?String(vars[name]):match)}
 function apply(){document.documentElement.lang=language;document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));document.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));document.querySelectorAll('[data-i18n-content]').forEach(el=>el.setAttribute('content',t(el.dataset.i18nContent)))}
 async function load(code){if(loaded.has(code))return loaded.get(code);const data=await json('./locales/'+encodeURIComponent(code)+'.json');if(!data||Array.isArray(data)||Object.values(data).some(x=>typeof x!=='string'))throw Error('invalid_locale');loaded.set(code,data);return data}
 function detect(preferences){
  const supported=new Map(languages.map(x=>[x.code.toLowerCase(),x.code]));
  for(const preference of preferences){
   const tag=String(preference).replace(/_/g,'-').toLowerCase();
   if(supported.has(tag))return supported.get(tag);
   const parts=tag.split('-'),base=parts[0];
   if(base==='zh'){const code=parts.includes('hant')?'zh-tw':parts.includes('hans')?'zh-cn':parts.some(p=>['tw','hk','mo'].includes(p))?'zh-tw':'zh-cn';if(supported.has(code))return supported.get(code)}
   if(base==='pt'&&supported.has('pt-br'))return supported.get('pt-br');
   if(supported.has(base))return supported.get(base);
  }
  return supported.get('en')||supported.get('ko')||languages[0].code;
 }
 async function init(){languages=await json('./locales/languages.json');fallback=await load('ko');let preferred;try{preferred=localStorage.getItem(KEY)}catch{}preferred=document.documentElement.dataset?.locale||preferred;if(!languages.some(x=>x.code===preferred))preferred=detect(navigator.languages?.length?navigator.languages:[navigator.language]);try{dictionary=await load(preferred);language=preferred}catch{dictionary=fallback;language='ko'}apply()}
 async function setLanguage(code){if(!languages.some(x=>x.code===code))throw Error('unsupported_locale');const next=await load(code);dictionary=next;language=code;apply();try{localStorage.setItem(KEY,code);return true}catch{return false}}
 window.I18n={init,t,setLanguage,get language(){return language},get languages(){return languages}};
})();
