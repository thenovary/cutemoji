/* Text conversion tables adapted from the user's previous fonts page. */
window.CutemojiFontStyles=(()=>{
 function stableSeedFrom(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
 function mulberry32(a){return ()=>{let t=a+=0x6D2B79F5;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296}}
 let random=mulberry32(1);
    const mapRanges = {
      buildAlphaDigits:(U,L,D=null)=>{ const up=[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'], lo=[...'abcdefghijklmnopqrstuvwxyz'], dg=[...'0123456789']; const m={}; up.forEach((ch,i)=>m[ch]=String.fromCodePoint(U+i)); lo.forEach((ch,i)=>m[ch]=String.fromCodePoint(L+i)); if(D!=null) dg.forEach((ch,i)=>m[dg[i]]=String.fromCodePoint(D+i)); const patches={0x1D455:'ℎ',0x1D49D:'ℬ',0x1D4A0:'ℰ',0x1D4A1:'ℱ',0x1D4A3:'ℋ',0x1D4A4:'ℐ',0x1D4A7:'ℒ',0x1D4A8:'ℳ',0x1D4AD:'ℛ',0x1D4BA:'ℯ',0x1D4BC:'ℊ',0x1D4C4:'ℴ',0x1D506:'ℭ',0x1D50B:'ℌ',0x1D50C:'ℑ',0x1D515:'ℜ',0x1D51D:'ℨ',0x1D53A:'ℂ',0x1D53F:'ℍ',0x1D545:'ℕ',0x1D547:'ℙ',0x1D548:'ℚ',0x1D549:'ℝ',0x1D551:'ℤ'};for(const ch of Object.keys(m))m[ch]=patches[m[ch].codePointAt(0)]||m[ch];return m; },
      fullWidth:(()=>{ const m={}; for(let i=33;i<=126;i++){ m[String.fromCharCode(i)] = String.fromCharCode(0xFF00 + i - 0x20);} m[' '] = '　'; return m; })(),
      circled:(()=>{ const m={}; const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ', a='abcdefghijklmnopqrstuvwxyz', d='0123456789'; for(let i=0;i<26;i++){ m[A[i]]=String.fromCodePoint(0x24B6+i); m[a[i]]=String.fromCodePoint(0x24D0+i);} for(let i=0;i<10;i++){ m[d[i]]=String.fromCodePoint(0x2460+i-1);} m['0']='⓪'; return m; })(),
      squared:(()=>{ const m={}; const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for(let i=0;i<26;i++){ const g=String.fromCodePoint(0x1F130+i); m[A[i]]=g; m[A[i].toLowerCase()]=g;} return m; })(),
      negativeSquared:(()=>{ const m={}; const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for(let i=0;i<26;i++){ const g=String.fromCodePoint(0x1F170+i); m[A[i]]=g; m[A[i].toLowerCase()]=g;} return m; })(),
      smallCaps:(()=>{ const src='abcdefghijklmnopqrstuvwxyz', dst='ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ', m={}; for(let i=0;i<src.length;i++){ m[src[i]]=dst[i]; m[src[i].toUpperCase()]=dst[i]; } return m; })(),
      fancy:(()=>{ const src='abcdefghijklmnopqrstuvwxyz', dst='αɓςɗєƒɠɦɪʝƙʟɱɳσρϙɾʂƭᴜѵѡхყȥ', m={}; for(let i=0;i<src.length;i++){ const a=src[i]; m[a]=dst[i]; m[a.toUpperCase()]=dst[i]; } return m; })(),
      unique:(()=>{ const pairs={a:'ꪖ',b:'᥇',c:'ς',d:'ɖ',e:'ꫀ',f:'ᠻ',g:'ᧁ',h:'ꫝ',i:'𝓲',j:'𝓳',k:'ꪜ',l:'ꪶ',m:'ꪑ',n:'ꪀ',o:'ꪮ',p:'ρ',q:'ꪇ',r:'𝘳',s:'ˢ',t:'𝓽',u:'ꪊ',v:'ꪙ',w:'᭙',x:'᥊',y:'ꪗ',z:'ƺ'}, m={}; for(const [k,v] of Object.entries(pairs)){ m[k]=v; m[k.toUpperCase()]=v; } return m; })(),
      superscripts:(()=>{ const m={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',a:'ᵃ',b:'ᵇ',c:'ᶜ',d:'ᵈ',e:'ᵉ',f:'ᶠ',g:'ᵍ',h:'ʰ',i:'ⁱ',j:'ʲ',k:'ᵏ',l:'ˡ',m:'ᵐ',n:'ⁿ',o:'ᵒ',p:'ᵖ',r:'ʳ',s:'ˢ',t:'ᵗ',u:'ᵘ',v:'ᵛ',w:'ʷ',x:'ˣ',y:'ʸ',z:'ᶻ',A:'ᴬ',B:'ᴮ',D:'ᴰ',E:'ᴱ',G:'ᴳ',H:'ᴴ',I:'ᴵ',J:'ᴶ',K:'ᴷ',L:'ᴸ',M:'ᴹ',N:'ᴺ',O:'ᴼ',P:'ᴾ',R:'ᴿ',T:'ᵀ',U:'ᵁ',V:'ⱽ',W:'ᵂ'}; return m; })(),
    };
    const mapByTable=(s,t)=>[...s].map(ch=>t[ch] ?? ch).join('');
    const graphemes=s=>Array.from(new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(s),x=>x.segment);
    const combineAbove=(s,marks)=>{ const suf=marks.join(''); return graphemes(s).map(ch=>/\s/.test(ch)?ch:(ch+suf)).join(''); };

    

// ---- Extra helpers for new EN styles ----

// Upside-down flip map (subset + fallbacks)
const FLIP_MAP = {
  'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'ʃ','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z',
  'A':'∀','B':'𐐒','C':'Ɔ','D':'◖','E':'Ǝ','F':'Ⅎ','G':'פ','H':'H','I':'I','J':'ſ','K':'ʞ','L':'˥','M':'W','N':'N','O':'O','P':'Ԁ','Q':'Ὁ','R':'ᴚ','S':'S','T':'┴','U':'∩','V':'Λ','W':'M','X':'X','Y':'⅄','Z':'Z',
  '0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6',
  '.':'˙',',':'\'','\'':',','"':',,','`':',',';':'؛','!':'¡','?':'¿','(':')',')':'(','[':']',']':'[','{':'}','}':'{','<':'>','>':'<','&':'⅋','_':'‾'
};
function flipText(s){
  const arr=graphemes(s).reverse().map(ch=>FLIP_MAP[ch] ?? FLIP_MAP[ch.toLowerCase?.()||''] ?? ch);
  return arr.join('');
}

// Mirror map (left-right mirrored look; best-effort coverage)
const MIRROR_MAP = {
  'A':'∀','B':'ꓭ','C':'Ↄ','D':'◖','E':'Ǝ','F':'ꟻ','G':'Ɠ','H':'H','I':'I','J':'ſ','K':'⋊','L':'⅃','M':'W','N':'Ͷ','O':'O','P':'Ԁ','Q':'ǫ','R':'Я','S':'Ꙅ','T':'ꓕ','U':'∩','V':'Ʌ','W':'M','X':'X','Y':'ʎ','Z':'𐑒',
  'a':'ɒ','b':'d','c':'ↄ','d':'b','e':'ɘ','f':'ʇ','g':'ɟ','h':'ʜ','i':'i','j':'ɾ','k':'ʞ','l':'|','m':'m','n':'u','o':'o','p':'q','q':'p','r':'ɿ','s':'ꙅ','t':'ƚ','u':'n','v':'ʌ','w':'w','x':'x','y':'ʏ','z':'ȥ'
};
function mirrorText(s){ return [...s].map(ch=>MIRROR_MAP[ch] ?? MIRROR_MAP[ch.toLowerCase?.()||''] ?? ch).join(''); }

// Fat Text mapping (heavy stylistic glyphs)
const FAT_MAP = (()=>{
  const pairs = {
    a:'ᗩ', b:'ᗷ', c:'ᑕ', d:'ᗪ', e:'ᗴ', f:'ᖴ', g:'Ꮆ', h:'ᕼ', i:'Ꭵ', j:'ᒍ',
    k:'ᛕ', l:'ᒪ', m:'ᗰ', n:'ᑎ', o:'ᗝ', p:'ᑭ', q:'ᑫ', r:'ᖇ', s:'ᔕ', t:'丅',
    u:'ᑌ', v:'ᐯ', w:'ᗯ', x:'᙭', y:'Ƴ', z:'乙'
  };
  const m={}; for(const [k,v] of Object.entries(pairs)){ m[k]=v; m[k.toUpperCase()]=v; }
  return m;
})();

const stylesEN=[
      {key:'random', name:'random', cls:'', fn:(s)=>randomMixed(s)},
      {key:'sans',          name:'sans',          cls:'math-font',  fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D5A0,0x1D5BA,0x1D7E2))},
      {key:'bold',          name:'bold',          cls:'math-font',  fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D400,0x1D41A,0x1D7CE))},
      {key:'smallCaps',     name:'smallCaps',     cls:'',           fn:(s)=>mapByTable(s, mapRanges.smallCaps)},
      {key:'fullWidth',     name:'fullWidth',     cls:'',           fn:(s)=>mapByTable(s, mapRanges.fullWidth)},
      {key:'bubbles',       name:'bubbles',       cls:'',           fn:(s)=>mapByTable(s, mapRanges.circled)},
      {key:'square',        name:'square',        cls:'',           fn:(s)=>mapByTable(s, mapRanges.squared)},
      {key:'negative',      name:'negative',      cls:'',           fn:(s)=>mapByTable(s, mapRanges.negativeSquared)},
      {key:'fancy',         name:'fancy',         cls:'',           fn:(s)=>mapByTable(s, mapRanges.fancy)},
      {key:'unique',        name:'unique',        cls:'',           fn:(s)=>mapByTable(s, mapRanges.unique)},
      {key:'smileDots',     name:'smileDots',     cls:'',           fn:(s)=>combineAbove(s, ['̆','̈'])},
      {key:'sparkle',       name:'sparkle',       cls:'',           fn:(s)=>graphemes(s).map(ch=>/\s/.test(ch)?ch:ch+'⋆').join('')},
      {key:'ring',          name:'ring',          cls:'',           fn:(s)=>combineAbove(s, ['̊'])},
      {key:'tilde',         name:'tilde',         cls:'',           fn:(s)=>combineAbove(s, ['̃'])},
      {key:'encloseCircle', name:'encloseCircle', cls:'',           fn:(s)=>combineAbove(s, ['⃝'])},
      {key:'heartAbove',    name:'heartAbove',    cls:'',           fn:(s)=>combineAbove(s, ['ᩚ'])},
      {key:'heartLetter',   name:'heartLetter',   cls:'',           fn:(s)=>graphemes(s).map(ch=>/\s/.test(ch)?ch:('♡'+ch+'♡')).join('')},
      {key:'ribbon',        name:'ribbon',        cls:'',           fn:(s)=>combineAbove(s, ['ྀ','ི'])},
      {key:'italic',        name:'italic',        cls:'math-font',  fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D434,0x1D44E,null))},
      {key:'boldItalic',    name:'boldItalic',    cls:'math-font',  fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D468,0x1D482,null))},
      {key:'script',        name:'script',        cls:'script-font',fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D49C,0x1D4B6,null))},
      {key:'boldScript',    name:'boldScript',    cls:'script-font',fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D4D0,0x1D4EA,null))},
      {key:'gothic',        name:'gothic',        cls:'fraktur-font',fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D504,0x1D51E,null))},
      {key:'boldGothic',    name:'boldGothic',    cls:'fraktur-font',fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D56C,0x1D586,null))},
      {key:'superscript',   name:'superscript',   cls:'',           fn:(s)=>mapByTable(s, mapRanges.superscripts)},
      {key:'underline',     name:'underline',     cls:'',           fn:(s)=>combineAbove(s,['̲'])},
      {key:'double',        name:'double',        cls:'math-font',  fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D538,0x1D552,null))},
    
      {key:'mono', name:'Mono Space', cls:'math-font', fn:(s)=>mapByTable(s, mapRanges.buildAlphaDigits(0x1D670,0x1D68A,0x1D7F6))},
      {key:'flip', name:'Luni Tools Flip', cls:'', fn:(s)=>flipText(s)},
      {key:'reverse', name:'Reverse Mirrors', cls:'', fn:(s)=>graphemes(s).reverse().join('')},
      {key:'mirror', name:'Luni Tools Mirror', cls:'', fn:(s)=>mirrorText(s)},
      {key:'fatText', name:'Fat Text', cls:'', fn:(s)=>mapByTable(s, FAT_MAP)},];
    const fnByKey={}; stylesEN.forEach(s=>fnByKey[s.key]=s.fn);
    const RANDOM_SAFE_POOL=['fullWidth','bubbles','square','negative','smallCaps','fancy','unique','sans','bold','smileDots','sparkle','ring','tilde','encloseCircle','heartAbove','ribbon'];
    function randomMixed(str){ const pool=RANDOM_SAFE_POOL; return graphemes(str).map(ch=>{ if(/\s/.test(ch)) return ch; const key=pool[(random()*pool.length)|0]; return fnByKey[key](ch); }).join(''); }

    const kanaMap={'あ':['क॑'],'い':['ഗ','ɭ','ɿ'],'う':['ɔ','੭ੇ','כֿ'],'え':['ʑ','ɀ'],'お':[],'か':['תʅ'],'き':['₹'],'く':['ㄑ'],'け':['ιϯ'],'こ':['ˉ'],'さ':['र','ट','ਟ','ㄜ','ਟੋ'],'し':['ს','ᒐ','㇟'],'す':['व','ਕ','ਭ','ತ'],'せ':['ㄝ','ए'],'そ':['౾','ਵ','ƺ','દૅ'],'た':['ƒ'],'ち':['ㄘ','ƾ','ƽ','ᖬ'],'つ':['ᑐ','ᘄ'],'て':['ح','ᘔ','Ꞇ'],'で':['ڃ'],'と':['೬','ᘧ'],'な':['ˉ','Ժˋ','ד֝','ժ՝'],'に':['ឌេ','ɭ','ˉ','ɭ'],'ぬ':[],'ね':['൹'],'の':['၈'],'は':['বে','ਰਿ','լਕ'],'ひ':['ʊ','Ʊ','ᘮ'],'ふ':['ζ','৴ડેヽ'],'へ':['ㄟ'],'ほ':['इि','ફિ','ਰਿੈ','ਝि','ਙि'],'ま':[],'み':['ਗ','ਮ','મ','೫'],'む':['ఏౌ'],'め':[],'も':['₺','Ⱡ','ŧ','ᵵ'],'や':['兯'],'ゆ':[],'よ':[],'ら':['ᣡ','ʖˋ'],'り':['ױ','ιյ','ﾚ)','၊','၂'],'る':['ਡ','ᵹ','ਛ','इ','ʓ'],'れ':['փ','ૠ'],'ろ':['Ʒ','ਤ','ჳ','ㄋ'],'わ':[],'を':['ξ'],'ん':['ƕ','Խ','Ⴡ','ᖾ','ꩢ','խ','๘']};
    function convertKana(str,mode='random'){ return [...str].map(ch=>{ const arr=kanaMap[ch]; if(!arr||arr.length===0) return ch; if(mode==='first') return arr[0]; return arr[(random()*arr.length)|0]; }).join(''); }
    function convertKanaStable(str, seed){ const rnd = mulberry32(seed>>>0); return [...str].map(ch=>{ const arr=kanaMap[ch]; if(!arr||arr.length===0) return ch; return arr[(rnd()*arr.length)|0]; }).join(''); }
    function romajiToHiragana(input){return input.normalize('NFC')}
    function hiraToKata(str){ return str.replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0)+0x60)); }

    const CIRCLED_KATA=(()=>{ const A='アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲ'; const CP_START=0x32D0; const m={}; for(let i=0;i<A.length;i++){ m[A[i]]=String.fromCodePoint(CP_START+i);} return m; })();
    const DAKUTEN='゙', HANDAKUTEN='゚';
    const KATA_VOICED_BASE={'ガ':'カ','ギ':'キ','グ':'ク','ゲ':'ケ','ゴ':'コ','ザ':'サ','ジ':'シ','ズ':'ス','ゼ':'セ','ゾ':'ソ','ダ':'タ','ヂ':'チ','ヅ':'ツ','デ':'テ','ド':'ト','バ':'ハ','ビ':'ヒ','ブ':'フ','ベ':'ヘ','ボ':'ホ','ヴ':'ウ'};
    const KATA_SEMI_BASE={'パ':'ハ','ピ':'ヒ','プ':'フ','ペ':'ヘ','ポ':'ホ'};
    function toCircledKatakana(input){
      const kata=hiraToKata(romajiToHiragana(input)); let out='';
      for(const ch of kata){
        if(KATA_VOICED_BASE[ch]){ const base=KATA_VOICED_BASE[ch]; const circ=CIRCLED_KATA[base] ?? base; out+=circ+DAKUTEN; continue; }
        if(KATA_SEMI_BASE[ch]){ const base=KATA_SEMI_BASE[ch]; const circ=CIRCLED_KATA[base] ?? base; out+=circ+HANDAKUTEN; continue; }
        out+=CIRCLED_KATA[ch] ?? (ch==='ン' ? ch+'⃝' : ch);
      }
      return out;
    }
    const KATA_HALF_BASE={'ア':'ｱ','イ':'ｲ','ウ':'ｳ','エ':'ｴ','オ':'ｵ','カ':'ｶ','キ':'ｷ','ク':'ｸ','ケ':'ｹ','コ':'ｺ','サ':'ｻ','シ':'ｼ','ス':'ｽ','セ':'ｾ','ソ':'ｿ','タ':'ﾀ','チ':'ﾁ','ツ':'ﾂ','テ':'ﾃ','ト':'ﾄ','ナ':'ﾅ','ニ':'ﾆ','ヌ':'ﾇ','ネ':'ﾈ','ノ':'ﾉ','ハ':'ﾊ','ヒ':'ﾋ','フ':'ﾌ','ヘ':'ﾍ','ホ':'ﾎ','マ':'ﾏ','ミ':'ﾐ','ム':'ﾑ','メ':'ﾒ','モ':'ﾓ','ヤ':'ﾔ','ユ':'ﾕ','ヨ':'ﾖ','ラ':'ﾗ','リ':'ﾘ','ル':'ﾙ','レ':'ﾚ','ロ':'ﾛ','ワ':'ﾜ','ヲ':'ｦ','ン':'ﾝ','ァ':'ｧ','ィ':'ｨ','ゥ':'ｩ','ェ':'ｪ','ォ':'ｫ','ャ':'ｬ','ュ':'ｭ','ョ':'ｮ','ッ':'ｯ','ー':'ｰ','・':'･','。':'｡','、':'､','「':'｢','」':'｣','゛':'ﾞ','゜':'ﾟ'};
    const KATA_HALF_VOICED={'ガ':'ｶﾞ','ギ':'ｷﾞ','グ':'ｸﾞ','ゲ':'ｹﾞ','ゴ':'ｺﾞ','ザ':'ｻﾞ','ジ':'ｼﾞ','ズ':'ｽﾞ','ゼ':'ｾﾞ','ゾ':'ｿﾞ','ダ':'ﾀﾞ','ヂ':'ﾁﾞ','ヅ':'ﾂﾞ','デ':'ﾃﾞ','ド':'ﾄﾞ','バ':'ﾊﾞ','ビ':'ﾋﾞ','ブ':'ﾌﾞ','ベ':'ﾍﾞ','ボ':'ﾎﾞ','ヴ':'ｳﾞ'};
    const KATA_HALF_SEMI={'パ':'ﾊﾟ','ピ':'ﾋﾟ','プ':'ﾌﾟ','ペ':'ﾍﾟ','ポ':'ﾎﾟ'}; // (미사용 키 보호)
    function toHalfwidthKatakana(input){
      const kata=hiraToKata(romajiToHiragana(input)); let out='';
      for(const ch of kata){
        if(KATA_HALF_SEMI[ch]) out+=KATA_HALF_SEMI[ch];
        else if(KATA_HALF_VOICED[ch]) out+=KATA_HALF_VOICED[ch];
        else out+=KATA_HALF_BASE[ch] ?? ch;
      }
      return out;
    }

    const jpDecor = {
      underline:   (s)=>graphemes(s).map(ch=>/\s/.test(ch)?ch:(ch+'̲')).join(''),
      sparkle:     (s)=>graphemes(s).map(ch=>/\s/.test(ch)?ch:(ch+'⋆')).join(''),
      ring:        (s)=>graphemes(s).map(ch=>/\s/.test(ch)?ch:(ch+'̊')).join(''),
      tilde:       (s)=>graphemes(s).map(ch=>/\s/.test(ch)?ch:(ch+'̃')).join(''),
      heartAbove:  (s)=>graphemes(s).map(ch=>/\s/.test(ch)?ch:(ch+'ᩚ')).join(''),
      ribbon:      (s)=>graphemes(s).map(ch=>/\s/.test(ch)?ch:(ch+'ྀི')).join(''),
    };
    const JP_RANDOM_FUNCS=[(x)=>jpDecor.underline(x),(x)=>jpDecor.sparkle(x),(x)=>jpDecor.ring(x),(x)=>jpDecor.tilde(x),(x)=>jpDecor.heartAbove(x),(x)=>jpDecor.ribbon(x),(x)=>convertKanaStable(romajiToHiragana(x), stableSeedFrom('symbol:'+x)),(x)=>toCircledKatakana(x),(x)=>toHalfwidthKatakana(x)];


 const stylesJP=[
 {key:'random',fn:s=>{const fn=JP_RANDOM_FUNCS[Math.floor(random()*JP_RANDOM_FUNCS.length)];return fn(s)}},
 {key:'symbol',fn:s=>convertKana(s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)))},
 {key:'circledKatakana',fn:toCircledKatakana},{key:'halfwidthKatakana',fn:toHalfwidthKatakana},
 ...['smileDots','sparkle','ring','tilde','encloseCircle','heartAbove','heartLetter','ribbon','underline'].map(key=>stylesEN.find(s=>s.key===key))
 ];
 function results(text,language='en',revision=0){random=mulberry32(stableSeedFrom(text+':'+revision));return (language==='ja'?stylesJP:stylesEN).map(style=>({key:style.key,t:style.fn(text)}))}
 return {results};
})();
