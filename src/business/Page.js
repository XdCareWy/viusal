import { Rectangle, Text } from "../basicSvg";
export default function Page(snap, x, y, text) {
  const width = 100,
    height = 50,
    offsetX = x - width / 2,
    offsetY = y - height / 2,
    basicParams = {
      x: offsetX,
      y: offsetY,
      width: width,
      height: height
    };
  const style = {
    fill: Page.color,
    strokeWidth: 0
  };
  const page = Rectangle(snap, basicParams, style);
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(
      snap,
      { x: x, y: y, text: text },
      { maxWidth: 2 * (width - 10) }
    );
    return snap.g(page, t);
  }
  return page;
}
Page.color = "#ED7D31";
