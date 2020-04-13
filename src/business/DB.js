import { Square, Text } from "../basicSvg";
import { SQUARE_WIDTH } from "../tool/constants";
export default function DB(snap, x, y, text, id) {
  const width = SQUARE_WIDTH,
    basicParams = {
      x: x - width / 2,
      y: y - width / 2,
      width
    },
    style = {
      fill: DB.color,
      strokeWidth: 0,
      id
    };
  const db = Square(snap, basicParams, style);
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(snap, { x: x, y: y, text: text }, { maxWidth: width - 10 });
    return snap.g(db, t);
  }
  return db;
}
DB.color = "#9CBEBD";
