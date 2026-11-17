"""Build crawlable localized entry points from the same app and locale data."""
from pathlib import Path
import json,re,html
root=Path(__file__).resolve().parents[1] if Path(__file__).parent.name=='scripts' else Path(__file__).resolve().parent
p=root/'dist' if (root/'dist').is_dir() else root
base='https://cutemoji.pages.dev/'
slugs=['kaomoji','text-dividers','copypasta','ascii-art','font-generator','nickname-generator','username-generator','image-to-dot-art']
keys=['feature.faces','feature.line','feature.phrases','feature.art','feature.fonts','feature.nickname','tool.username','dot.create']
labels={
'ko':['특수문자 이모티콘','꾸밈선','복붙 문구','아스키 아트','글씨체 변환','닉네임 꾸미기','아이디 생성기','이미지 도트 변환'],
'en':['Kaomoji','Text dividers','Copypasta','ASCII art','Fancy text generator','Nickname decorator','Username generator','Image to dot art'],
'ja':['顔文字','飾り罫線','コピペ文章','アスキーアート','特殊文字変換','名前デコレーター','ユーザー名生成','画像をドット文字に変換'],
'zh-CN':['颜文字','花式分隔线','复制文案','字符画','花式字体转换','昵称装饰','用户名生成器','图片转点阵字符画'],
'zh-TW':['顏文字','花式分隔線','複製文案','字元畫','花式字體轉換','暱稱裝飾','使用者名稱產生器','圖片轉點陣字元畫'],
'es':['Kaomojis','Separadores de texto','Textos para copiar','Arte ASCII','Generador de letras bonitas','Decorar apodos','Generador de nombres de usuario','Imagen a arte de puntos'],
'pt-BR':['Kaomojis','Divisórias de texto','Textos para copiar','Arte ASCII','Gerador de letras bonitas','Decorar apelidos','Gerador de nomes de usuário','Imagem para arte de pontos'],
'de':['Kaomoji','Text-Trennlinien','Texte zum Kopieren','ASCII-Kunst','Schriftgenerator','Spitznamen verzieren','Benutzernamen-Generator','Bild in Punktkunst umwandeln'],
'it':['Kaomoji','Divisori di testo','Testi da copiare','Arte ASCII','Generatore di scritte','Decora soprannomi','Generatore di nomi utente','Immagine in arte a punti'],
'fr':['Kaomojis','Séparateurs de texte','Textes à copier','Art ASCII','Générateur de texte stylé','Décorer un pseudo','Générateur de pseudos','Image en art de points'],
'vi':['Kaomoji','Đường phân cách','Văn bản để sao chép','Nghệ thuật ASCII','Tạo chữ kiểu','Trang trí biệt danh','Tạo tên người dùng','Chuyển ảnh thành ký tự chấm'],
'id':['Kaomoji','Pemisah teks','Teks untuk disalin','Seni ASCII','Pembuat teks keren','Hias nama panggilan','Pembuat nama pengguna','Ubah gambar menjadi seni titik'],
' th'.strip():['คาโอโมจิ','เส้นคั่นข้อความ','ข้อความพร้อมคัดลอก','ศิลปะ ASCII','แปลงตัวอักษรพิเศษ','ตกแต่งชื่อเล่น','สร้างชื่อผู้ใช้','แปลงภาพเป็นอักษรจุด']}
copy_desc={
'ko':'원하는 항목을 골라 복사하고 채팅이나 프로필에 붙여넣으세요. 즐겨찾기와 MY에 저장할 수 있어요.',
'en':'Choose and copy text for chats or profiles. Save favorites and your own creations in MY.',
'ja':'好きな文字をコピーしてチャットやプロフィールに貼り付け。お気に入りやMYに保存できます。',
'zh-CN':'选择并复制文字，用于聊天或个人简介。可收藏，也可在MY中保存自己的作品。',
'zh-TW':'選擇並複製文字，用於聊天或個人簡介。可加入收藏，也可在MY中儲存自己的作品。',
'es':'Elige y copia texto para chats o perfiles. Guarda favoritos y tus creaciones en MY.',
'pt-BR':'Escolha e copie textos para conversas ou perfis. Salve favoritos e suas criações no MY.',
'de':'Wähle und kopiere Texte für Chats oder Profile. Speichere Favoriten und eigene Kreationen in MY.',
'it':'Scegli e copia testi per chat o profili. Salva preferiti e creazioni personali in MY.',
'fr':'Choisissez et copiez du texte pour vos discussions ou profils. Enregistrez vos favoris et créations dans MY.',
'vi':'Chọn và sao chép văn bản cho tin nhắn hoặc hồ sơ. Lưu mục yêu thích và tác phẩm riêng trong MY.',
'id':'Pilih dan salin teks untuk obrolan atau profil. Simpan favorit dan kreasi sendiri di MY.',
' th'.strip():'เลือกและคัดลอกข้อความสำหรับแชตหรือโปรไฟล์ บันทึกรายการโปรดและผลงานของคุณใน MY'}
dot_desc={
'ko':'사진이나 이미지를 복사 가능한 점자 도트 아트로 변환하세요. 크기, 명암, 반전을 조절하고 MY에 저장할 수 있어요.',
'en':'Convert an image into copyable Braille dot art. Adjust size, contrast and inversion, then save to MY.',
'ja':'画像をコピーできる点字アートに変換。サイズ、明暗、反転を調整してMYに保存できます。',
'zh-CN':'将图片转换为可复制的盲文点阵字符画。调整大小、明暗与反色，并保存到MY。',
'zh-TW':'將圖片轉換為可複製的點字字元畫。調整大小、明暗與反色，並儲存至MY。',
'es':'Convierte imágenes en arte de puntos Braille para copiar. Ajusta tamaño, contraste e inversión y guarda en MY.',
'pt-BR':'Converta imagens em arte com pontos Braille para copiar. Ajuste tamanho, contraste e inversão e salve no MY.',
'de':'Wandle Bilder in kopierbare Braille-Punktkunst um. Passe Größe, Kontrast und Umkehrung an und speichere in MY.',
'it':'Converti immagini in arte a punti Braille da copiare. Regola dimensioni, contrasto e inversione e salva in MY.',
'fr':'Transformez une image en art de points Braille à copier. Réglez taille, contraste et inversion, puis enregistrez dans MY.',
'vi':'Chuyển ảnh thành nghệ thuật ký tự chấm Braille để sao chép. Chỉnh kích thước, độ tương phản, đảo màu và lưu vào MY.',
'id':'Ubah gambar menjadi seni titik Braille yang bisa disalin. Atur ukuran, kontras, dan inversi, lalu simpan ke MY.',
' th'.strip():'แปลงภาพเป็นศิลปะอักษรเบรลล์ที่คัดลอกได้ ปรับขนาด ความคมชัด และสลับสี แล้วบันทึกใน MY'}
esc=lambda x:html.escape(str(x),quote=True)
locales={}
meta={}
for lang,names in labels.items():
 f=p/'locales'/f'{lang}.json';d=json.loads(f.read_text())
 d.update(zip(keys,names));d['tool.decorate']=names[5]
 d['meta.title']=names[0]+' · '+names[4]+' | cutemoji';d['meta.description']=' · '.join(names[:6])+'. '+copy_desc[lang]
 f.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');locales[lang]=d
 meta[lang]={slug:{'title':names[i]+' | cutemoji','description':(dot_desc[lang] if i==7 else names[i]+'. '+(d['tool.fontNote'] if i==4 else d['tool.nameNote'] if i==5 else d['tool.idNote'] if i==6 else copy_desc[lang]))} for i,slug in enumerate(slugs)}
(p/'seo-data.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
# The JS data files contain JSON assignments only.
items=json.loads((p/'data.js').read_text().split('=',1)[1].strip().rstrip(';'))
collections=json.loads((p/'collections-data.js').read_text().split('=',1)[1].strip().rstrip(';'))
template=(p/'index.html').read_text()
template=re.sub(r'<base[^>]*>','',template)
template=re.sub(r'<link[^>]*rel="alternate"[^>]*>','',template)
template=re.sub(r'<nav class="locale-links".*?</nav>','',template,flags=re.S)
# Replace metadata as a whole to avoid stale crawler-only duplicates.
template=re.sub(r'<title[^>]*>.*?</title>','',template)
template=re.sub(r'<meta[^>]*(?:name="(?:description|twitter:[^"]+)"|property="og:[^"]+")[^>]*>','',template)
template=re.sub(r'<link[^>]*rel="canonical"[^>]*>','',template)
template=re.sub(r'<script type="application/ld\+json">.*?</script>','',template)
feature_slugs=slugs[:6]
def render(lang,slug,root=False):
 d=locales[lang];m=meta[lang][slug];url=base+lang+'-'+slug+'.html'
 s=re.sub(r'<html[^>]*>',f'<html lang="{lang}" data-locale="{lang}" data-page="{slug}">',template,1)
 head=('<base href="./">' if root else '<base href="./">')+'<title>'+esc(m['title'])+'</title><meta name="description" content="'+esc(m['description'])+'"><link rel="canonical" href="'+url+'">'
 head+='<meta property="og:type" content="website"><meta property="og:title" content="'+esc(m['title'])+'"><meta property="og:description" content="'+esc(m['description'])+'"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+base+'share-image.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+esc(m['title'])+'"><meta name="twitter:description" content="'+esc(m['description'])+'"><meta name="twitter:image" content="'+base+'share-image.png">'
 head+=''.join('<link rel="alternate" hreflang="'+l+'" href="'+base+l+'-'+slug+'.html">' for l in labels)+'<link rel="alternate" hreflang="x-default" href="'+base+'en-'+slug+'.html">'
 schema={'@context':'https://schema.org','@type':'WebApplication','name':m['title'],'url':url,'description':m['description'],'inLanguage':lang,'applicationCategory':'UtilitiesApplication','operatingSystem':'Any','isAccessibleForFree':True,'creator':{'@type':'Organization','name':'thenovary'}}
 head+='<script type="application/ld+json">'+json.dumps(schema,ensure_ascii=False)+'</script>'
 s=s.replace('<head>','<head>'+head,1)
 # Translate visible fallback strings and accessible labels before JavaScript loads.
 s=re.sub(r'(<([\w-]+)[^>]*data-i18n="([^"]+)"[^>]*>)[^<]*(</\2>)',lambda m:m[1]+esc(d.get(m[3],m[3]))+m[4],s)
 s=re.sub(r'data-i18n-aria="([^"]+)" aria-label="[^"]*"',lambda m:'data-i18n-aria="'+m[1]+'" aria-label="'+esc(d.get(m[1],m[1]))+'"',s)
 s=re.sub(r'<noscript>.*?</noscript>','',s)
 nav=''.join('<a data-feature="'+feature+'" href="'+lang+'-'+route+'.html">'+esc(d['feature.'+feature])+'</a>' for feature,route in zip(['faces','line','phrases','art','fonts','nickname'],feature_slugs))+'<button data-feature="my">MY</button>'
 s=re.sub(r'(<nav id="features"[^>]*>).*?(</nav>)',lambda m:m[1]+nav+m[2],s,flags=re.S)
 # Language selection is handled by the existing select; hreflang and sitemap expose alternates.
 # Every generated public route has real content or its real input controls.
 texts=[x['t'] for x in items[:60]] if slug=='kaomoji' else collections['line'][:60] if slug=='text-dividers' else collections['phrases'][:30] if slug=='copypasta' else (collections['ascii'][:12]+collections['dot'][:8]) if slug=='ascii-art' else []
 cards=''.join('<article class="card'+(' art-card' if slug=='ascii-art' else ' phrase-card' if slug=='copypasta' else '')+'"><button class="copy" aria-label="'+esc(d['a11y.copy'].replace('{text}',t))+'"><span class="expression">'+esc(t)+'</span></button></article>' for t in texts)
 s=re.sub(r'(<div id="grid" class="grid">).*?(</div>)',lambda m:m[1]+cards+m[2],s,flags=re.S)
 s=re.sub(r'(<strong id="categorytitle">).*?(</strong>)',lambda m:m[1]+esc(labels[lang][slugs.index(slug)])+m[2],s,flags=re.S)
 if slug in slugs[4:7]:
  s=s.replace('id="generator" class="generator" hidden','id="generator" class="generator"')
  key='tool.fontInput' if slug==slugs[4] else 'tool.nameInput' if slug==slugs[5] else 'tool.idInput'
  s=s.replace('<label id="generator-label" for="generator-input"></label>','<label id="generator-label" for="generator-input">'+esc(d[key])+'</label>')
  s=s.replace('<p id="generator-note"></p>','<p id="generator-note">'+esc(d['tool.fontNote' if slug==slugs[4] else 'tool.nameNote' if slug==slugs[5] else 'tool.idNote'])+'</p>')
 if slug==slugs[7]:s=s.replace('id="dot-maker" hidden','id="dot-maker"')
 if root:s=s.replace(' data-locale="ko"','',1)
 for attr,val,route in [('data-art','create','image-to-dot-art'),('data-mode','decor','nickname-generator'),('data-mode','id','username-generator')]:
  s=re.sub(r'<(?:button|a) '+attr+'="'+val+r'"[^>]*>(.*?)</(?:button|a)>',lambda m:'<a '+attr+'="'+val+'" data-i18n="'+keys[slugs.index(route)]+'" data-seo-page="'+route+'" href="'+lang+'-'+route+'.html">'+esc(labels[lang][slugs.index(route)])+'</a>',s)
 return s
# JS receives metadata synchronously before app startup; no extra fetch/race.
runtime=(Path(__file__).parent/'seo-runtime.js').read_text()
(p/'seo.js').write_text('window.CutemojiSEOMeta='+json.dumps(meta,ensure_ascii=False)+';\n'+runtime)
for lang in labels:
 for slug in slugs:
  (p/(lang+'-'+slug+'.html')).write_text(render(lang,slug))
(p/'index.html').write_text(render('ko','kaomoji',True))
urls=[base+l+'-'+s+'.html' for l in labels for s in slugs]+[base+'guide.html',base+'privacy.html']
(p/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join('<url><loc>'+u+'</loc></url>\n' for u in urls)+'</urlset>\n')
(p/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+base+'sitemap.xml\n')
print(f'Built {len(labels)*len(slugs)} localized feature pages and sitemap')
