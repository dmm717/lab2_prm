const page = await figma.getNodeByIdAsync("1:3");
await figma.setCurrentPageAsync(page);
const compIds = {
  button: "57:2",
  amount: "57:12",
  navHome: "57:24",
  navAnalytics: "57:25",
  navSplit: "57:26",
  transaction: "57:58",
  income: "57:59",
  field: "57:85",
  member: "57:91",
  pending: "57:94",
  paid: "57:93",
  error: "57:71",
  loading: "57:72",
  success: "57:73",
};
const comps = {};
for (const [k, id] of Object.entries(compIds))
  comps[k] = await figma.getNodeByIdAsync(id);
const baseX = Math.max(0, ...page.children.map((n) => n.x + n.width)) + 120;
const outputs = [];
function override(n, name, value) {
  const t = n.findOne((n) => n.type === "TEXT" && n.name === name);
  if (t) {
    t.characters = value;
    ids.push(t.id);
  }
  return n;
}
function button(parent, label, name) {
  const n = instance(parent, comps.button);
  const key = Object.keys(n.componentProperties).find((k) =>
    k.startsWith("Label#"),
  );
  n.setProperties({ [key]: label });
  n.name = name;
  return n;
}
function row(parent, title, meta, value, income = false) {
  const n = instance(parent, income ? comps.income : comps.transaction);
  override(n, "Title", title);
  override(n, "Meta", meta);
  override(n, "Value", value);
  return n;
}
function field(parent, label, value, name) {
  const n = instance(parent, comps.field);
  override(n, "Caption", label);
  override(n, "Label", value);
  n.name = name;
  return n;
}
function card(parent, title, value, subtitle, bg = "surface") {
  const n = stack(parent, "Summary/" + title, 324, 8, 16, bg);
  text(n, title, "Caption", "muted", 292);
  text(n, value, "Display", "text", 292);
  if (subtitle) text(n, subtitle, "Caption", "muted", 292);
  return n;
}
const specs = [
  ["01 Home", "StudentPay", "Home"],
  ["02 Add expense", "Thêm chi tiêu"],
  ["03 Category", "Chọn danh mục"],
  ["04 Analytics", "Thống kê", "Analytics"],
  ["05 Transactions", "Lịch sử giao dịch"],
  ["06 Split bills", "Chia tiền", "Split"],
  ["07 Create bill", "Tạo hóa đơn"],
  ["08 Bill detail", "Chi tiết hóa đơn"],
];
for (let index = 0; index < specs.length; index++) {
  const [name, title, tab] = specs[index];
  let screen = page.children.find((n) => n.name === "Lab2 / " + name);
  if (screen) {
    outputs.push({ id: screen.id, name: screen.name });
    continue;
  }
  screen = keep(figma.createAutoLayout("VERTICAL"));
  page.appendChild(screen);
  screen.name = "Lab2 / " + name;
  screen.x = baseX + (index % 4) * 440;
  screen.y = 80 + Math.floor(index / 4) * 920;
  screen.resize(360, 800);
  screen.primaryAxisSizingMode = "FIXED";
  screen.counterAxisSizingMode = "FIXED";
  space(screen, 0, 0);
  fill(screen, "background");
  radius(screen, 24);
  screen.clipsContent = true;
  const status = stack(screen, "Status", 360, 0, 0);
  status.resize(360, 32);
  status.primaryAxisSizingMode = "FIXED";
  status.counterAxisAlignItems = "CENTER";
  text(status, "9:41                         ● ▰", "Label");
  const header = stack(screen, "Header", 360, 8, 0, null, "HORIZONTAL");
  header.resize(360, 56);
  header.primaryAxisSizingMode = "FIXED";
  header.counterAxisAlignItems = "CENTER";
  header.paddingLeft = header.paddingRight = 16;
  if (!tab) {
    const back = stack(header, "Back", 48, 0);
    back.resize(48, 48);
    back.primaryAxisSizingMode = "FIXED";
    back.primaryAxisAlignItems = "CENTER";
    back.counterAxisAlignItems = "CENTER";
    text(back, "‹", "Heading", "primary");
    text(header, title, "Title", "text", 272);
  } else text(header, title, "Heading", "text", 328);
  const content = stack(screen, "Content", 360, 12, 16);
  content.resize(360, 632);
  content.primaryAxisSizingMode = "FIXED";
  content.counterAxisAlignItems = "CENTER";
  content.clipsContent = false;
  let footer;
  if (tab) {
    footer = instance(screen, comps["nav" + tab]);
    footer.name = "Bottom nav";
  } else {
    footer = stack(screen, "Footer", 360, 0, 12);
    footer.resize(360, 80);
    footer.primaryAxisSizingMode = "FIXED";
    footer.counterAxisAlignItems = "CENTER";
  }
  if (index === 0) {
    text(
      content,
      "Chào Quân, chi tiêu có kế hoạch nhé.",
      "Caption",
      "muted",
      324,
    );
    card(
      content,
      "Ngân sách còn lại",
      "1.250.000 đ",
      "Tháng 10 · còn 27 ngày",
      "soft",
    );
    const progress = stack(content, "Budget progress", 324, 8, 16, "surface");
    text(progress, "Đã dùng 750.000 / 2.000.000 đ", "Label", "muted", 292);
    const track = keep(figma.createRectangle());
    progress.appendChild(track);
    track.resize(292, 8);
    fill(track, "disabled");
    radius(track, 12);
    const bar = keep(figma.createRectangle());
    progress.appendChild(bar);
    bar.resize(110, 8);
    fill(bar, "primary");
    radius(bar, 12);
    text(content, "Giao dịch gần đây", "Title", "text", 324);
    row(content, "Ăn trưa", "Hôm nay · Ăn uống", "−30.000 đ");
    row(content, "Cà phê", "Hôm qua · Ăn uống", "−25.000 đ");
    row(content, "Tiền sinh hoạt", "01/10 · Thu nhập", "+500.000 đ", true);
    button(content, "+  Thêm chi tiêu", "Add");
  }
  if (index === 1) {
    instance(content, comps.amount).name = "Amount";
    field(content, "Danh mục", "Ăn uống  ›", "Category");
    field(content, "Ngày", "Hôm nay · 04/10/2026", "Date");
    field(content, "Ghi chú (không bắt buộc)", "Ăn trưa", "Note");
    text(
      content,
      "Nhập nhanh: chọn 30.000 đ bên dưới.",
      "Caption",
      "muted",
      324,
    );
    button(content, "30.000 đ", "Quick amount");
    button(content, "Thử nhập bằng chữ", "Invalid demo");
    button(footer, "Lưu chi tiêu", "Save");
  }
  if (index === 2) {
    text(content, "Chọn loại chi tiêu của bạn", "Caption", "muted", 324);
    const cats = [
      ["Ăn uống", "☕"],
      ["Nhà trọ", "⌂"],
      ["Di chuyển", "↗"],
      ["Mua sắm", "◇"],
      ["Học tập", "▤"],
      ["Giải trí", "♫"],
      ["Sức khỏe", "+"],
      ["Hóa đơn", "▧"],
      ["Khác", "…"],
    ];
    for (let r = 0; r < 3; r++) {
      const grid = stack(
        content,
        "Category row",
        324,
        12,
        0,
        null,
        "HORIZONTAL",
      );
      for (const [label, icon] of cats.slice(r * 3, r * 3 + 3)) {
        const tile = stack(
          grid,
          "Category/" + label,
          100,
          8,
          16,
          label === "Ăn uống" ? "soft" : "surface",
        );
        tile.counterAxisAlignItems = "CENTER";
        tile.minHeight = 100;
        text(tile, icon, "Heading", "primary");
        text(tile, label, "Label", "text", 68);
      }
    }
    text(
      content,
      "Ăn uống được chọn sẵn để thêm nhanh.",
      "Caption",
      "muted",
      324,
    );
    button(footer, "Xong", "Done");
  }
  if (index === 3) {
    field(content, "Khoảng thời gian", "Tháng 10, 2026  ‹ ›", "Month");
    card(
      content,
      "Tổng chi tháng này",
      "750.000 đ",
      "3 danh mục · ngân sách 2 triệu",
    );
    const chart = keep(figma.createFrame());
    content.appendChild(chart);
    chart.name = "Donut chart";
    chart.resize(324, 184);
    fill(chart, null);
    const ring = keep(figma.createEllipse());
    chart.appendChild(ring);
    ring.resize(176, 176);
    ring.x = 74;
    ring.y = 4;
    ring.arcData = {
      startingAngle: 0,
      endingAngle: Math.PI * 2,
      innerRadius: 0.76,
    };
    fill(ring, "soft");
    for (const [start, end, color] of [
      [0, 0.45, "primary"],
      [0.45, 0.85, "purple"],
      [0.85, 1, "amber"],
    ]) {
      const e = keep(figma.createEllipse());
      chart.appendChild(e);
      e.resize(176, 176);
      e.x = 74;
      e.y = 4;
      e.arcData = {
        startingAngle: start * Math.PI * 2,
        endingAngle: end * Math.PI * 2,
        innerRadius: 0.76,
      };
      fill(e, color);
    }
    const label = text(chart, "Tháng 10", "Label", "text", 88);
    label.x = 118;
    label.y = 80;
    field(content, "Ăn uống · 45%", "337.500 đ  ›", "Food analytics");
    field(content, "Nhà trọ · 40%", "300.000 đ  ›", "Rent analytics");
    field(content, "Di chuyển · 15%", "112.500 đ  ›", "Transit analytics");
  }
  if (index === 4) {
    field(content, "Bộ lọc", "Tháng 10 · Ăn uống  ›", "Filter");
    text(content, "Chi cho ăn uống · 337.500 đ", "Title", "text", 324);
    text(content, "HÔM NAY", "Label", "muted", 324);
    row(content, "Ăn trưa", "04/10 · 12:15", "−30.000 đ");
    row(content, "Ăn sáng", "04/10 · 07:30", "−20.000 đ");
    text(content, "HÔM QUA", "Label", "muted", 324);
    row(content, "Cà phê", "03/10 · 14:10", "−25.000 đ");
    row(content, "Bữa tối", "03/10 · 19:00", "−45.000 đ");
    text(
      content,
      "Các khoản còn lại trong tháng: 217.500 đ",
      "Caption",
      "muted",
      324,
    );
    button(footer, "Về thống kê", "Analytics");
  }
  if (index === 5) {
    card(
      content,
      "Mọi người nợ bạn",
      "200.000 đ",
      "Hóa đơn đi siêu thị",
      "soft",
    );
    field(content, "Bạn cần trả", "50.000 đ · Tiền điện", "Owe");
    text(content, "Hóa đơn chung", "Title", "text", 324);
    const bill = field(
      content,
      "Đi siêu thị · 3 người",
      "300.000 đ · còn 2 người chưa trả  ›",
      "Bill",
    );
    field(
      content,
      "Tiền điện · 3 người",
      "150.000 đ · cần thanh toán  ›",
      "Electric bill",
    );
    text(content, "Chia đều, theo dõi rõ từng người.", "Caption", "muted", 324);
    button(content, "+  Tạo hóa đơn", "Create");
  }
  if (index === 6) {
    field(content, "Tên hóa đơn", "Đi siêu thị", "Bill name");
    const amount = instance(content, comps.amount);
    override(amount, "Amount", "300.000 đ");
    override(amount, "Help", "Bạn thanh toán trước cho cả nhóm");
    text(content, "Chia đều cho 3 người", "Title", "text", 324);
    for (const name of ["Minh Quân (bạn)", "Tuấn", "Linh"]) {
      const n = instance(content, comps.member);
      override(n, "Name", name);
      n.name = "Member/" + name;
    }
    text(content, "300.000 ÷ 3 = 100.000 đ / người", "Label", "primary", 324);
    button(content, "+  Thêm bạn mới", "Add friend");
    button(footer, "Tạo hóa đơn chia tiền", "Confirm");
  }
  if (index === 7) {
    card(
      content,
      "Đi siêu thị",
      "300.000 đ",
      "04/10/2026 · Quân thanh toán trước",
    );
    text(content, "Mỗi người · 100.000 đ", "Title", "text", 324);
    const progress = stack(content, "Paid progress", 324, 8, 16, "soft");
    text(progress, "1 / 3 người đã thanh toán", "Label", "primary", 292);
    text(progress, "Còn cần thu: 200.000 đ", "Body", "text", 292);
    for (const [name, c] of [
      ["Minh Quân (bạn)", comps.paid],
      ["Tuấn", comps.pending],
      ["Linh", comps.pending],
    ]) {
      const n = instance(content, c);
      override(n, "Name", name);
      n.name = "Member/" + name;
    }
    text(
      content,
      "Nhắc nợ mở bản xem trước để bạn xác nhận.",
      "Caption",
      "muted",
      324,
    );
    button(footer, "Nhắc thanh toán", "Remind");
  }
  outputs.push({
    id: screen.id,
    name: screen.name,
    w: screen.width,
    h: screen.height,
    instances: screen.findAllWithCriteria({ types: ["INSTANCE"] }).length,
  });
}
await finish();
return { createdOrMutatedNodeIds: ids, screens: outputs };
