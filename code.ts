const VALUES = {
  color: [
    { type: "SOLID", color: { r: 1, g: 1, b: 1 } },
    { type: "SOLID", color: { r: 0.09375, g: 0.46, b: 0.8164 } },
  ],
  text: [
    { type: "SOLID", color: { r: 0.09375, g: 0.46093, b: 0.8164 } },
    { type: "SOLID", color: { r: 1, g: 1, b: 1 } },
  ],
};

figma.showUI(__html__);
figma.ui.resize(500, 500);
figma.ui.onmessage = async ({
  type,
  value,
}: {
  type: string;
  value: string;
}) => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  if (type === "create") {
    if (value.includes("button-group")) {
      let b = figma.createComponent();
      let group: Group = getButtonGroupComponent(
        parseInt(value.split("-")[2]) - 1
      );
      b.resize(145 * 3, 50);
      b.name = "MUI-Button-Group";
      b.appendChild(group[0][0]);
      b.appendChild(group[0][1]);
      b.appendChild(group[1][0]);
      b.appendChild(group[1][1]);
      b.appendChild(group[2][0]);
      b.appendChild(group[2][1]);
    } else if (value.includes("button")) {
      let b = figma.createComponent();
      let group = getButtonComponent(parseInt(value.split("-")[1]) - 1);
      b.resize(145, 50);
      b.name = "MUI-Button";
      b.appendChild(group[0]);
      b.appendChild(group[1]);
    } else if (value.includes("input")) {
      let b = figma.createComponent();
      let group = getInputComponent(parseInt(value.split("-")[1]) - 1);
      b.resize(180, 50);
      b.name = "MUI-INPUT";
      b.appendChild(group[0]);
      b.appendChild(group[1]);
    } else {
      figma.notify("Coming Soon ...");
    }
  } else {
    figma.closePlugin();
  }
};

function getButtonComponent(variant: number) {
  const button = figma.createRectangle();
  const text = figma.createText();

  text.characters = "Button";
  text.fontSize = 18;
  text.x = 42;
  text.y = 14;
  text.fills = [VALUES.color[variant] as Paint];
  button.resize(145, 50);
  button.cornerRadius = 5;
  if (variant === 1) {
    const stroke: SolidPaint = VALUES.color[variant] as SolidPaint;
    button.strokes = [stroke];
  }
  button.fills = [VALUES.text[variant] as Paint];
  button.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.25 },
      offset: { x: 0, y: 4 },
      radius: 4,
      visible: variant === 0 ? true : false,
      blendMode: "NORMAL",
    },
  ];
  return { 0: button, 1: text };
}

function getButtonGroupComponent(variant: number) {
  let btn_1 = getButtonComponent(Math.min(variant, 1));
  let btn = getButtonComponent(Math.min(variant, 1));
  let btn_2 = getButtonComponent(Math.min(variant, 1));
  btn[0].topRightRadius = 0;
  btn[0].bottomRightRadius = 0;
  btn[1].x = 42;
  btn[1].y = 14;
  btn_1[1].x = 145 + 42;
  btn_1[1].y = 14;
  btn_1[0].x = 145;
  btn_1[0].cornerRadius = 0;
  btn_2[0].topLeftRadius = 0;
  btn_2[0].bottomLeftRadius = 0;
  btn_2[1].x = 290 + 42;
  btn_2[1].y = 14;
  btn_2[0].x = 290;
  if (variant === 0) {
    const stroke: SolidPaint = {
      type: "SOLID",
      color: { r: 0.0859375, g: 0.390625, b: 0.75 },
    };
    btn[0].effects = [];
    btn_1[0].effects = [];
    btn_2[0].effects = [];
    btn_1[0].strokes = [stroke];
    btn_1[0].strokeRightWeight = 2;
    btn_1[0].strokeLeftWeight = 2;
  }
  if (variant === 2) {
    const stroke: SolidPaint = {
      type: "SOLID",
      color: { r: 0.0859375, g: 0.390625, b: 0.75 },
    };
    btn[0].effects = [];
    btn[0].strokes = [];
    btn_1[0].effects = [];
    btn_2[0].effects = [];
    btn_2[0].strokes = [];
    btn_1[0].strokes = [stroke];
    btn_1[0].strokeRightWeight = 2;
    btn_1[0].strokeLeftWeight = 2;
    btn[0].fills = [];
    btn_1[0].fills = [];
    btn_2[0].fills = [];
  }
  return { 0: btn, 1: btn_1, 2: btn_2 };
}

function clone(val: any) {
  return JSON.parse(JSON.stringify(val));
}
interface Group {
  [index: number]: { 0: RectangleNode; 1: TextNode };
}

function getInputComponent(variant: number) {
  const input = figma.createRectangle();
  const text = figma.createText();

  text.fontSize = 16;
  text.x = 14;
  text.y = 14;
  text.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
  input.resize(180, 50);
  if (variant === 0) {
    text.characters = "Outlined";
    const stroke: SolidPaint = {
      type: "SOLID",
      color: { r: 0.7, g: 0.7, b: 0.7 },
    } as SolidPaint;
    input.strokes = [stroke];
    input.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
    input.cornerRadius = 5;
  } else if (variant === 1) {
    text.characters = "Filled";
    const stroke: SolidPaint = {
      type: "SOLID",
      color: { r: 0.3, g: 0.3, b: 0.3 },
    } as SolidPaint;
    input.strokes = [stroke];
    input.strokeWeight = 0;
    input.strokeBottomWeight = 1;
    input.topLeftRadius = 3;
    input.topRightRadius = 3;
    text.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    input.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  } else if (variant === 2) {
    text.characters = "Standard";
    text.y = 21;
    const stroke: SolidPaint = {
      type: "SOLID",
      color: { r: 0.3, g: 0.3, b: 0.3 },
    } as SolidPaint;
    input.strokes = [stroke];
    input.strokeWeight = 0;
    input.strokeBottomWeight = 1;
    input.topLeftRadius = 3;
    input.topRightRadius = 3;
    text.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    input.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
  }
  return { 0: input, 1: text };
}
