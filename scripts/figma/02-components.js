const page = await figma.getNodeByIdAsync("1:5");
await figma.setCurrentPageAsync(page);
// Uses createComponentWithVariants helper from the Figma library skill.
const baseX = Math.max(0, ...page.children.map((n) => n.x + n.width)) + 120;
const specs = [
  {
    name: "StudentPay/Lab2 Button",
    axis: "State",
    states: ["Default", "Pressed", "Disabled", "Loading"],
    w: 324,
    h: 52,
  },
  {
    name: "StudentPay/Lab2 Amount",
    axis: "State",
    states: ["Default", "Filled", "Error"],
    w: 324,
    h: 116,
  },
  {
    name: "StudentPay/Lab2 Bottom nav",
    axis: "Tab",
    states: ["Home", "Analytics", "Split"],
    w: 360,
    h: 80,
  },
  {
    name: "StudentPay/Lab2 Transaction",
    axis: "Type",
    states: ["Expense", "Income"],
    w: 324,
    h: 72,
  },
  {
    name: "StudentPay/Lab2 Feedback",
    axis: "State",
    states: ["Error", "Loading", "Success", "Empty"],
    w: 324,
    h: 104,
  },
  {
    name: "StudentPay/Lab2 Field",
    axis: "State",
    states: ["Default", "Selected"],
    w: 324,
    h: 72,
  },
  {
    name: "StudentPay/Lab2 Member",
    axis: "State",
    states: ["Selected", "Unselected", "Paid", "Pending"],
    w: 324,
    h: 64,
  },
];
const result = [];
for (let i = 0; i < specs.length; i++) {
  const s = specs[i];
  let set = page.findOne(
    (n) => n.type === "COMPONENT_SET" && n.name === s.name,
  );
  if (!set) {
    const built = await createComponentWithVariants({
      name: s.name,
      description:
        "Lab 2 · VND · editable Auto Layout · semantic variable bindings",
      variantAxes: { [s.axis]: s.states },
      baseProps: { width: s.w, height: s.h, layoutMode: "VERTICAL" },
      page,
    });
    set = built.componentSet;
    ids.push(set.id, ...set.children.map((n) => n.id));
    set.x = baseX;
    set.y = 80 + i * 240;
    for (let j = 0; j < set.children.length; j++) {
      const c = set.children[j],
        state = s.states[j];
      c.x = 24 + j * (s.w + 24);
      c.y = 40;
      c.primaryAxisSizingMode = "FIXED";
      c.counterAxisSizingMode = "FIXED";
      c.primaryAxisAlignItems = "CENTER";
      c.counterAxisAlignItems = "CENTER";
      fill(c, null);
      space(c, 8, 12);
      radius(c, 12);
      if (i === 0) {
        fill(c, state === "Disabled" ? "disabled" : "primary");
        if (state === "Pressed") c.opacity = 0.85;
        text(
          c,
          state === "Loading" ? "◌  Đang lưu…" : "Lưu chi tiêu",
          "Label",
          state === "Disabled" ? "muted" : "surface",
          0,
          "Label",
        );
      }
      if (i === 1) {
        c.counterAxisAlignItems = "MIN";
        fill(c, state === "Error" ? "error" : "surface");
        text(c, "Số tiền · VND", "Caption", "muted");
        text(
          c,
          state === "Default"
            ? "0 đ"
            : state === "Error"
              ? "ba mươi nghìn"
              : "30.000 đ",
          "Display",
          state === "Error" ? "danger" : "text",
          300,
          "Amount",
        );
        text(
          c,
          state === "Error"
            ? "Chỉ nhập số nguyên lớn hơn 0."
            : "Nhập khoản chi hôm nay",
          "Caption",
          state === "Error" ? "danger" : "muted",
          300,
          "Help",
        );
      }
      if (i === 2) {
        fill(c, "surface");
        const row = stack(c, "Tabs", 336, 0, 0, null, "HORIZONTAL");
        for (const [k, label, symbol] of [
          ["Home", "Tổng quan", "⌂"],
          ["Analytics", "Thống kê", "▥"],
          ["Split", "Chia tiền", "↔"],
        ]) {
          const tab = stack(row, "Tab/" + k, 112, 0, 0);
          tab.counterAxisAlignItems = "CENTER";
          tab.minHeight = 48;
          text(tab, symbol, "Title", state === k ? "primary" : "muted");
          text(tab, label, "Label", state === k ? "primary" : "muted");
        }
      }
      if (i === 3) {
        fill(c, "surface");
        const row = stack(c, "Transaction", 300, 8, 0, null, "HORIZONTAL");
        const col = stack(row, "Details", 184, 0);
        text(
          col,
          state === "Expense" ? "Ăn trưa" : "Tiền sinh hoạt",
          "Label",
          "text",
          184,
          "Title",
        );
        text(col, "Hôm nay · Ăn uống", "Caption", "muted", 184, "Meta");
        text(
          row,
          state === "Expense" ? "−30.000 đ" : "+500.000 đ",
          "Label",
          state === "Expense" ? "danger" : "primary",
          108,
          "Value",
        );
      }
      if (i === 4) {
        fill(c, state === "Error" ? "error" : "soft");
        c.counterAxisAlignItems = "MIN";
        text(
          c,
          {
            Error: "!  Số tiền không hợp lệ",
            Loading: "◌  Đang lưu giao dịch",
            Success: "✓  Đã lưu chi tiêu",
            Empty: "Chưa có giao dịch",
          }[state],
          "Title",
          state === "Error" ? "danger" : "primary",
          300,
          "Label",
        );
        text(
          c,
          {
            Error: "Vui lòng nhập số nguyên lớn hơn 0.",
            Loading: "Vui lòng chờ một chút…",
            Success: "Số dư đã được cập nhật.",
            Empty: "Thêm khoản chi đầu tiên của bạn.",
          }[state],
          "Caption",
          state === "Error" ? "danger" : "muted",
          300,
          "Description",
        );
      }
      if (i === 5) {
        fill(c, "surface");
        c.counterAxisAlignItems = "MIN";
        text(c, "Danh mục", "Caption", "muted", 300, "Caption");
        text(
          c,
          state === "Selected" ? "Ăn uống  ›" : "Chọn danh mục  ›",
          "Body",
          "text",
          300,
          "Label",
        );
      }
      if (i === 6) {
        fill(c, "surface");
        const row = stack(c, "Member", 300, 8, 0, null, "HORIZONTAL");
        text(
          row,
          ["Selected", "Paid"].includes(state) ? "✓" : "○",
          "Title",
          "primary",
          24,
          "Check",
        );
        const col = stack(row, "Name & state", 184, 0);
        text(col, "Minh Quân (bạn)", "Label", "text", 184, "Name");
        text(
          col,
          {
            Selected: "Tham gia chia đều",
            Unselected: "Chạm để chọn",
            Paid: "Đã thanh toán",
            Pending: "Chưa thanh toán",
          }[state],
          "Caption",
          "muted",
          184,
          "Status",
        );
        text(row, "100.000 đ", "Label", "text", 84, "Share");
      }
    }
    set.resize(s.states.length * (s.w + 24) + 24, s.h + 80);
    fill(set, null);
    if (i === 0) {
      const key = set.addComponentProperty("Label", "TEXT", "Lưu chi tiêu");
      for (const c of set.children) {
        const t = c.findOne((n) => n.type === "TEXT" && n.name === "Label");
        t.componentPropertyReferences = { characters: key };
      }
    }
  }
  result.push({
    id: set.id,
    name: set.name,
    variants: set.children.map((c) => ({
      id: c.id,
      name: c.name,
      w: c.width,
      h: c.height,
      auto: c.layoutMode,
    })),
  });
}
await finish();
return { createdOrMutatedNodeIds: ids, sets: result };
