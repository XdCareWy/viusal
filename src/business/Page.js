import { Rectangle, Text } from "../basicSvg";
import { RECTANGLE_HEIGHT, RECTANGLE_WIDTH } from "../tool/constants";
export default function Page(snap, x, y, text, id) {
  const width = RECTANGLE_WIDTH,
    height = RECTANGLE_HEIGHT,
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
    strokeWidth: 0,
    id
  };
  const page = Rectangle(snap, basicParams, style);
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(snap, { x: x, y: y, text: text }, { maxWidth: width - 10 });
    return snap.g(page, t);
  }
  return page;
}
Page.color = "#ED7D31";
