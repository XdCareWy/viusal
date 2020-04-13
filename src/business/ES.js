import { Square, Text } from "../basicSvg";
import { SQUARE_WIDTH } from "../tool/constants";
export default function ES(snap, x, y, text, id) {
  const width = SQUARE_WIDTH,
    basicParams = {
      x: x - width / 2,
      y: y - width / 2,
      width
    },
    style = {
      fill: ES.color,
      strokeWidth: 0,
      id
    };
  const es = Square(snap, basicParams, style);
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(snap, { x: x, y: y, text: text }, { maxWidth: width - 10 });
    return snap.g(es, t);
  }
  return es;
}
ES.color = "#42BA97";
