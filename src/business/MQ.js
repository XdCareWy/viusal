import { Circle } from "../basicSvg";
export default function MQ(snap, x, y, text) {
    const r = 30,
        style = {
            fill: MQ.color,
            strokeWidth: 0
        };
    const inter = Circle(snap, { x, y, r }, style);
}
MQ.color = "#4C5155";
