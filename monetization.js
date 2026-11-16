window.CutemojiMonetization = (() => {
 const preview = ['localhost','127.0.0.1','[::1]'].includes(location.hostname) && new URLSearchParams(location.search).get('previewAds') === '1';
 function supportURL(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}}
 function init(){const link=document.querySelector('#support-link');const url=supportURL(window.CutemojiConfig?.supportUrl);if(url||supportURL(window.CutemojiConfig?.kakaoUrl)||supportURL(window.CutemojiConfig?.tossUrl)||window.CutemojiConfig?.bank?.number){link.href='./support.html';link.removeAttribute('target');link.hidden=false}}
 function render(count){document.querySelector('#ad-preview').hidden=!(preview&&count>0)}
 return {init,render,supportURL};
})();
