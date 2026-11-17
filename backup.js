/* Portable, versioned backup format; no network requests. */
(function(root){
const unique=list=>[...new Set(list.filter(s=>s.trim()))];
const allowedTypes=new Set(['faces','line','phrases','art','fonts','nickname','my']);
function types(raw){return Object.fromEntries(Object.entries(raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{}).filter(([text,type])=>text.trim()&&text.length<=2000&&allowedTypes.has(type)))}
function validate(data){
 if(!data||data.app!=='cutemoji'||data.version!==1)throw Error('backup.invalidVersion');
 const result={};for(const key of ['custom','favorites','recent']){const list=data[key];if(!Array.isArray(list)||list.length>10000||list.some(x=>typeof x!=='string'||!x.trim()||x.length>2000))throw Error('backup.invalidData');result[key]=unique(list)}
 result.recent=result.recent.slice(0,100);const metadata=types(data.types);if(Object.keys(metadata).length)result.types=metadata;const customTypes=Object.fromEntries(Object.entries(types(data.customTypes)).filter(([text,type])=>result.custom.includes(text)&&['faces','line','phrases','art'].includes(type)));if(Object.keys(customTypes).length)result.customTypes=customTypes;return result;
}
function merge(current,incoming,catalog){
 const custom=unique([...current.custom,...incoming.custom]);const favorites=unique([...current.favorites,...incoming.favorites]);const recent=unique([...current.recent,...incoming.recent]).slice(0,100);
 const metadata={...types(incoming.types),...types(current.types)};const known=new Set([...catalog,...custom,...Object.keys(metadata)]);for(const t of [...favorites,...recent])if(!known.has(t)){custom.push(t);known.add(t)}
 if(custom.length>10000||favorites.length>10000)throw Error('backup.tooMany');
 const customTypes={...types(incoming.customTypes),...types(current.customTypes)};
 return {custom,favorites,recent,...(Object.keys(customTypes).length?{customTypes}:{}),...(Object.keys(metadata).length?{types:metadata}:{})};
}
function encode(state){return JSON.stringify({app:'cutemoji',version:1,exportedAt:new Date().toISOString(),...state},null,2)}
const api={validate,merge,encode};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CutemojiBackup=api;
})(typeof window==='undefined'?globalThis:window);
