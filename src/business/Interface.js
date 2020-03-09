import { Circle, Text } from "../basicSvg";
import { CIRCLE_R } from "../tool/constants";
export default function Interface(snap, x, y, text) {
  const r = CIRCLE_R,
    style = {
      fill: Interface.color,
      strokeWidth: 0
    };
  const inter = Circle(snap, { x, y, r }, style);
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(
      snap,
      { x: x, y: y, text: text },
      { maxWidth: 2 * (r - 10) }
    );
    return snap.g(inter, t);
  }
  return inter;
}
Interface.color = "#5B9BD5";
