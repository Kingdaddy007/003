import re

with open('C:/Users/godsw/ANTIGRAVITY  WORKSPACE/003/studio-bespoke-inception/portfolio_gallery.md', 'r', encoding='utf-8') as f:
    content = f.read()
urls = re.findall(r'\((https://studiobespoke.design/wp-content/uploads/.*?)\)', content)

html = '''<html>
<head>
<style>
  body { background: #111; color: white; font-family: sans-serif; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 10px; }
  .item { position: relative; }
  .item img { width: 100%; height: 300px; object-fit: cover; }
  .label { position: absolute; top: 5px; left: 5px; background: rgba(0,0,0,0.8); padding: 5px; font-size: 20px; font-weight: bold; color: yellow; }
</style>
</head>
<body>
<div class="grid">'''

indices = [13, 27, 39, 44, 60, 81, 106, 128, 142, 168, 185, 203, 222, 238, 253, 271, 288, 117, 24, 73]
for i in indices:
    if i < len(urls):
        html += f'<div class="item"><div class="label">ID {i}</div><img src="{urls[i]}" /></div>\n'

html += '</div></body></html>'

with open('C:/Users/godsw/ANTIGRAVITY  WORKSPACE/003/studio-bespoke-next/scratch_gallery.html', 'w', encoding='utf-8') as f:
    f.write(html)
