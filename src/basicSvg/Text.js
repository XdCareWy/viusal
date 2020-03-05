import Snap from "snapsvg";
export function Text(snap, basicParams, styleParams) {
  const { x, y, text } = basicParams;
  const t = snap.text(x, y, text);
  return t;
}

export function Text1(snap, text, styleParams, base) {
  if (typeof base.getBBox !== "function") {
    throw new TypeError(`【${base}】 is not svg object`);
  }
  const { fontSize = 12 } = styleParams;
  if (base) {
    if (base.type === "circle") {
      const { cx, cy, r1 } = base.getBBox();
      const r = Snap.sin(45) * r1;
      const texts = getTextLine(snap, text, 12, 2 * r);
      console.log(texts);
      console.log(base.getBBox());
      const { lines, lineHeight } = texts;
      lines.map((item, index, arr) => {
        const y =
          cy +
          lineHeight / 2 +
          index * lineHeight -
          (arr.length * lineHeight) / 2;
        console.log(cy);
        console.log(y);
        return snap.text(cx - r, y, item).attr({ fontSize: fontSize });
      });
    }
  }
}

function getTextLine(snap, text, fontSize = 12, maxWidth) {
  const result = [];
  let height = 0;
  const words = text.split("").reverse();
  let word = words.pop();
  let lineWord = [];
  while (word) {
    lineWord.push(word);
    const { width: lineWidth, height: lineHeight } = getTextNodeBox(
      snap,
      lineWord.join(""),
      fontSize
    );
    if (!height) {
      height = lineHeight;
    }
    if (lineWidth > maxWidth) {
      lineWord.pop();
      result.push(lineWord.join(""));
      lineWord = [word];
    }
    word = words.pop();
  }
  result.push(lineWord.join(""));
  return {
    lines: result,
    lineHeight: height
  };
}
export function getTextNodeBox(snap, text, fontSize) {
  if (!text) throw new Error("text is not exist");
  let textWidth, textHeight;
  const textNode = snap.text(0, 0, text).attr({ "font-size": fontSize });
  textWidth = textNode.getBBox().width;
  textHeight = textNode.getBBox().height;
  textNode.remove();
  return {
    width: textWidth,
    height: textHeight
  };
}
