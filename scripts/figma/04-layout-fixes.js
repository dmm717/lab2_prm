const page=await figma.getNodeByIdAsync(PAGE_ID);await figma.setCurrentPageAsync(page);
const roots=page.children.filter(n=>n.name.startsWith('Lab2 /')||n.name.startsWith('StudentPay/Lab2'));
for(const root of roots){
for(const n of root.findAllWithCriteria({types:['TEXT']})){n.resize(n.width,n.lineHeight.unit==='PIXELS'?n.lineHeight.value:24);n.textAutoResize='HEIGHT';ids.push(n.id);}
for(const n of root.findAllWithCriteria({types:['FRAME']})){if(n.layoutMode==='HORIZONTAL'&&['Tabs','Transaction','Member','Category row'].includes(n.name)){n.counterAxisSizingMode='AUTO';n.primaryAxisSizingMode='FIXED';ids.push(n.id);}if(n.name==='Name & state'){n.resize(176,n.height);for(const t of n.children){if(t.type==='TEXT'){t.resize(176,t.height);t.textAutoResize='HEIGHT';ids.push(t.id);}}ids.push(n.id);}}
if(root.type==='COMPONENT_SET'){for(const c of root.children){if(root.name.endsWith('Amount')){c.resize(324,128);ids.push(c.id);}if(root.name.endsWith('Field')){c.resize(324,80);ids.push(c.id);}if(root.name.endsWith('Transaction')){c.resize(324,64);ids.push(c.id);}}}
if(root.type==='FRAME'&&root.name==='Lab2 / 01 Home'){
const progress=root.findOne(n=>n.name==='Budget progress');if(progress){const bars=progress.children.filter(n=>n.type==='RECTANGLE');if(bars.length===2){const holder=keep(figma.createFrame());progress.appendChild(holder);holder.resize(292,8);fill(holder,null);for(const bar of bars){holder.appendChild(bar);bar.x=0;bar.y=0;ids.push(bar.id);}ids.push(progress.id);}}
}
if(root.type==='FRAME'&&root.name==='Lab2 / 04 Analytics'){
const chart=root.findOne(n=>n.name==='Donut chart');chart.resize(324,168);for(const e of chart.children){if(e.type==='ELLIPSE'){e.resize(160,160);e.x=82;e.y=4;}else if(e.type==='TEXT'){e.y=72;}ids.push(e.id);}ids.push(chart.id);
for(const [name,label] of [['Food analytics','Ăn uống · 45% · 337.500 đ  ›'],['Rent analytics','Nhà trọ · 40% · 300.000 đ  ›'],['Transit analytics','Di chuyển · 15% · 112.500 đ  ›']]){const n=root.findOne(n=>n.name===name);const caption=n.findOne(n=>n.type==='TEXT'&&n.name==='Caption');caption.visible=false;const t=n.findOne(n=>n.type==='TEXT'&&n.name==='Label');t.characters=label;t.fontSize=14;t.resize(300,20);t.textAutoResize='HEIGHT';n.resize(324,52);ids.push(n.id,caption.id,t.id);}
}
}
return {mutatedNodeIds:ids,roots:roots.map(n=>({id:n.id,name:n.name}))};
