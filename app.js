async function startApp(){
await I18n.init();
const tr=(key,vars)=>I18n.t(key,vars);
const fmt=n=>new Intl.NumberFormat(I18n.language).format(n);
function message(selector,key){const el=document.querySelector(selector);el.dataset.messageKey=key;el.textContent=tr(key)}
const $=s=>document.querySelector(s);
CutemojiMonetization.init();
const STATE_KEY='cutemoji-state-v1';
const clean=list=>Array.isArray(list)?[...new Set(list.filter(x=>typeof x==='string').map(x=>x.trim()).filter(Boolean))]:[];
function loadState(){try{const raw=localStorage.getItem(STATE_KEY);if(raw){const state=JSON.parse(raw);return {custom:clean(state.custom),favorites:clean(state.favorites),recent:clean(state.recent).slice(0,100)}}return {custom:clean(JSON.parse(localStorage.getItem('cutemoji-custom')||'[]')),favorites:clean(JSON.parse(localStorage.getItem('cutemoji-favorites')||'[]')),recent:clean(JSON.parse(localStorage.getItem('cutemoji-recent')||'[]')).slice(0,100)}}catch{return {custom:[],favorites:[],recent:[]}}}
const initial=loadState();let custom=initial.custom,favorites=new Set(initial.favorites),recent=initial.recent,view='all',category='all',limit=60;
function state(){return {custom:[...custom],favorites:[...favorites],recent:[...recent]}}
function commit(next){localStorage.setItem(STATE_KEY,JSON.stringify(next));custom=next.custom;favorites=new Set(next.favorites);recent=next.recent}
const cats=['all','cute','love','happy','angry','sad','other','my'].map(key=>[key,'category.'+key]);
function persist(){try{commit(state());return true}catch{toast(tr('storage.sessionOnly'));return false}}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2300)}
function hasCat(item){return category==='all'||(category==='my'?custom.includes(item.t):item.category===category)}
function pool(){const all=new Map(ITEMS.map(x=>[x.t,x]));for(const t of custom)if(!all.has(t))all.set(t,{t,l:tr('my.item'),category:'my'});return [...all.values()]}
function saveCustom(next){try{commit({...state(),custom:next});return true}catch{toast(tr('storage.failed'));return false}}
function list(){let arr=category==='my'?custom.map(t=>({t,l:tr('my.item'),category:'my'})):pool();if(view==='favorites')arr=arr.filter(x=>favorites.has(x.t));if(view==='recent')arr=recent.map(t=>pool().find(x=>x.t===t)).filter(Boolean);return arr.filter(hasCat)}
function render(){document.querySelectorAll('[data-category]').forEach(b=>b.textContent=tr('category.'+b.dataset.category));const arr=list();$('#add-custom').hidden=category!=='my';$('.copy-hint').hidden=category==='my';$('#grid').replaceChildren();$('#viewtitle').textContent='cutemoji ♡';$('#categorytitle').textContent=category==='all'?{all:tr('category.all'),favorites:tr('list.favorites'),recent:tr('list.recent')}[view]:tr(cats.find(c=>c[0]===category)[1]);$('#resultcount').textContent=tr('list.count',{count:fmt(arr.length)});document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));document.querySelectorAll('[data-category]').forEach(b=>b.classList.toggle('active',b.dataset.category===category));
for(const item of arr.slice(0,limit)){const card=document.createElement('article');card.className='card';const copy=document.createElement('button');copy.className='copy';copy.setAttribute('aria-label',tr('a11y.copy',{text:item.t}));const expr=document.createElement('span');expr.className='expression'+(item.t.length>30||item.t.includes('\n')?' long':'');expr.textContent=item.t;copy.append(expr);copy.onclick=()=>copyItem(item);const heart=document.createElement('button');heart.className='heart'+(favorites.has(item.t)?' saved':'');heart.textContent=favorites.has(item.t)?'♥':'♡';heart.setAttribute('aria-label',tr('a11y.favorite',{text:item.t}));heart.setAttribute('aria-pressed',favorites.has(item.t));heart.onclick=()=>{favorites.has(item.t)?favorites.delete(item.t):favorites.add(item.t);persist();render()};card.append(copy,heart);if(category==='my'){const remove=document.createElement('button');remove.className='remove-custom';remove.textContent='×';remove.setAttribute('aria-label',tr('my.delete'));remove.onclick=()=>removeCustom(item.t);card.append(remove)}$('#grid').append(card)}
$('#to-top').hidden=$('.results').scrollTop<300;$('#empty').hidden=!!arr.length;$('#emptyhint').textContent=category==='my'?tr('empty.my'):category!=='all'?tr('empty.category'):view==='favorites'?tr('empty.favorites'):tr('empty.recent');$('#more').hidden=arr.length<=limit;CutemojiMonetization.render(arr.length);
}
async function copyItem(item){let ok=false;try{await navigator.clipboard.writeText(item.t);ok=true}catch{const t=document.createElement('textarea');t.value=item.t;t.style.cssText='position:fixed;left:-9999px';document.body.append(t);t.select();try{ok=document.execCommand('copy')}catch{}t.remove()}if(!ok){toast(tr('copy.failed'));return}recent=[item.t,...recent.filter(x=>x!==item.t)].slice(0,100);const saved=persist();if(saved)toast(tr('copy.success'));if(view==='recent')render()}
for(const [key,label]of cats){const b=document.createElement('button');b.textContent=tr(label);b.dataset.category=key;b.onclick=()=>{category=key;if(key==='my')view='all';limit=60;render();$('.results').scrollTop=0};$('#categories').append(b)}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;category='all';limit=60;render();$('.results').scrollTop=0});$('#more').onclick=()=>{const y=$('.results').scrollTop;limit+=60;render();$('.results').scrollTop=y};$('.close').onclick=()=>$('#install-dialog').close();document.querySelectorAll('.install').forEach(b=>b.onclick=()=>{$('#settings-dialog').close();$('#install-dialog').showModal()});$('#install-dialog').onclick=e=>{if(e.target===$('#install-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}};let installPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#native-install').hidden=false});$('#native-install').onclick=async()=>{if(!installPrompt)return;await installPrompt.prompt();installPrompt=null;$('#native-install').hidden=true};window.addEventListener('storage',()=>{const next=loadState();custom=next.custom;favorites=new Set(next.favorites);recent=next.recent;render()});render();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});

$('#add-custom').onclick=()=>{$('#custom-form').reset();$('#custom-error').textContent='';$('#custom-dialog').showModal();$('#custom-text').focus()};
$('#custom-close').onclick=()=>$('#custom-dialog').close();
$('#custom-form').onsubmit=e=>{e.preventDefault();const t=$('#custom-text').value.trim();if(!t){message('#custom-error','my.required');return}if(t.length>2000){message('#custom-error','my.tooLong');return}if(custom.includes(t)){message('#custom-error','my.duplicate');return}if(!saveCustom([t,...custom]))return;view='all';category='my';limit=60;render();$('.results').scrollTop=0;$('#custom-dialog').close();toast(tr('my.added'))};
function removeCustom(t){
 const position=custom.indexOf(t),wasFavorite=favorites.has(t),recentPosition=recent.indexOf(t),builtin=ITEMS.some(x=>x.t===t);
 try{const next=state();next.custom=next.custom.filter(x=>x!==t);if(!builtin){next.favorites=next.favorites.filter(x=>x!==t);next.recent=next.recent.filter(x=>x!==t)}commit(next)}catch{toast(tr('my.deleteFailed'));return}
 render();toast(tr('my.deleted'));clearTimeout(window.toastTimer);const undo=document.createElement('button');undo.textContent=tr('common.undo');undo.dataset.i18n='common.undo';
 undo.onclick=()=>{try{const next=state();next.custom=next.custom.filter(x=>x!==t);next.custom.splice(Math.min(position,next.custom.length),0,t);if(wasFavorite&&!next.favorites.includes(t))next.favorites.push(t);if(recentPosition>=0&&!next.recent.includes(t))next.recent.splice(Math.min(recentPosition,next.recent.length),0,t);next.recent=next.recent.slice(0,100);commit(next);render();toast(tr('my.restored'))}catch{toast(tr('my.restoreFailed'))}};
 $('#toast').append(undo);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),8000)
}

const results=$('.results');
results.addEventListener('scroll',()=>{$('#to-top').hidden=results.scrollTop<300},{passive:true});
$('#to-top').onclick=()=>{results.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
$('#share-app').onclick=async()=>{
 const url=new URL('./',location.href).href;
 if(navigator.share){try{await navigator.share({title:'cutemoji',text:tr('share.text'),url});return}catch(error){if(error.name==='AbortError')return}}
 try{await navigator.clipboard.writeText(url);message('#share-status','share.copied')}
 catch{ $('#share-url').value=url;$('#share-fallback').hidden=false;$('#share-url').focus();$('#share-url').select() }
};
let pendingImport=null;
function resetImport(){pendingImport=null;$('#import-preview').hidden=true;$('#backup-file').value=''}
$('.settings-trigger').onclick=()=>{resetImport();$('#backup-status').textContent='';$('#share-status').textContent='';$('#share-fallback').hidden=true;$('#settings-dialog').showModal()};
$('.settings-close').onclick=()=>$('#settings-dialog').close();
$('#export-backup').onclick=()=>{const data=CutemojiBackup.encode(state());const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='cutemoji-backup-'+new Date().toISOString().slice(0,10)+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);message('#backup-status','backup.exported')};
$('#choose-backup').onclick=()=>{resetImport();$('#backup-status').textContent='';$('#backup-file').click()};
$('#backup-file').onchange=async e=>{const file=e.target.files[0];resetImport();if(!file)return;try{if(file.size>5*1024*1024)throw Error('backup.tooLarge');pendingImport=CutemojiBackup.validate(JSON.parse(await file.text()));$('#import-summary').textContent=tr('backup.summary',{custom:fmt(pendingImport.custom.length),favorites:fmt(pendingImport.favorites.length),recent:fmt(pendingImport.recent.length)});$('#import-preview').hidden=false;message('#backup-status','backup.review')}catch(error){pendingImport=null;message('#backup-status',error instanceof SyntaxError?'backup.invalidJSON':error.message.startsWith('backup.')?error.message:'backup.failed')}};
$('#cancel-import').onclick=()=>{resetImport();message('#backup-status','backup.cancelled')};
$('#confirm-import').onclick=()=>{if(!pendingImport)return;try{const next=CutemojiBackup.merge(state(),pendingImport,ITEMS.map(x=>x.t));commit(next);render();resetImport();message('#backup-status','backup.imported')}catch(error){message('#backup-status',error.name==='QuotaExceededError'?'backup.noSpace':error.message.startsWith('backup.')?error.message:'backup.failed')}};

const languageSelect=$('#language-select');
for(const language of I18n.languages){const option=document.createElement('option');option.value=language.code;option.textContent=language.label;languageSelect.append(option)}
languageSelect.value=I18n.language;
languageSelect.onchange=async()=>{languageSelect.disabled=true;try{const saved=await I18n.setLanguage(languageSelect.value);render();document.querySelectorAll('[data-message-key]').forEach(el=>{if(el.textContent)el.textContent=tr(el.dataset.messageKey)});if(pendingImport)$('#import-summary').textContent=tr('backup.summary',{custom:fmt(pendingImport.custom.length),favorites:fmt(pendingImport.favorites.length),recent:fmt(pendingImport.recent.length)});$('#toast').classList.remove('show');if(!saved)toast(tr('language.unsaved'))}catch{toast(tr('language.failed'))}finally{languageSelect.value=I18n.language;languageSelect.disabled=false}};
}
startApp().catch(error=>{console.error(error);document.body.textContent='Unable to load cutemoji. Please reload.'});
