import { Ellipse } from "../basicSvg";

export default function Activity(snap, x, y, text) {
  const style = {
    fill: Activity.color,
    strokeWidth: 0
  };
  const activity = Ellipse(snap, { x: x, y: y, rx: 50, ry: 25 }, style);
}
Activity.color = "#5B9BD5";
