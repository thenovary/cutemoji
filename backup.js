/* Portable, versioned backup format; no network requests. */
(function(root){
const unique=list=>[...new Set(list.map(s=>s.trim()).filter(Boolean))];
function validate(data){
 if(!data||data.app!=='cutemoji'||data.version!==1)throw Error('backup.invalidVersion');
 const result={};for(const key of ['custom','favorites','recent']){const list=data[key];if(!Array.isArray(list)||list.length>10000||list.some(x=>typeof x!=='string'||!x.trim()||x.length>2000))throw Error('backup.invalidData');result[key]=unique(list)}
 result.recent=result.recent.slice(0,100);return result;
}
function merge(current,incoming,catalog){
 const custom=unique([...current.custom,...incoming.custom]);const favorites=unique([...current.favorites,...incoming.favorites]);const recent=unique([...current.recent,...incoming.recent]).slice(0,100);
 const known=new Set([...catalog,...custom]);for(const t of [...favorites,...recent])if(!known.has(t)){custom.push(t);known.add(t)}
 if(custom.length>10000||favorites.length>10000)throw Error('backup.tooMany');
 return {custom,favorites,recent};
}
function encode(state){return JSON.stringify({app:'cutemoji',version:1,exportedAt:new Date().toISOString(),...state},null,2)}
const api={validate,merge,encode};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CutemojiBackup=api;
})(typeof window==='undefined'?globalThis:window);
