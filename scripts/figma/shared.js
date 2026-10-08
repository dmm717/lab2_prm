await Promise.all(
  ["Regular", "Semi Bold", "Bold"].map((style) =>
    figma.loadFontAsync({ family: "Inter", style }),
  ),
);
const ids = [],
  styled = [];
const vars = Object.fromEntries(
  (await figma.variables.getLocalVariablesAsync()).map((v) => [v.name, v]),
);
const styles = Object.fromEntries(
  (await figma.getLocalTextStylesAsync()).map((s) => [s.name, s]),
);
const keep = (n) => (ids.push(n.id), n);
const paint = (key) =>
  figma.variables.setBoundVariableForPaint(
    { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
    "color",
    vars["color/" + key],
  );
function fill(n, key) {
  n.fills = key ? [paint(key)] : [];
  return n;
}
function radius(n, value = 20) {
  n.cornerRadius = value;
  for (const k of [
    "topLeftRadius",
    "topRightRadius",
    "bottomLeftRadius",
    "bottomRightRadius",
  ])
    n.setBoundVariable(k, vars["radius/" + value]);
}
function space(n, gap = 12, pad = 0) {
  n.itemSpacing = gap;
  n.setBoundVariable("itemSpacing", vars["spacing/" + gap]);
  for (const k of [
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
  ]) {
    n[k] = pad;
    n.setBoundVariable(k, vars["spacing/" + pad]);
  }
}
function stack(
  parent,
  name,
  w = 324,
  gap = 12,
  pad = 0,
  bg = null,
  dir = "VERTICAL",
) {
  const n = keep(figma.createAutoLayout(dir));
  parent.appendChild(n);
  n.name = name;
  n.resize(w, 1);
  n.counterAxisSizingMode = "FIXED";
  n.primaryAxisSizingMode = "AUTO";
  space(n, gap, pad);
  fill(n, bg);
  if (bg) radius(n);
  return n;
}
function text(
  parent,
  value,
  style = "Body",
  color = "text",
  width = 0,
  name = "Label",
) {
  const n = keep(figma.createText());
  parent.appendChild(n);
  n.name = name;
  const s = styles["StudentPay/" + style];
  n.fontName = s.fontName;
  n.fontSize = s.fontSize;
  n.lineHeight = s.lineHeight;
  n.characters = value;
  fill(n, color);
  if (width) {
    n.textAutoResize = "HEIGHT";
    n.resize(width, 20);
  }
  styled.push([n, s]);
  return n;
}
async function finish() {
  await Promise.all(styled.map(([n, s]) => n.setTextStyleIdAsync(s.id)));
}
function instance(parent, c, label) {
  const n = keep(c.createInstance());
  parent.appendChild(n);
  if (label) {
    const t = n.findOne((n) => n.type === "TEXT" && n.name === "Label");
    if (t) {
      t.characters = label;
      ids.push(t.id);
    }
  }
  return n;
}
