await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('1:5'));
const mutatedNodeIds=[],links=[];
for(const [from,to] of [['44:1648','44:1650'],['44:1654','44:1656'],['44:1660','44:1662'],['57:2','57:3']]){
  const n=await figma.getNodeByIdAsync(from),pressed=await figma.getNodeByIdAsync(to);
  const rx=JSON.parse(JSON.stringify(n.reactions)).filter(r=>r.trigger.type!=='ON_PRESS');
  rx.push({trigger:{type:'ON_PRESS'},actions:[{type:'NODE',destinationId:to,navigation:'CHANGE_TO',transition:{type:'SMART_ANIMATE',easing:{type:'EASE_OUT'},duration:.10}}]});
  await n.setReactionsAsync(rx);pressed.opacity=.85;
  mutatedNodeIds.push(n.id,pressed.id);links.push({from,to,trigger:'ON_PRESS',duration:.1});
}
return {mutatedNodeIds,links};
