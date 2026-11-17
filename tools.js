/* Pure text generators: no account lookups or network calls. */
window.CutemojiTools = (() => {
 const features=['faces','line','phrases','art','fonts','nickname'];
 function decorate(text){return [...new Set(CutemojiCollections.templates.map(template=>template.replace(/\{(?:text|name)\}|text|name/gi,()=>text)))];}
 function fonts(text){return [...new Set(CutemojiFontStyles.results(text).map(x=>x.t))]}
 function usernames(text,offset=0){const base=text.toLowerCase().replace(/[^a-z0-9_]/g,'').slice(0,16);if(!base)return [];const words=['peach','momo','cloud','berry','bunny','luna','tiny','milk','petal','cozy','mint','pearl'];return words.map((_,i)=>{const word=words[(i+offset)%words.length];return i%3===0?word+'_'+base:i%3===1?base+'_'+word:base+'_'+String((offset*17+i*7)%100).padStart(2,'0')})}
 const catalog=Object.entries(CutemojiCollections).filter(([key])=>key!=='templates').flatMap(([kind,values])=>values.map(t=>({t,kind,feature:kind==='ascii'||kind==='dot'?'art':kind})));
 function guessType(text){
  if(/name/i.test(text.normalize('NFKC')))return 'nickname';
  const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  for(const template of CutemojiCollections.templates){const parts=template.split(/\{(?:text|name)\}|text|name/gi);if(parts.length>1&&new RegExp('^'+parts.map(escape).join('.+')+'$','u').test(text))return 'nickname'}
  if(/[\u{1D400}-\u{1D7FF}\uFF21-\uFF5A\u24B6-\u24E9]/u.test(text))return 'fonts';
  return 'my';
 }
 return {features,decorate,fonts,usernames,catalog,guessType};
})();
