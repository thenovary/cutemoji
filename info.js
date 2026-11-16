(() => {
 const dialog=document.getElementById('info-dialog'),body=document.getElementById('info-content'),title=document.getElementById('info-title');
 let pages,request=0,origin;
 const t=key=>window.I18n.t(key);
 document.getElementById('info-close').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>{request++;if(origin?.isConnected)origin.focus()});
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
 document.querySelectorAll('[data-info]').forEach(link=>link.addEventListener('click',async e=>{
  e.preventDefault();origin=link;const kind=link.dataset.info,token=++request;
  title.textContent=t('info.'+kind);body.replaceChildren();dialog.showModal();body.scrollTop=0;
  if(kind==='contact'){
   const address=document.createElement('a');address.href='mailto:infodeskline@gmail.com';address.textContent='infodeskline@gmail.com';address.className='contact-email';body.append(address);return;
  }
  body.setAttribute('aria-busy','true');
  try{
   if(!pages){const response=await fetch('./page-content.json');if(!response.ok)throw Error('content');pages=await response.json()}
   if(token!==request||!dialog.open)return;
   for(const [heading,text] of pages[kind].sections){const section=document.createElement('section'),h=document.createElement('h3'),paragraph=document.createElement('p');h.textContent=heading;paragraph.textContent=text;section.append(h,paragraph);body.append(section)}
   if(kind==='privacy'){
    const links=document.createElement('p');
    for(const [label,url] of [['GitHub Privacy','https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement'],['Google Ads','https://policies.google.com/technologies/ads'],['My Ad Center','https://myadcenter.google.com/']]){const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';links.append(a,document.createTextNode(' · '))}body.append(links);
   }
  }catch{if(token===request)body.textContent=t('language.failed')}
  finally{if(token===request)body.removeAttribute('aria-busy')}
 }));
})();
