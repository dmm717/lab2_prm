await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1:5'));
const mutatedNodeIds=[];
const record=n=>{mutatedNodeIds.push(n.id);return n;};
async function fonts(n){for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);}
function type(t,size,line){t.fontSize=size;t.lineHeight={unit:'PIXELS',value:line};record(t);}
const buttons=await figma.getNodeByIdAsync('44:1647');await fonts(buttons);
for(let i=0;i<buttons.children.length;i++){
  const n=buttons.children[i];n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(324,52);n.x=24+(i%3)*348;n.y=24+Math.floor(i/3)*76;
  n.cornerRadius=16;n.effects=[];
  for(const t of n.findAllWithCriteria({types:['TEXT']}))type(t,16,24);
  record(n);
}
buttons.resize(1068,252);record(buttons);
const form=await figma.getNodeByIdAsync('44:1810');await fonts(form);
form.counterAxisSizingMode='FIXED';form.primaryAxisSizingMode='FIXED';form.resize(324,80);form.itemSpacing=8;
type(form.children[0],14,20);form.children[2].visible=false;record(form.children[2]);
form.children[1].resize(324,52);form.children[1].layoutSizingVertical='FIXED';record(form.children[1]);record(form);
const nav=await figma.getNodeByIdAsync('44:1998');await fonts(nav);
for(const n of nav.children){n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(390,56);
  const t=n.findOne(t=>t.type==='TEXT'&&t.name==='Screen title');type(t,n.id==='44:1999'?24:20,n.id==='44:1999'?32:28);
  const back=n.children.find(c=>c.name==='Back action');if(back){back.resize(48,48);record(back);}record(n);
}
const amounts=await figma.getNodeByIdAsync('57:14');await fonts(amounts);
for(const n of amounts.children){const t=n.findOne(t=>t.type==='TEXT'&&t.name==='Amount');type(t,28,36);n.primaryAxisSizingMode='FIXED';n.resize(324,116);record(n);}
const members=await figma.getNodeByIdAsync('57:95');await fonts(members);
for(const n of members.children){for(const t of n.findAllWithCriteria({types:['TEXT']})){if(['Name','Share'].includes(t.name))type(t,15,22);}record(n);}
return {mutatedNodeIds,scale:{screenTitle:24,detailTitle:20,amount:28,body:16,button:16,member:15,caption:14},sizes:{button:[324,52],field:[324,80],amount:[324,116],navigationHeight:56}};
