/* Local image-to-Braille conversion. No image data leaves the browser. */
window.CutemojiDotMaker=(()=>{
 function dimensions(width,height,columns){
  let cols=columns,rows=Math.max(1,Math.round(height/width*cols/2));
  if((cols+1)*rows>1900){const scale=Math.sqrt(1900/((cols+1)*rows));cols=Math.max(1,Math.floor(cols*scale));rows=Math.max(1,Math.floor(rows*scale));}
  rows=Math.min(rows,Math.floor(1900/(cols+1)));return {cols,rows};
 }
 // Floyd–Steinberg error diffusion preserves midtones as dot density.
 function encode(data,width,height,threshold,invert,mode='clean'){
  const light=new Float32Array(width*height),dots=new Uint8Array(width*height);
  for(let i=0;i<light.length;i++){const j=i*4,a=data[j+3]/255;light[i]=(.2126*data[j]+.7152*data[j+1]+.0722*data[j+2])*a+255*(1-a);if(mode==='detail')light[i]=255*Math.pow(light[i]/255,Math.log(.5)/Math.log(Math.max(1,Math.min(254,threshold))/255));}
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){const i=y*width+x;const on=light[i]<(mode==='detail'?128:threshold);dots[i]=invert?!on:on;
   if(mode==='detail'){const error=light[i]-(on?0:255);if(x+1<width)light[i+1]+=error*7/16;if(y+1<height){if(x>0)light[i+width-1]+=error*3/16;light[i+width]+=error*5/16;if(x+1<width)light[i+width+1]+=error/16;}}
  }
  const bits=[[0,3],[1,4],[2,5],[6,7]],lines=[];
  for(let y=0;y<height;y+=4){let line='';for(let x=0;x<width;x+=2){let cell=0;for(let dy=0;dy<4;dy++)for(let dx=0;dx<2;dx++)if(dots[(y+dy)*width+x+dx])cell|=1<<bits[dy][dx];line+=String.fromCodePoint(0x2800+cell)}lines.push(line)}return lines.join('\n');
 }
 function init({tr,copy,save}){
  const $=s=>document.querySelector(s);let source=null,objectURL=null,result='',ticket=0,errorKey='';
  const pane=$('#dot-maker'),preview=$('#dot-source'),output=$('#dot-output');
  function status(key){errorKey=key;$('#dot-status').textContent=key?tr(key):'';}
  function fit(){if(!result||pane.hidden)return;output.style.fontSize='12px';const width=output.scrollWidth,available=$('#dot-result').clientWidth-32;if(width>available&&available>0)output.style.fontSize=Math.max(1,12*available/width)+'px';}
  function update(){
   if(!source)return;const {cols,rows}=dimensions(source.naturalWidth||source.width,source.naturalHeight||source.height,Number($('#dot-size').value));const canvas=document.createElement('canvas');canvas.width=cols*2;canvas.height=rows*4;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(source,0,0,canvas.width,canvas.height);
   result=encode(ctx.getImageData(0,0,canvas.width,canvas.height).data,canvas.width,canvas.height,Number($('#dot-tone').value),$('#dot-invert').checked,$('#dot-mode').value);
   output.textContent=result;$('#dot-tone-value').textContent=$('#dot-tone').value;const blank=!/[^\u2800\n]/u.test(result);$('#dot-copy').disabled=blank;$('#dot-save').disabled=blank;status(blank?'dot.blank':'');fit();
  }
  $('#dot-file').addEventListener('change',async e=>{
   const file=e.target.files[0];e.target.value='';if(!file)return;const current=++ticket;
   if(!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type)||file.size>15*1024*1024){status('dot.invalid');return;}
   const url=URL.createObjectURL(file),img=new Image();status('dot.loading');
   try{img.src=url;await img.decode();if(current!==ticket){URL.revokeObjectURL(url);return}if(img.naturalWidth*img.naturalHeight>40000000)throw Error('size');if(objectURL)URL.revokeObjectURL(objectURL);objectURL=url;source=img;preview.src=url;$('#dot-work').hidden=false;$('#dot-remove').hidden=false;update();}
   catch{URL.revokeObjectURL(url);if(current===ticket)status('dot.invalid')}
  });
  function clear(){
   ticket++;if(objectURL)URL.revokeObjectURL(objectURL);objectURL=null;source=null;result='';
   preview.removeAttribute('src');output.textContent='';$('#dot-work').hidden=true;$('#dot-remove').hidden=true;status('');
  }
  $('#dot-remove').onclick=clear;
  for(const id of ['#dot-size','#dot-tone','#dot-invert','#dot-mode'])$(id).addEventListener('input',update);
  $('#dot-copy').onclick=()=>{if(result)copy(result)};$('#dot-save').onclick=()=>{if(result)save(result)};
  new ResizeObserver(fit).observe($('#dot-result'));
  clear();
  return {refresh(){if(errorKey)status(errorKey);fit()}};
 }
 return {dimensions,encode,init};
})();
