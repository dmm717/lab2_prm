#!/usr/bin/env python3
"""Verify local submission evidence and the saved Figma audit; no external writes."""
from pathlib import Path
import json, re, struct, sys
ROOT = Path(__file__).resolve().parents[1]
errors=[]
def check(condition, message):
    if not condition: errors.append(message)
required=['README.md','Lab2_Checklist_ChiTiet.md','ux/persona.md','ux/user-flow.md','design/DESIGN.md','design/design-decisions.md','design/screen-spec.md','handoff/flutter-handoff.md','handoff/prototype-guide.md','handoff/completion-status.md','ai/ai-design-log.md','design/figma-build-state.json','design/figma-prototype-audit.json','assets/figma/manifest.json']
for name in required: check((ROOT/name).is_file(), 'Missing '+name)
for path in ROOT.rglob('*.md'):
    if '.git' in path.parts: continue
    for target in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)',path.read_text()):
        target=target.split(' "')[0]
        if target.startswith(('http:','https:','app:','#','mailto:','skill:')): continue
        target=target.split('#')[0]
        if target: check((path.parent/target).exists(), f'Broken link {path.relative_to(ROOT)} → {target}')
readme=(ROOT/'README.md').read_text()
check('SE192336' in readme and 'Huỳnh Thiện Nhân' in readme,'Missing student identity')
check('<Điền' not in readme and 'Link Figma của dự án tại đây' not in readme,'README contains placeholder')
state=json.loads((ROOT/'design/figma-build-state.json').read_text())
frames=state['finalUI']['screens']
check(len(frames)==8,'Need exactly 8 new final screens')
check(all(f['w']==360 and f['h']==800 and f['instances']>0 for f in frames),'Final screen sizing or component instances invalid')
audit=json.loads((ROOT/'design/figma-prototype-audit.json').read_text())
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
manifest=json.loads((ROOT/'assets/figma/manifest.json').read_text())
for f in manifest['files']:
    path=ROOT/'assets/figma'/f"{f['name']}.{f['format']}"
    check(path.is_file(),'Missing exported asset '+path.name)
    if not path.exists(): continue
    data=path.read_bytes()
    check(data[:8]==b'\x89PNG\r\n\x1a\n','Invalid PNG '+path.name)
    if f['name'][:2] in {'01','02','03','04','05','06','07','08'} and len(data)>24:
        check(struct.unpack('>II',data[16:24])==(360,800),'Wrong PNG screen dimensions '+path.name)
check(len(list((ROOT/'assets/stitch').glob('*.png')))>=11,'Missing original/refinement AI screenshots')
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
(ROOT/'design/accessibility-report.md').write_text(report)
if errors:
    print('\n'.join('FAIL: '+e for e in errors));sys.exit(1)
print(f'PASS: {len(required)} required files, {len(frames)} final screens, {len(audit["frames"])} prototype frames, {len(audit["reactions"])} reactions, {len(manifest["files"])} Figma exports, 8 contrast pairs.')
print('External submission status and Contrast plugin completion remain tracked separately.')
