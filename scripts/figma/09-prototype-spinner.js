const page=await figma.getNodeByIdAsync('1:6');await figma.setCurrentPageAsync(page);
const find=name=>page.children.find(n=>n.name===name);
const dialog=find('Prototype / Amount error dialog');
if(dialog.children.length===2){const old=dialog.children.map(n=>n.id);for(const id of old){const n=await figma.getNodeByIdAsync(id);n.remove();ids.push(id);}instance(dialog,await figma.getNodeByIdAsync('67:2'));}
const retry=dialog.findOne(n=>n.name==='Retry');await retry.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:find('Prototype / Add empty').id,navigation:'NAVIGATE',transition:{type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:0.2}}]}]);ids.push(retry.id);
for(const [name,destination] of [['Prototype / Saving expense','Prototype / Expense saved'],['Prototype / Saving bill','Prototype / 08 Bill detail'],['Prototype / Saving bill four','Prototype / Bill four detail']]){
const source=find(name);let spinner=source.findOne(n=>n.name==='Spinner');if(!spinner){spinner=instance(source,await figma.getNodeByIdAsync('67:8'));spinner.name='Spinner';}
let phase=find(name+' · spinning');if(!phase){phase=source.clone();page.appendChild(phase);phase.name=name+' · spinning';const index=page.children.filter(n=>n.type==='FRAME').length-1;phase.x=80+(index%4)*440;phase.y=80+Math.floor(index/4)*920;ids.push(phase.id,...phase.findAll(()=>true).map(n=>n.id));phase.findOne(n=>n.name==='Spinner').rotation=180;}
for(const [from,to,timeout,animation] of [[source,phase,0.35,'SMART_ANIMATE'],[phase,find(destination),0.45,'DISSOLVE']]){await from.setReactionsAsync([{trigger:{type:'AFTER_TIMEOUT',timeout},actions:[{type:'NODE',destinationId:to.id,navigation:'NAVIGATE',transition:{type:animation,easing:{type:'LINEAR'},duration:0.3}}]}]);ids.push(from.id);}
}
return {createdOrMutatedNodeIds:ids,screens:page.children.filter(n=>n.type==='FRAME').map(n=>({id:n.id,name:n.name})),start:page.flowStartingPoints};
