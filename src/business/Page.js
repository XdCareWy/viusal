import { Rectangle } from "../basicSvg";
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
}
Page.color = "#ED7D31";
