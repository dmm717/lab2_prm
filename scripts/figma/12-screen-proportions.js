// Run independently with targetPageId = 1:3 or 1:6, after 11.
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(targetPageId));
figma.skipInvisibleInstanceChildren=false;
const ids=[];const record=n=>{ids.push(n.id);return n;};
const roots=figma.currentPage.children.filter(n=>n.type==='FRAME'&&(n.name.startsWith('Lab2 /')||n.name.startsWith('Prototype /')));
for(const root of roots){
  for(const t of root.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
  const content=root.children.find(n=>n.name==='Content');if(content){content.itemSpacing=10;record(content);
    for(const c of content.children){if(c.name.startsWith('Summary/')){c.itemSpacing=6;for(const t of c.children.filter(n=>n.type==='TEXT'&&n.fontSize>=28)){t.fontSize=28;t.lineHeight={unit:'PIXELS',value:36};record(t);}record(c);}
      if(c.name==='Paid progress'){c.paddingTop=c.paddingBottom=12;record(c);}
      if(c.name==='Donut chart'){c.resize(324,160);for(const e of c.children.filter(n=>n.type==='ELLIPSE')){e.resize(152,152);e.x=86;e.y=4;record(e);}const t=c.children.find(n=>n.type==='TEXT');if(t){t.y=70;record(t);}record(c);}
    }
  }
  for(const n of root.findAllWithCriteria({types:['INSTANCE']})){
    if(!n.visible)continue;const m=await n.getMainComponentAsync();
    if(m.parent?.id==='44:1647'){n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(324,52);n.cornerRadius=16;n.effects=[];for(const t of n.findAllWithCriteria({types:['TEXT']})){t.fontSize=16;t.lineHeight={unit:'PIXELS',value:24};record(t);}record(n);}
    if(m.id==='44:1810'){const caption=n.children.find(c=>c.type==='TEXT'&&c.name==='Caption');const surface=n.children.find(c=>c.name==='Input surface');const h=caption?.visible?80:52;n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(324,h);surface.layoutSizingHorizontal='FILL';record(n);record(surface);}
    if(m.parent?.id==='57:14'){n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(324,116);record(n);}
    if(m.parent?.id==='44:1998'){const t=n.findOne(t=>t.type==='TEXT'&&t.name==='Screen title');if(t){t.visible=true;if(root.id==='65:237')t.characters='Tạo hóa đơn';t.fontSize=m.id==='44:1999'?24:20;t.lineHeight={unit:'PIXELS',value:m.id==='44:1999'?32:28};record(t);}record(n);}
    if(m.parent?.id==='44:1936'){
      n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(324,64);n.itemSpacing=8;
      const icon=n.children.find(c=>c.name==='Category symbol');icon.resize(36,36);record(icon);
      const details=n.children.find(c=>c.name==='Transaction details');details.layoutSizingHorizontal='FILL';
      const amounts=n.children.find(c=>c.name==='Amount details');amounts.counterAxisSizingMode='FIXED';amounts.resize(92,40);amounts.layoutSizingHorizontal='FIXED';
      for(const t of n.findAllWithCriteria({types:['TEXT']})){const meta=t.name==='Meta';t.fontSize=meta?14:15;t.lineHeight={unit:'PIXELS',value:meta?20:22};t.textAutoResize='NONE';t.resize(t.parent===amounts?92:156,meta?20:22);t.layoutSizingHorizontal='FILL';t.textTruncation='ENDING';t.maxLines=1;record(t);}
      record(n);record(details);record(amounts);
    }
  }
  // Secondary demo actions retain the original Secondary variant rather than competing with Save.
  for(const n of root.findAllWithCriteria({types:['INSTANCE']}))if(['Quick amount','Invalid demo','Add friend'].includes(n.name)){
    const text=n.findOne(t=>t.type==='TEXT');const label=text?.characters;const rx=JSON.parse(JSON.stringify(n.reactions));
    const comp=await figma.getNodeByIdAsync('44:1654');for(const t of comp.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
    n.swapComponent(comp);n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(324,52);n.effects=[];
    const t=n.findOne(t=>t.type==='TEXT');t.characters=label;t.fontSize=16;t.lineHeight={unit:'PIXELS',value:24};await n.setReactionsAsync(rx);record(n);record(t);
  }
  record(root);
}
return {mutatedNodeIds:[...new Set(ids)],screens:roots.map(n=>{const c=n.children.find(n=>n.name==='Content');return {id:n.id,name:n.name,w:n.width,h:n.height,instances:n.findAllWithCriteria({types:['INSTANCE']}).length,bottom:c?Math.max(...c.children.filter(n=>n.visible).map(n=>n.y+n.height)):null,available:c?c.height-c.paddingBottom:null};})};
