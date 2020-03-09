import { Square, Text } from "../basicSvg";
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
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(
      snap,
      { x: x, y: y, text: text },
      { maxWidth: 2 * (width - 10) }
    );
    return snap.g(db, t);
  }
  return db;
}
DB.color = "#514949";
