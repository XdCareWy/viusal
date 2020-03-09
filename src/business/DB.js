import { Square } from "../basicSvg";
export default function DB(snap, x, y, text) {
  const width = 66,
    basicParams = {
      x: x - width / 2,
      y: y - width / 2,
      width
    },
    style = {
      fill: DB.color,
      strokeWidth: 0
    };
  const db = Square(snap, basicParams, style);
}
DB.color = "#514949";
