// Run independently with targetPageId = 1:3 or 1:6.
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(targetPageId));
figma.skipInvisibleInstanceChildren=false;
const indicator=await figma.getNodeByIdAsync('90:885');
const food=await figma.getNodeByIdAsync('98:62');
for(const t of food.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
const vars=await figma.variables.getLocalVariablesAsync();
const primary=vars.find(v=>v.name==='color/primary');
const ids=[],removedNodeIds=[],screens=[];
for(const root of figma.currentPage.children.filter(n=>n.type==='FRAME'&&(n.name.startsWith('Lab2 /')||n.name.startsWith('Prototype /')))){
  const nav=root.children.find(c=>c.name==='Bottom nav');
  const footer=root.children.find(c=>c.name==='Footer');
  const content=root.children.find(c=>c.name==='Content');
  if(!nav){
    const parent=footer||root;
    let bar=parent.children.find(c=>c.name==='iOS Home indicator');
    if(!bar){bar=indicator.createInstance();parent.appendChild(bar);bar.name='iOS Home indicator';ids.push(bar.id);}
    bar.resize(footer?324:360,34);bar.layoutSizingHorizontal='FIXED';bar.layoutSizingVertical='FIXED';
    if(footer){footer.resize(360,104);footer.primaryAxisSizingMode='FIXED';footer.paddingTop=12;footer.paddingBottom=0;footer.paddingLeft=footer.paddingRight=18;footer.itemSpacing=6;footer.counterAxisAlignItems='CENTER';ids.push(footer.id);if(content){content.resize(360,581);ids.push(content.id);}}
    else{bar.layoutPositioning='ABSOLUTE';bar.x=0;bar.y=766;}
    ids.push(bar.id);
  }
  let members=0;
  for(const n of root.findAllWithCriteria({types:['INSTANCE']})){
    if(!n.visible)continue;const main=await n.getMainComponentAsync();
    if(main.parent?.id==='57:95'){n.resize(324,60);n.paddingTop=n.paddingBottom=8;n.primaryAxisSizingMode='FIXED';ids.push(n.id);members++;}
  }
  if(content&&members>=3){content.itemSpacing=8;ids.push(content.id);}
  const tile=root.findOne(n=>n.type==='FRAME'&&n.name==='Category/Ăn uống');
  if(tile&&!tile.children.some(n=>n.type==='INSTANCE')){
    const old=[...tile.children];const n=food.createInstance();tile.appendChild(n);
    n.name='Food category';n.layoutMode='VERTICAL';n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(100,100);n.paddingTop=n.paddingBottom=n.paddingLeft=n.paddingRight=12;n.itemSpacing=8;n.primaryAxisAlignItems='CENTER';n.counterAxisAlignItems='CENTER';n.cornerRadius=20;n.fills=tile.fills;
    const t=n.findOne(t=>t.type==='TEXT');t.characters='Ăn uống';t.fontSize=14;t.lineHeight={unit:'PIXELS',value:20};t.resize(76,20);t.textAlignHorizontal='CENTER';t.textAutoResize='NONE';
    const icon=n.children.find(c=>c.type==='FRAME');
    for(const v of icon.findAllWithCriteria({types:['VECTOR']})){if(v.fills.length)v.fills=v.fills.map(p=>p.type==='SOLID'?figma.variables.setBoundVariableForPaint(p,'color',primary):p);if(v.strokes.length)v.strokes=v.strokes.map(p=>p.type==='SOLID'?figma.variables.setBoundVariableForPaint(p,'color',primary):p);ids.push(v.id);}
    tile.paddingTop=tile.paddingBottom=tile.paddingLeft=tile.paddingRight=0;tile.itemSpacing=0;
    for(const c of old){removedNodeIds.push(c.id);c.remove();}
    ids.push(tile.id,n.id,t.id,icon.id);
  }
  ids.push(root.id);
  screens.push({id:root.id,name:root.name,w:root.width,h:root.height,instances:root.findAllWithCriteria({types:['INSTANCE']}).length,hasTabs:!!nav,hasHomeIndicator:!!nav||!!(footer||root).children.find(c=>c.name==='iOS Home indicator'),bottom:content?Math.max(...content.children.filter(n=>n.visible).map(n=>n.y+n.height)):null,available:content?content.height-content.paddingBottom:null});
}
return {createdOrMutatedNodeIds:[...new Set(ids)],removedNodeIds,screens};
