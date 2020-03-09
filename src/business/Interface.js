import { Circle } from "../basicSvg";
export default function Interface(snap, x, y, text) {
  const r = 30,
    style = {
      fill: Interface.color,
      strokeWidth: 0
    };
  const inter = Circle(snap, { x, y, r }, style);
}
Interface.color = "#5B9BD5";
