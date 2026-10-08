const page=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(page);
const pageSpecs=[['0:1','01. User Flow'],['1:2','02. Wireframe'],['1:3','03. Final UI'],['1:4','04. Design System'],['1:5','05. Components'],['1:6','06. Prototype']];
for(let i=0;i<pageSpecs.length;i++){const [id,name]=pageSpecs[i];const p=await figma.getNodeByIdAsync(id);p.name=name;figma.root.insertChild(i,p);ids.push(p.id);}
const baseX=Math.max(0,...page.children.map(n=>n.x+n.width))+120;
for(const [i,title,steps,note] of [
[0,'Flow 1 · Thêm chi tiêu',['Home','Thêm khoản chi\nMặc định Ăn uống','Nhập 30.000 đ\nSố nguyên > 0?','Lưu · loading','Home\nSố dư 1.220.000 đ'],'Nhánh lỗi: nhập chữ / trống / ≤ 0 → hộp lỗi → Nhập lại.\nNhập nhanh: Thêm → 30.000 đ → Lưu (3 lần chạm). <10 giây là mục tiêu, chưa đo usability thực tế.'],
[1,'Flow 2 · Xem báo cáo',['Home','Tab Thống kê','Biểu đồ tháng 10','Chạm mảng màu\nhoặc dòng danh mục','Giao dịch đã lọc'],'Nhánh thay thế: danh sách danh mục có vùng chạm lớn thay cho mảng biểu đồ nhỏ.'],
[2,'Flow 3 · Chia hóa đơn',['Home','Tab Chia tiền','Tạo Đi siêu thị\n300.000 đ','Quân + Tuấn + Linh\n100.000 đ / người','Loading → Chi tiết\nĐã trả / chưa trả'],'Nhánh thay thế: Thêm bạn An → 4 người → 75.000 đ / người.\nNhắc thanh toán → xem trước tin nhắn → quay lại; prototype không gửi tin nhắn thật.']]){
const name='StudentPay / Editable flow '+(i+1);if(page.children.find(n=>n.name===name))continue;
const board=stack(page,name,1200,24,32,'surface');board.x=baseX;board.y=80+i*420;text(board,title,'Heading','text',1136);const row=stack(board,'Flow steps',1136,8,0,null,'HORIZONTAL');for(let j=0;j<steps.length;j++){const step=stack(row,'Step/'+j,190,8,16,j===2&&i===0?'error':'soft');step.minHeight=104;text(step,steps[j],'Label','text',158);if(j<steps.length-1)text(row,'→','Heading','primary');}text(board,note,'Body','muted',1136);}
await finish();return {createdOrMutatedNodeIds:ids,pages:figma.root.children.map(n=>({id:n.id,name:n.name})),flows:page.children.filter(n=>n.name.startsWith('StudentPay / Editable flow')).map(n=>({id:n.id,name:n.name}))};
