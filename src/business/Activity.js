import { Ellipse, Text } from "../basicSvg";

export default function Activity(snap, x, y, text) {
  const style = {
      fill: Activity.color,
      strokeWidth: 0
    },
    rx = 50,
    ry = 25;
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
