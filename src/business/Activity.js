import { Ellipse, Text } from "../basicSvg";
import { ELLIPSE_RX, ELLIPSE_RY } from "../tool/constants";

export default function Activity(snap, x, y, text, id) {
  const style = {
      fill: Activity.color,
      strokeWidth: 0,
      id
    },
    rx = ELLIPSE_RX,
    ry = ELLIPSE_RY;
  const activity = Ellipse(snap, { x, y, rx, ry }, style);
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(
      snap,
      { x: x, y: y, text: text },
      { maxWidth: 2 * (rx - 10) }
    );
    return snap.g(activity, t);
  }
  return activity;
}
Activity.color = "#5B9BD5";
