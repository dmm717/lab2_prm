// Read-only audit, targetPageId = 1:3 or 1:6.
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(targetPageId));
figma.skipInvisibleInstanceChildren=false;
const page=figma.currentPage;
const roots=page.children.filter(n=>n.type==='FRAME'&&(n.name.startsWith('Lab2 /')||n.name.startsWith('Prototype /')));
const out={page:page.id,frames:[],reactions:[],start:page.flowStartingPoints,issues:[],exceptions:[],motionSummary:{navigationTypes:{},pressInteractions:0,fixedFrames:0}};
function visible(n,root){let p=n;while(p&&p!==root){if(!p.visible)return false;p=p.parent;}return true;}
function inTab(n,root){let p=n.parent;while(p&&p!==root){if(p.name==='Bottom nav')return true;p=p.parent;}return false;}
for(const root of roots){
  const components=[];
  for(const n of root.findAllWithCriteria({types:['INSTANCE']})){const main=await n.getMainComponentAsync();let p=main;while(p&&p.type!=='PAGE')p=p.parent;components.push({id:n.id,name:n.name,main:main.id,sourcePage:p?.id,visible:visible(n,root)});}
  const content=root.children.find(n=>n.name==='Content'),nav=root.children.find(n=>n.name==='Bottom nav'),footer=root.children.find(n=>n.name==='Footer');
  const bottom=content?Math.max(...content.children.filter(n=>n.visible).map(n=>n.y+n.height)):null;
  const frame={fixedChildren:root.numberOfFixedChildren,contentScrolling:content?.overflowDirection||null,id:root.id,name:root.name,width:root.width,height:root.height,instances:components.length,components,contentBottom:bottom,available:content?content.height-content.paddingBottom:null,hasTabs:!!nav,hasSwipeIndicator:!!nav||!!(footer||root).children.find(n=>n.name==='iOS Home indicator')};if(!root.visible)out.issues.push({id:root.id,type:'hiddenPrototypeFrame'});out.frames.push(frame);if(frame.fixedChildren>=2)out.motionSummary.fixedFrames++;
  if(content&&bottom>frame.available+.1)out.issues.push({id:root.id,type:'contentOverflow',bottom,available:frame.available});
  if(!frame.hasSwipeIndicator)out.issues.push({id:root.id,type:'missingSwipeIndicator'});
  for(const n of [root,...root.findAll()]){
    if(!visible(n,root))continue;
    for(const r of n.reactions||[])for(const a of r.actions||[])if(a.type==='NODE'){if(a.navigation==='NAVIGATE'){out.reactions.push({source:n.id,target:a.destinationId,trigger:r.trigger.type});const type=a.transition?.type||'INSTANT';out.motionSummary.navigationTypes[type]=(out.motionSummary.navigationTypes[type]||0)+1;}else if(a.navigation==='CHANGE_TO'&&r.trigger.type==='ON_PRESS')out.motionSummary.pressInteractions++;}
    if(n.type==='TEXT'&&n.fontSize<14){if(inTab(n,root)&&n.fontSize===11)out.exceptions.push({id:n.id,size:11,reason:'Exact Overview iOS tab bar label requested by user'});else out.issues.push({id:n.id,type:'smallText',size:n.fontSize});}
  }
}
for(const f of out.frames)f.components=[...new Map(f.components.map(c=>[c.main,{main:c.main,sourcePage:c.sourcePage}])).values()];
out.exceptions={tabLabelSize:11,count:out.exceptions.length,reason:'Exact Final UI Overview tab bar requested by user'};
out.styles=(await figma.getLocalTextStylesAsync()).map(s=>({id:s.id,name:s.name,size:s.fontSize,line:s.lineHeight}));
return out;
