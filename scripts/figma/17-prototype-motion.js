await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1:6'));
figma.skipInvisibleInstanceChildren=false;
const page=figma.currentPage,ids=[],animations=[],unchangedLinks=[];
for(const root of page.children.filter(n=>n.type==='FRAME'&&n.name.startsWith('Prototype /')))if(!root.visible){root.visible=true;ids.push(root.id);}
const analytics=await figma.getNodeByIdAsync('65:122');
for(const t of analytics.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
let entry=page.children.find(n=>n.name==='Prototype / Analytics entrance');
if(!entry){entry=analytics.clone();page.appendChild(entry);entry.name='Prototype / Analytics entrance';entry.x=Math.max(...page.children.filter(n=>n!==entry).map(n=>n.x+n.width))+120;entry.y=80;ids.push(entry.id,...entry.findAll().map(n=>n.id));}
const chart=entry.findOne(n=>n.name==='Donut chart');
for(const n of chart.children){if(n.type==='ELLIPSE'){n.resize(134,134);n.x=95;n.y=13;n.opacity=.15;}else if(n.type==='TEXT')n.opacity=.3;ids.push(n.id);}
await entry.setReactionsAsync([{trigger:{type:'AFTER_TIMEOUT',timeout:.03},actions:[{type:'NODE',destinationId:analytics.id,navigation:'NAVIGATE',transition:{type:'SMART_ANIMATE',easing:{type:'EASE_OUT'},duration:.45}}]}]);ids.push(entry.id);
const modalIds=new Set(['66:229','65:441','65:447','66:292','66:435']);
const loadingIds=new Set(['65:433','65:437','66:286','69:308','69:318','69:328']);
for(const root of page.children.filter(n=>n.type==='FRAME')){
  for(const n of [root,...root.findAll()]){
    if(!n.visible||!('reactions' in n))continue;
    let rx=JSON.parse(JSON.stringify(n.reactions)).map(r=>({trigger:r.trigger,actions:r.actions}));let changed=false;
    for(const r of rx)for(const a of r.actions||[]){
      if(a.type!=='NODE'||a.navigation!=='NAVIGATE')continue;
      if(a.destinationId==='65:122'&&root!==entry){a.destinationId=entry.id;changed=true;}
      let t={type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:.18};
      if(n.name.startsWith('Tab/'))t={type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:.18};
      else if(r.trigger.type==='AFTER_TIMEOUT')continue;
      else if(['Quick amount','Invalid demo'].includes(n.name))t={type:'SMART_ANIMATE',easing:{type:'EASE_OUT'},duration:.22};
      else if(loadingIds.has(a.destinationId))t={type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:.14};
      else if(modalIds.has(a.destinationId))t={type:'MOVE_IN',direction:'BOTTOM',matchLayers:true,easing:{type:'EASE_OUT'},duration:.26};
      else if(modalIds.has(root.id))t={type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:.18};
      else if(n.name==='Back'||n.name==='Analytics'||n.name.startsWith('Category/')||n.name==='Done')t={type:'PUSH',direction:'RIGHT',matchLayers:true,easing:{type:'EASE_OUT'},duration:.24};
      else t={type:'PUSH',direction:'LEFT',matchLayers:true,easing:{type:'EASE_OUT'},duration:.28};
      a.transition=t;changed=true;animations.push({source:n.id,destination:a.destinationId,type:t.type,duration:t.duration});
    }
    if(changed){try{await n.setReactionsAsync(rx);ids.push(n.id);}catch(e){unchangedLinks.push({source:n.id,name:n.name,root:root.id,error:String(e)});}}
  }
}
for(const [from,to,destination] of [['65:433','69:308','65:385'],['65:437','69:318','65:280'],['66:286','69:328','66:238']]){
  const source=await figma.getNodeByIdAsync(from),phase=await figma.getNodeByIdAsync(to);
  await source.setReactionsAsync([{trigger:{type:'AFTER_TIMEOUT',timeout:.08},actions:[{type:'NODE',destinationId:to,navigation:'NAVIGATE',transition:{type:'SMART_ANIMATE',easing:{type:'LINEAR'},duration:.36}}]}]);
  await phase.setReactionsAsync([{trigger:{type:'AFTER_TIMEOUT',timeout:.22},actions:[{type:'NODE',destinationId:destination,navigation:'NAVIGATE',transition:{type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:.20}}]}]);
  ids.push(source.id,phase.id);
}
const starts=page.flowStartingPoints.filter(s=>['65:2','65:122','65:203',entry.id].includes(s.nodeId));
page.flowStartingPoints=starts.map(s=>s.nodeId==='65:122'?{...s,nodeId:entry.id}:s);ids.push(page.id);
return {createdOrMutatedNodeIds:[...new Set(ids)],analyticsEntranceId:entry.id,animations,unchangedLinks,start:page.flowStartingPoints,frameCount:page.children.filter(n=>n.type==='FRAME').length};
