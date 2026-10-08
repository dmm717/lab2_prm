const page = await figma.getNodeByIdAsync("1:4");
await figma.setCurrentPageAsync(page);
await Promise.all(
  ["Regular", "Semi Bold", "Bold"].map((style) =>
    figma.loadFontAsync({ family: "Inter", style }),
  ),
);
const changed = [];
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const primitives =
  collections.find((c) => c.name === "StudentPay / Primitives") ||
  figma.variables.createVariableCollection("StudentPay / Primitives");
const semantic =
  collections.find((c) => c.name === "StudentPay / Semantic") ||
  figma.variables.createVariableCollection("StudentPay / Semantic");
primitives.renameMode(primitives.defaultModeId, "Value");
semantic.renameMode(semantic.defaultModeId, "Light");
const existing = await figma.variables.getLocalVariablesAsync();
const colors = {
  primary: "#006c49",
  accent: "#10b981",
  background: "#faf8ff",
  surface: "#ffffff",
  text: "#131b2e",
  muted: "#52625c",
  border: "#bbcabf",
  soft: "#e8f7ef",
  danger: "#ba1a1a",
  error: "#ffdad6",
  purple: "#494bd6",
  amber: "#895900",
  disabled: "#d3e3dc",
};
function rgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
    a: 1,
  };
}
function variable(c, name, type, value, scopes) {
  let v = existing.find(
    (v) => v.variableCollectionId === c.id && v.name === name,
  );
  if (!v) {
    v = figma.variables.createVariable(name, c, type);
    existing.push(v);
  }
  v.setValueForMode(c.defaultModeId, value);
  v.scopes = scopes;
  v.setVariableCodeSyntax(
    "WEB",
    "var(--studentpay-" + name.replace(/\//g, "-") + ")",
  );
  changed.push(v.id);
  return v;
}
const tokens = {};
for (const [name, hex] of Object.entries(colors)) {
  const raw = variable(primitives, "palette/" + name, "COLOR", rgb(hex), []);
  tokens[name] = variable(
    semantic,
    "color/" + name,
    "COLOR",
    figma.variables.createVariableAlias(raw),
    ["FRAME_FILL", "SHAPE_FILL", "TEXT_FILL", "STROKE_COLOR"],
  );
}
for (const value of [0, 4, 8, 12, 16, 24, 32])
  tokens["space" + value] = variable(
    semantic,
    "spacing/" + value,
    "FLOAT",
    value,
    ["GAP"],
  );
for (const value of [0, 12, 20, 24, 999])
  tokens["radius" + value] = variable(
    semantic,
    "radius/" + value,
    "FLOAT",
    value,
    ["CORNER_RADIUS"],
  );
variable(semantic, "size/touch-target", "FLOAT", 48, ["WIDTH_HEIGHT"]);
const styles = await figma.getLocalTextStylesAsync();
for (const [name, size, weight, line] of [
  ["Display", 32, "Bold", 40],
  ["Heading", 24, "Bold", 32],
  ["Title", 18, "Semi Bold", 26],
  ["Body", 16, "Regular", 24],
  ["Label", 14, "Semi Bold", 20],
  ["Caption", 14, "Regular", 20],
]) {
  let s =
    styles.find((s) => s.name === "StudentPay/" + name) ||
    figma.createTextStyle();
  s.name = "StudentPay/" + name;
  s.fontName = { family: "Inter", style: weight };
  s.fontSize = size;
  s.lineHeight = { unit: "PIXELS", value: line };
  changed.push(s.id);
}
function paint(key) {
  return figma.variables.setBoundVariableForPaint(
    { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
    "color",
    tokens[key],
  );
}
let board = page.children.find(
  (n) => n.name === "StudentPay / Lab2 verified tokens",
);
if (!board) {
  board = figma.createAutoLayout("VERTICAL");
  page.appendChild(board);
  board.name = "StudentPay / Lab2 verified tokens";
  board.x =
    Math.max(
      0,
      ...page.children.filter((n) => n !== board).map((n) => n.x + n.width),
    ) + 120;
  board.y = 80;
  board.resize(600, 100);
  board.primaryAxisSizingMode = "AUTO";
  board.counterAxisSizingMode = "FIXED";
  board.paddingTop =
    board.paddingBottom =
    board.paddingLeft =
    board.paddingRight =
      24;
  board.itemSpacing = 16;
  board.fills = [paint("surface")];
  changed.push(board.id);
  function text(value, size = 16) {
    const t = figma.createText();
    t.fontName = { family: "Inter", style: size === 24 ? "Bold" : "Regular" };
    t.fontSize = size;
    t.characters = value;
    t.fills = [paint("text")];
    t.textAutoResize = "HEIGHT";
    t.resize(552, 40);
    board.appendChild(t);
    changed.push(t.id);
  }
  text("StudentPay · Tokens & accessibility", 24);
  text("SE192336 · Huỳnh Thiện Nhân\n360 × 800 · Inter · VND");
  for (const [name, hex] of Object.entries(colors)) {
    const row = figma.createAutoLayout("HORIZONTAL");
    row.fills = [];
    row.itemSpacing = 16;
    board.appendChild(row);
    changed.push(row.id);
    const swatch = figma.createRectangle();
    swatch.resize(48, 48);
    swatch.fills = [paint(name)];
    row.appendChild(swatch);
    changed.push(swatch.id);
    const t = figma.createText();
    t.fontName = { family: "Inter", style: "Regular" };
    t.fontSize = 16;
    t.characters = name + "  " + hex;
    t.fills = [paint("text")];
    row.appendChild(t);
    changed.push(t.id);
  }
  text(
    "Spacing: 4 / 8 / 12 / 16 / 24 / 32\nTouch targets ≥ 48 × 48\nText ≥ 14 px; amount 32 px\nPrimary #006c49 + white: AA\nAccent #10b981: decorative only.",
  );
}
return {
  createdOrMutatedNodeIds: changed,
  collections: [primitives.id, semantic.id],
  tokens: Object.fromEntries(Object.entries(tokens).map(([k, v]) => [k, v.id])),
  styles: (await figma.getLocalTextStylesAsync()).map((s) => ({
    id: s.id,
    name: s.name,
    size: s.fontSize,
  })),
  board: board.id,
};
