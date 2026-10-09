#!/usr/bin/env python3
"""Verify local submission evidence and the saved Figma audit; no external writes."""
from pathlib import Path
import hashlib, json, re, struct, sys
import argparse
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument("--write-report", action="store_true", help="Regenerate the token contrast report; does not certify Figma checks")
args=parser.parse_args()
ROOT = Path(__file__).resolve().parents[1]
errors=[]
def check(condition, message):
    if not condition: errors.append(message)
required=['README.md','Lab2_Checklist_ChiTiet.md','ux/persona.md','ux/user-flow.md','design/DESIGN.md','design/design-decisions.md','design/screen-spec.md','handoff/flutter-handoff.md','handoff/prototype-guide.md','handoff/completion-status.md','ai/ai-design-log.md','design/figma-build-state.json','design/figma-prototype-audit.json','assets/figma/manifest.json']
required += ['ai/critique-2026-10-08.md','ai/critique-evidence-2026-10-08.json','ai/stitch-prompt-next.md','design/implementation-plan.md','presentation/canva-link.md','presentation/presenter-guide.md']
for name in required: check((ROOT/name).is_file(), 'Missing '+name)
for path in ROOT.rglob('*.md'):
    if '.git' in path.parts: continue
    for target in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)',path.read_text(encoding="utf-8")):
        target=target.split(' "')[0]
        if target.startswith(('http:','https:','app:','#','mailto:','skill:')): continue
        target=target.split('#')[0]
        if target: check((path.parent/target).exists(), f'Broken link {path.relative_to(ROOT)} → {target}')
readme=(ROOT/'README.md').read_text(encoding="utf-8")
check('SE192336' in readme and 'Huỳnh Thiện Nhân' in readme,'Missing student identity')
check('SE192382' in readme and 'Lã Gia Huy' in readme,'Missing second confirmed member')
evidence=json.loads((ROOT/'ai/critique-evidence-2026-10-08.json').read_text(encoding='utf-8'))
critique=(ROOT/evidence['output']).read_text(encoding='utf-8')
issue_ids=set(re.findall(r'\| (UX\d+) \|',critique))
check(len(issue_ids)>=5,'New AI critique must contain at least five specific findings')
check(issue_ids==set(evidence['issue_ids']),'AI critique issue IDs differ from evidence record')
for image_record in evidence['inspected_images']:
    image_path=(ROOT/image_record['path']).resolve()
    check(image_path.is_relative_to(ROOT.resolve()),'AI evidence path escapes repository')
    if image_path.is_file():
        check(hashlib.sha256(image_path.read_bytes()).hexdigest()==image_record['sha256'],'AI evidence image changed: '+image_record['path'])
    else: check(False,'AI evidence image missing: '+image_record['path'])
for number in range(1,9):
    text=(ROOT/'handoff/flutter-handoff.md').read_text(encoding='utf-8')
    screen=text.split(f'## Màn hình {number:02d} —',1)
    check(len(screen)==2,f'Missing handoff screen {number:02d}')
    if len(screen)==2:
        body=screen[1].split('\n## ',1)[0]
        for section in ['Layout','Components','States','Interactions','Navigation','UI constraints']:
            check(f'**{section}:**' in body,f'Missing {section} for screen {number:02d}')
check('<Điền' not in readme and 'Link Figma của dự án tại đây' not in readme,'README contains placeholder')
state=json.loads((ROOT/'design/figma-build-state.json').read_text(encoding="utf-8"))
frames=state['finalUI']['screens']
check(len(frames)==8,'Need exactly 8 new final screens')
check(all(f['w']==360 and f['h']==800 and f['instances']>0 for f in frames),'Final screen sizing or component instances invalid')
audit=json.loads((ROOT/'design/figma-prototype-audit.json').read_text(encoding="utf-8"))
check(len(audit['start'])==3,'Need 3 flow starting points')
check(all(any(c['main']=='44:2124' for c in f.get('components',[])) for f in audit['frames']), 'Every prototype needs the original iOS status component')
check(all(c.get('sourcePage')=='1:5' for f in audit['frames'] for c in f.get('components',[])), 'Component origin must be 05. Components')
check(not audit['issues'],f'Figma audit issues: {audit["issues"]}')
frame_ids={f['id'] for f in audit['frames']}
check(all(r['target'] in frame_ids for r in audit['reactions']),'Reaction destination missing from prototype page')
check(all(f['width']==360 and f['height']==800 for f in audit['frames']),'Invalid prototype frame size')
check(any(r['trigger']=='AFTER_TIMEOUT' for r in audit['reactions']),'Missing timed loading transition')
check(all(f.get('hasSwipeIndicator') for f in audit['frames']), 'Missing iOS swipe indicator')
check(all(f.get('fixedChildren',0)>=2 for f in audit['frames']), 'Missing fixed screen chrome')
check(all(f.get('contentScrolling')=='VERTICAL' for f in audit['frames'] if f.get('contentBottom') is not None), 'Content must scroll independently')
check(len(audit['styles'])==6 and min(s['size'] for s in audit['styles'])>=14,'Invalid text styles')
varids={v['id'] for v in audit['variables']}
for v in audit['variables']:
    check('ALL_SCOPES' not in v['scopes'],'Overbroad variable scope: '+v['name'])
    for val in v['values'].values():
        if isinstance(val,dict) and val.get('type')=='VARIABLE_ALIAS': check(val['id'] in varids,'Broken alias: '+v['name'])
manifest=json.loads((ROOT/'assets/figma/manifest.json').read_text(encoding="utf-8"))
for f in manifest['files']:
    path=ROOT/'assets/figma'/f"{f['name']}.{f['format']}"
    check(path.is_file(),'Missing exported asset '+path.name)
    if not path.exists(): continue
    data=path.read_bytes()
    check(data[:8]==b'\x89PNG\r\n\x1a\n','Invalid PNG '+path.name)
    if f['name'][:2] in {'01','02','03','04','05','06','07','08'} and len(data)>24:
        check(struct.unpack('>II',data[16:24])==(360,800),'Wrong PNG screen dimensions '+path.name)
check(len(list((ROOT/'assets/stitch').glob('*.png')))>=11,'Missing saved AI screenshots (provenance checked separately)')
def lum(color):
    vals=[int(color[i:i+2],16)/255 for i in (1,3,5)]
    vals=[v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4 for v in vals]
    return sum(a*b for a,b in zip(vals,[0.2126,0.7152,0.0722]))
def contrast(a,b):
    x,y=sorted([lum(a),lum(b)])
    return (y+0.05)/(x+0.05)
pairs=[('CTA/menu selected','#FFFFFF','#006C49'),('Chữ chính trên thẻ','#131B2E','#FFFFFF'),('Chữ trên nền','#131B2E','#FAF8FF'),('Chữ phụ trên thẻ','#52625C','#FFFFFF'),('Chữ phụ trên nền xanh','#52625C','#E8F7EF'),('Khoản chi','#BA1A1A','#FFFFFF'),('Thông báo lỗi','#BA1A1A','#FFDAD6'),('Feedback thành công','#006C49','#E8F7EF')]
rows=[]
for label,fg,bg in pairs:
    ratio=contrast(fg,bg);check(ratio>=4.5,'Low contrast '+label)
    rows.append(f'| {label} | {fg} | {bg} | {ratio:.2f}:1 | {"Pass" if ratio>=4.5 else "Fail"} |')
live=json.loads((ROOT/'design/figma-live-audit-2026-10-09.json').read_text(encoding='utf-8'))
responsive=json.loads((ROOT/'design/figma-responsive-audit-2026-10-09.json').read_text(encoding='utf-8'))
new_exports=json.loads((ROOT/'assets/figma/2026-10-09/manifest.json').read_text(encoding='utf-8'))
check(len(responsive['pages'])==6,'Live Figma must retain six pages')
for width in (360,412):
    screens=[f for f in responsive['frames'] if f['w']==width]
    check(len(screens)==8,f'Need eight live screens at {width}')
    for f in screens:
        check(f['innerWidth']==width-32 and f['padding']==16,'Incorrect fluid margins: '+f['name'])
        check(f['minText']>=14 and f['instanceCount']>0,'Small text or no instances: '+f['name'])
        for row in f['grid']:
            check(max(c['width'] for c in row)-min(c['width'] for c in row)<0.01,'Unequal category columns')
            check(all(c['sizing']=='FILL' for c in row),'Category grid must use Fill sizing')
check(len(new_exports['files'])==20,'Need twenty new Figma exports')
for item in new_exports['files']:
    image_path=(ROOT/item['path']).resolve()
    check(image_path.is_relative_to(ROOT.resolve()),'New export path escapes repository')
    if image_path.is_file():
        data=image_path.read_bytes()
        check(hashlib.sha256(data).hexdigest()==item['sha256'],'New image hash mismatch: '+item['path'])
        check(data[:8]==bytes([137,80,78,71,13,10,26,10]),'Invalid new PNG')
        check(struct.unpack('>II',data[16:24])==(item['width'],item['height']),'New PNG size mismatch')
    else: check(False,'Missing new export: '+item['path'])
live_frames={f['id']:f for f in live['frames']}
check(len(live['start'])==3,'Live prototype needs three starting points')
check(all(not f['smallText'] for f in live['frames']),'Live prototype contains small text')
edges={k:set() for k in live_frames}
overlay_origins=set()
for f in live['frames']:
    for r in f['reactions']:
        if r['type']=='NODE':
            check(r['target'] in live_frames,'Missing live destination')
            edges[f['id']].add(r['target'])
            if r.get('nav')=='OVERLAY':overlay_origins.add(f['id'])
        if r['trigger']=='ON_CLICK' and r['type'] in ('NODE','CLOSE'):
            check(r['w']>=48 and r['h']>=48,'Small interactive target: '+r['node'])
check(overlay_origins=={'65:321','65:353'},'Invalid forms must open the overlay')
check(sum(r['type']=='CLOSE' for r in live_frames[live['overlay']]['reactions'])==2,'Overlay needs Retry and background Close')
edges[live['overlay']].update(overlay_origins)
check(any(r.get('target')=='65:321' for r in live_frames[live['empty']]['reactions']),'Empty CTA must reach Add')
visited=set();todo=[x['nodeId'] for x in live['start']]
while todo:
    node=todo.pop()
    if node in visited:continue
    visited.add(node);todo.extend(edges.get(node,set())-visited)
check(set(live_frames)-visited==set(live['referenceFrames']),'Unexpected unreachable live frames')
check(all(edges[k] for k in visited),'Reachable frame has no exit')
check(contrast('#73867A','#FFFFFF')>=3 and contrast('#73867A','#FAF8FF')>=3,'Input boundary contrast below 3:1')
report='''# Kiểm tra accessibility — 04/10/2026

Đo các cặp màu nội dung dùng trong bộ final mới bằng relative luminance sRGB. Đây là kiểm tra tính toán theo tokens, **không phải kết quả chạy plugin Contrast**, không chứng minh toàn bộ ứng dụng đạt WCAG.

| Vai trò | Chữ | Nền | Tỷ lệ | AA chữ thường ≥4,5:1 |
|---|---|---|---|---|
'''+ '\n'.join(rows)+f'''

- Audit Figma: {len(frames)} final screens 360×800, {len(audit['frames'])} prototype frames 360×800, {len(audit['reactions'])} navigation reactions, 3 starting points.
- 39 foundation variables + 2 prototype variables; 6 Inter text styles, nhỏ nhất 14px.
- Prototype audit: chữ nội dung ≥14px và không vượt vùng content. Label tab bar iOS giữ 11px như Final UI Overview theo yêu cầu người dùng; ngoại lệ được ghi trong audit. Các frame cũ không nằm trong audit này.
- Button 324×52, font 16px; input 324×80, amount 324×116; Back 48×48; tab bar 4 tabs, height 49px + bottom safe area 34px; category tile 100×100. Status bar iOS 59px và navigation bar 56px dùng component gốc.
- Mục tiêu <10 giây chưa được usability test. Responsive 412px, assistive technology và bàn phím thật chưa được kiểm tra.
- Màu accent #10B981 dùng làm tham chiếu/trang trí, không dùng nền nút chữ trắng. Contrast trắng/accent chỉ {contrast('#FFFFFF','#10B981'):.2f}:1 nên không đạt chữ thường.
'''
if args.write_report:
    table='# Contrast calculation — 2026-10-09\n\n| Role | Foreground | Background | Ratio | Text AA |\n|---|---|---|---|---|\n'+'\n'.join(rows)
    table+=f"\n\nInput boundary #73867A / white: {contrast('#73867A','#FFFFFF'):.2f}:1 (control threshold3:1).\n"
    (ROOT/'design/contrast-calculation-2026-10-09.md').write_text(table, encoding='utf-8')
if errors:
    print('\n'.join('FAIL: '+e for e in errors));sys.exit(1)
print(f'PASS: {len(required)} required files, {len(frames)} final screens, {len(audit["frames"])} prototype frames, {len(audit["reactions"])} reactions, {len(manifest["files"])} Figma exports, 8 contrast pairs.')
print(f'Live saved evidence: {len(responsive["frames"])} frames at360/412, {len(live_frames)} prototype frames, OVERLAY/CLOSE recovery, {len(new_exports["files"])} hash-verified new PNGs.')
print('Structure and saved screenshot checks; Present, long content, AI provenance and external Figma permissions remain unverified.')
