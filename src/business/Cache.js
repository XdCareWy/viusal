import { Square, Text } from "../basicSvg";
import { SQUARE_WIDTH } from "../tool/constants";
export default function Cache(snap, x, y, text) {
  const width = SQUARE_WIDTH,
    basicParams = {
      x: x - width / 2,
      y: y - width / 2,
      width
    },
    style = {
      fill: Cache.color,
      strokeWidth: 0
    };
  const cache = Square(snap, basicParams, style);
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(
      snap,
      { x: x, y: y, text: text },
      { maxWidth: 2 * (width - 10) }
    );
    return snap.g(cache, t);
  }
  return cache;
}
Cache.color = "#ED7D31";
