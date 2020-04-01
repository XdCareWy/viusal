import { FONTSIZE } from "../tool/constants";
class TextComponent {
  constructor(snap, basicParams, styleParams) {
    const { x, y, text } = basicParams,
      { fontSize, maxWidth, ...restStyle } = styleParams;
    this.snap = snap;
    this.x = x;
    this.y = y;
    this.text = text || "";
    this.fontSize = fontSize || FONTSIZE;
    this.maxWidth = maxWidth || 50;
    this.restStyle = restStyle;
  }
  getTextBBox(text) {
    const { fontSize } = this;
    let textWidth, textHeight;
    const textNode = this.snap.text(0, 0, text).attr({ "font-size": fontSize });
    textWidth = textNode.getBBox().width;
    textHeight = textNode.getBBox().height;
    textNode.remove();
    return {
      width: textWidth,
      height: textHeight
    };
  }
  splitTextByWidth(maxWidth) {
    const { text } = this;
    const result = [];
    let height = 0;
    const words = text.split("").reverse();
    let word = words.pop();
    let lineWord = [];
    while (word) {
      lineWord.push(word);
      const { width: lineWidth, height: lineHeight } = this.getTextBBox(
        lineWord.join("")
      );
      if (!height) {
        height = lineHeight;
      }
      if (word === ";" || lineWidth > maxWidth) {
        lineWord.pop();
        result.push(lineWord.join(""));
        if (word !== ";") {
          lineWord = [word];
        } else {
          lineWord = [];
        }
      }
      word = words.pop();
    }
    result.push(lineWord.join(""));
    return {
      lines: result,
      lineHeight: height
    };
  }
  render(text, lineHeight) {
    const { x, y, fontSize } = this,
      { fill = "black", strokeWidth = "1" } = this.restStyle;
    const textComponent = this.snap.text(x, y + lineHeight, text);
    textComponent.attr({
      fill: fill,
      strokeWidth: strokeWidth,
      fontSize: fontSize,
      class: "center"
    });
    return textComponent;
  }
}

export default function Text(snap, basic, style) {
  const t = new TextComponent(snap, basic, style);
  const { lines, lineHeight } = t.splitTextByWidth(t.maxWidth);
  const g = snap.g();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const l = t.render(line, lineHeight * (i - Math.floor(lines.length / 2)));
    g.add(l);
  }
  return g;
}
