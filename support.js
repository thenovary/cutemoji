async function startSupport(){
 await I18n.init();let toastTimer;function toast(message){const el=document.getElementById('status');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300)}const c=window.CutemojiConfig||{};
 function safe(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}}
 for(const [id,value]of [['coffee',c.supportUrl],['kakao',c.kakaoUrl],['toss',c.tossUrl]]){const el=document.getElementById(id),url=safe(value);if(url){el.href=url;el.hidden=false}}
 const bank=c.bank;
 // Keep the link's default action synchronous so mobile app launching retains the tap gesture.
 if(bank?.number){document.getElementById('toss').addEventListener('click',()=>{
  try{Promise.resolve(navigator.clipboard.writeText(bank.number)).then(()=>{toast(I18n.t('copy.success'))}).catch(showAccountFallback)}catch{showAccountFallback()}
 })}
 function showAccountFallback(){const input=document.getElementById('account-fallback');input.value=bank.number;input.hidden=false;toast(I18n.t('copy.failed'))}

 if(bank?.name&&bank?.number&&!c.tossUrl){const toss=document.getElementById('toss');const query=new URLSearchParams({amount:'0',bank:bank.name,accountNo:bank.number,origin:'qr'});toss.href='supertoss://send?'+query.toString();toss.removeAttribute('target');toss.hidden=false;}
if(bank?.name&&bank?.number&&bank?.holder){document.getElementById('bank').hidden=false;document.getElementById('bank-details').textContent=(bank.name==='카카오뱅크'?I18n.t('support.bankKakao'):bank.name)+' · '+bank.number;document.getElementById('account-holder').textContent=bank.holder;document.getElementById('copy-account').onclick=async()=>{try{await navigator.clipboard.writeText(bank.number);toast(I18n.t('copy.success'))}catch{const input=document.getElementById('account-fallback');input.value=bank.number;input.hidden=false;input.focus();input.select();toast(I18n.t('copy.failed'))}}}
}
startSupport().catch(()=>{document.getElementById('status').textContent='Unable to load. Please reload.';document.getElementById('status').classList.add('show')});
