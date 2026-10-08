// Run once per page: set targetPageId to 1:3 (Final UI) or 1:6 (Prototype).
// Reuses original StudentPay components from 05. Components, preserving reactions.
const page = await figma.getNodeByIdAsync(targetPageId);
await figma.setCurrentPageAsync(page);
const roots = page.children.filter(n => n.type === 'FRAME' && (n.name.startsWith('Lab2 /') || n.name.startsWith('Prototype /')));
const ids = [], removedNodeIds = [], counts = {};
const componentIds = ['44:2124','44:1648','44:1650','44:1652','44:1810','44:1937','44:1947','44:1957','44:1977','44:1987','44:1999','44:2004','44:2014','44:2034'];
const comps = {};
for (const id of componentIds) comps[id] = await figma.getNodeByIdAsync(id);
const fonts = new Map();
for (const n of [...roots, ...Object.values(comps)]) for (const t of n.findAllWithCriteria({types:['TEXT']})) for (const s of t.getStyledTextSegments(['fontName'])) fonts.set(JSON.stringify(s.fontName), s.fontName);
for (const f of fonts.values()) await figma.loadFontAsync(f);
const vars = await figma.variables.getLocalVariablesAsync();
function changed(n) { ids.push(n.id); return n; }
function count(key) { counts[key] = (counts[key] || 0) + 1; }
function color(n, key) {
  const v = vars.find(v => v.name === 'color/' + key);
  if (v) { n.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v)]; changed(n); }
}
async function copyText(to, from) {
  if (from.boundVariables.characters) await to.setBoundVariable('characters', await figma.variables.getVariableByIdAsync(from.boundVariables.characters.id));
  else to.characters = from.characters;
  changed(to);
}
for (const root of roots) {
  let status = root.children.find(n => n.name === 'Status');
  if (!status || status.type !== 'INSTANCE') {
    const next = changed(comps['44:2124'].createInstance());
    root.insertChild(0, next); next.name = 'Status'; next.resize(360,59);
    if (!status) { next.layoutPositioning = 'ABSOLUTE'; next.x = 0; next.y = 0; }
    if (status) { removedNodeIds.push(status.id); status.remove(); }
    count('status');
  }
  const header = root.children.find(n => n.name === 'Header');
  if (header && header.type === 'FRAME') {
    const back = header.children.find(n => n.name === 'Back');
    const title = header.children.find(n => n.type === 'TEXT');
    const next = changed(comps[back ? '44:2004' : '44:1999'].createInstance());
    root.insertChild(root.children.indexOf(header), next); next.name = 'Header'; next.resize(360,56);
    const tx = next.findOne(n => n.type === 'TEXT' && n.name === 'Screen title');
    if (title) await copyText(tx,title);
    const action = next.children.find(n => n.name === 'Navigation action');
    if (action) { action.visible = false; changed(action); }
    const nb = next.children.find(n => n.name === 'Back action');
    if (nb && back) { nb.name = 'Back'; nb.resize(48,48); await nb.setReactionsAsync(JSON.parse(JSON.stringify(back.reactions))); changed(nb); }
    removedNodeIds.push(header.id); header.remove(); count('header');
  }
  // Snapshot before swapComponent changes descendants. Stable instance IDs retain outer reactions.
  const instances = root.findAllWithCriteria({types:['INSTANCE']});
  for (const n of instances) {
    if (n.removed || !n.visible) continue;
    const main = await n.getMainComponentAsync();
    const texts = n.findAllWithCriteria({types:['TEXT']});
    const data = texts.map(t => ({name:t.name,characters:t.characters,boundVariables:t.boundVariables}));
    const w = n.width, h = n.height, name = n.name;
    if (['57:2','57:3','57:4'].includes(main.id)) {
      const label = data.find(t => t.name === 'Label');
      n.swapComponent(comps[{'57:2':'44:1648','57:3':'44:1650','57:4':'44:1652'}[main.id]]);
      n.resize(w,h); n.name = name;
      const t = n.findOne(t => t.type === 'TEXT');
      if (label) await copyText(t,label);
      changed(n); count('button');
    } else if (['57:84','57:85'].includes(main.id)) {
      n.swapComponent(comps['44:1810']); n.resize(w,h); n.name = name;
      n.paddingTop = n.paddingBottom = n.paddingLeft = n.paddingRight = 0; n.itemSpacing = 8;
      const label = n.children[0], surface = n.children[1], help = n.children[2];
      label.name = 'Caption'; label.fontSize = 14; label.lineHeight = {unit:'PIXELS',value:20};
      const value = surface.findOne(t => t.type === 'TEXT'); value.name = 'Label';
      help.visible = false;
      const captionData = data.find(t => t.name === 'Caption');
      if (captionData) await copyText(label,captionData);
      else { label.visible = false; n.itemSpacing = 0; }
      await copyText(value,data.find(t => t.name === 'Label'));
      // Compact analytics rows retain both lines at 52px; form fields retain 52px input surface.
      surface.resize(w,52); surface.layoutSizingVertical = 'FIXED';
      surface.paddingTop = surface.paddingBottom = 14;
      value.textAutoResize = 'HEIGHT'; value.resize(w-32,24); value.layoutSizingHorizontal = 'FILL';
      changed(n); changed(label); changed(surface); changed(help); count('field');
    } else if (['57:58','57:59'].includes(main.id)) {
      const title = data.find(t => t.name === 'Title'), meta = data.find(t => t.name === 'Meta'), value = data.find(t => t.name === 'Value');
      const match = /trọ|thuê/i.test(title.characters) ? '44:1947' : /Cà phê/i.test(title.characters) ? '44:1957' : /chuyển|xe|bus/i.test(title.characters) ? '44:1987' : main.id === '57:59' ? '44:1977' : '44:1937';
      n.swapComponent(comps[match]); n.resize(w,h); n.name = name;
      n.paddingTop = n.paddingBottom = 10; n.paddingLeft = n.paddingRight = 8; n.itemSpacing = 8;
      const details = n.children.find(c => c.name === 'Transaction details');
      const amounts = n.children.find(c => c.name === 'Amount details'); amounts.resize(92,40);
      for (const [key,d] of [['Title',title],['Metadata',meta],['Amount',value]]) {
        const t = n.findOne(t => t.type === 'TEXT' && t.name === key); await copyText(t,d);
        t.fontSize = 14; t.textAutoResize = 'HEIGHT';
        if (key === 'Metadata') { t.name = 'Meta'; t.lineHeight = {unit:'PIXELS',value:20}; }
        if (key === 'Amount') { t.name = 'Value'; color(t,main.id === '57:59' ? 'primary' : 'danger'); }
      }
      const breakdown = amounts.findOne(t => t.type === 'TEXT' && t.name === 'Split breakdown'); breakdown.visible = false;
      n.primaryAxisSizingMode = 'FIXED'; n.counterAxisSizingMode = 'FIXED'; n.resize(w,h);
      details.layoutSizingHorizontal = 'FILL'; amounts.layoutSizingHorizontal = 'FIXED'; amounts.resize(92,40);
      changed(n); changed(details); changed(amounts); changed(breakdown); count('transaction');
    } else if (['57:24','57:25','57:26'].includes(main.id)) {
      const oldTabs = n.children[0].children.map(t => ({name:t.name,reactions:JSON.parse(JSON.stringify(t.reactions))}));
      const selected = {'57:24':'Home','57:25':'Analytics','57:26':'Split'}[main.id];
      n.swapComponent(comps[selected === 'Analytics' ? '44:2034' : '44:2014']); n.resize(360,83); n.name = name;
      const tabs = n.children[0].children;
      const keys = ['Home','Split','Analytics']; const labels = ['Tổng quan','Chia tiền','Thống kê'];
      tabs[3].visible = false; changed(tabs[3]);
      for (let i=0;i<3;i++) {
        const tab = tabs[i]; tab.name = 'Tab/' + keys[i];
        const t = tab.findOne(t => t.type === 'TEXT'); t.characters = labels[i]; t.fontSize = 14; t.lineHeight = {unit:'PIXELS',value:20}; changed(t);
        await tab.setReactionsAsync(oldTabs.find(t => t.name === tab.name)?.reactions || []);
        color(tab, keys[i] === selected ? 'soft' : 'surface');
        for (const child of tab.findAllWithCriteria({types:['TEXT','VECTOR']})) color(child,keys[i] === selected ? 'primary' : 'muted');
        changed(tab);
      }
      n.children[0].resize(360,49); changed(n.children[0]); changed(n); count('tabbar');
    }
  }
  const content = root.children.find(n => n.name === 'Content');
  if (content) { const nav = root.children.find(n => n.name === 'Bottom nav'); content.resize(360,nav ? 602 : 605); content.itemSpacing = 8; changed(content); }
  changed(root);
}
const screens = [];
for (const n of roots) {
  const instances = [];
  for (const i of n.findAllWithCriteria({types:['INSTANCE']})) { const m = await i.getMainComponentAsync(); instances.push({id:i.id,name:i.name,main:m.id}); }
  const content = n.children.find(n => n.name === 'Content');
  screens.push({id:n.id,name:n.name,w:n.width,h:n.height,instances:instances.length,components:instances,contentBottom:content ? Math.max(...content.children.filter(n=>n.visible).map(n=>n.y+n.height)) : null,contentHeight:content?.height});
}
return {createdOrMutatedNodeIds:[...new Set(ids)],removedNodeIds,counts,screens};
