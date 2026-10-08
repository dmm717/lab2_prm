// Run with targetPageId = 1:3 or 1:6. Only Content scrolls; chrome is fixed.
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(targetPageId));
figma.skipInvisibleInstanceChildren=false;
const roots=figma.currentPage.children.filter(n=>n.type==='FRAME'&&(n.name.startsWith('Lab2 /')||n.name.startsWith('Prototype /')));
if(targetPageId==='1:3')for(const id of ['49:2896','49:2956','49:3061'])roots.push(await figma.getNodeByIdAsync(id));
const ids=[],screens=[];
for(const root of roots){
  for(const t of root.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
  const status=root.children.find(n=>n.name==='Status'||n.name==='iOS status bar and top safe area');
  const header=root.children.find(n=>n.name==='Header'||n.name==='iOS navigation bar');
  const footer=root.children.find(n=>n.name==='Footer'||n.name==='Bottom nav'||n.name==='iOS tab bar'||n.name==='iOS Home indicator');
  const content=root.children.find(n=>n.name==='Content'||(/content/i.test(n.name)&&n.type==='FRAME'));
  const chrome=[status,header,footer].filter(Boolean);
  root.overflowDirection='NONE';root.clipsContent=true;
  if(content){
    for(const prop of ['paddingTop','paddingBottom','paddingLeft','paddingRight','itemSpacing'])root.setBoundVariable(prop,null);
    const top=(status?.height||0)+(header?.height||0),bottom=footer?.height||0;
    root.paddingTop=top;root.paddingBottom=root.paddingLeft=root.paddingRight=0;root.itemSpacing=0;
    root.primaryAxisSizingMode='FIXED';root.counterAxisSizingMode='FIXED';
    root.insertChild(0,content);content.layoutPositioning='AUTO';content.resize(root.width,root.height-top-bottom);content.layoutSizingHorizontal=content.layoutSizingVertical='FIXED';content.primaryAxisSizingMode='FIXED';content.counterAxisSizingMode='FIXED';content.overflowDirection='VERTICAL';content.clipsContent=true;ids.push(content.id);
  }
  for(const n of chrome){root.appendChild(n);n.layoutPositioning='ABSOLUTE';n.x=0;n.y=n===status?0:n===header?(status?.height||0):root.height-n.height;n.constraints={horizontal:'STRETCH',vertical:n===footer?'MAX':'MIN'};if(n===status||n===header||n.name==='Footer')n.fills=root.fills;ids.push(n.id);}
  root.numberOfFixedChildren=chrome.length;ids.push(root.id);
  screens.push({id:root.id,name:root.name,fixedChildren:root.numberOfFixedChildren,chrome:chrome.map(n=>({id:n.id,name:n.name,x:n.x,y:n.y,w:n.width,h:n.height})),content:content?{id:content.id,overflow:content.overflowDirection,height:content.height}:null});
}
return {mutatedNodeIds:[...new Set(ids)],screens};
