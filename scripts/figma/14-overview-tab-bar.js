// Run independently with targetPageId = 1:3 or 1:6.
// Masters 44:2014 / 44:2034 are structurally identical to Final UI Overview 49:3139.
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(targetPageId));
figma.skipInvisibleInstanceChildren=false;
const ids=[],removedNodeIds=[];
const masters={Home:await figma.getNodeByIdAsync('44:2014'),Groups:await figma.getNodeByIdAsync('95:62'),Activity:await figma.getNodeByIdAsync('44:2034'),You:await figma.getNodeByIdAsync('95:82')};
for(const n of Object.values(masters))for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
let profile=null;
if(targetPageId==='1:6'){
  profile=figma.currentPage.children.find(n=>n.name==='Prototype / Profile');
  if(!profile){
    const src=await figma.getNodeByIdAsync('65:2');for(const t of src.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
    profile=src.clone();figma.currentPage.appendChild(profile);profile.name='Prototype / Profile';profile.x=Math.max(...figma.currentPage.children.filter(n=>n!==profile).map(n=>n.x+n.width))+120;profile.y=80;
    ids.push(profile.id,...profile.findAll().map(n=>n.id));
    const content=profile.children.find(n=>n.name==='Content');for(const n of [...content.children]){removedNodeIds.push(n.id);n.remove();}content.itemSpacing=16;
    const title=profile.children.find(n=>n.name==='Header').findOne(n=>n.type==='TEXT'&&n.name==='Screen title');title.characters='Tài khoản';ids.push(title.id,content.id);
    const field=await figma.getNodeByIdAsync('44:1810');for(const t of field.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
    for(const [label,value] of [['Họ và tên','Huỳnh Thiện Nhân'],['Mã số sinh viên','SE192336'],['Học phần','PRM393 · Lab 2']]){
      const n=field.createInstance();content.appendChild(n);n.name='Profile/'+label;n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(324,80);
      const caption=n.children.find(c=>c.type==='TEXT');caption.characters=label;
      const text=n.children.find(c=>c.name==='Input surface').findOne(n=>n.type==='TEXT');text.characters=value;
      ids.push(n.id,caption.id,text.id);
    }
  }
}
const navs=[];
for(const root of figma.currentPage.children.filter(n=>n.type==='FRAME')){
  const old=root.children.find(n=>n.name==='Bottom nav');if(!old)continue;
  const selected=root===profile?'You':['59:121','65:122'].includes(root.id)?'Activity':['59:202','65:203'].includes(root.id)?'Groups':'Home';
  const n=masters[selected].createInstance();root.insertChild(root.children.indexOf(old),n);n.name='Bottom nav';n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(360,83);
  ids.push(n.id);const keys=['Home','Groups','Activity','You'];const destinations={Home:'65:2',Groups:'65:203',Activity:'65:122',You:profile?.id};
  for(let i=0;i<4;i++){
    const tab=n.children[0].children[i];tab.name='Tab/'+keys[i];
    if(targetPageId==='1:6'&&destinations[keys[i]]!==root.id)await tab.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:destinations[keys[i]],navigation:'NAVIGATE',transition:{type:'DISSOLVE',easing:{type:'EASE_OUT'},duration:.2}}]}]);
    ids.push(tab.id);
  }
  removedNodeIds.push(old.id);old.remove();ids.push(root.id);
  navs.push({root:root.id,instance:n.id,main:masters[selected].id,selected,width:n.width,height:n.height,tabs:keys});
}
return {createdOrMutatedNodeIds:[...new Set(ids)],removedNodeIds,profileId:profile?.id,reference:'49:3139',navs};
