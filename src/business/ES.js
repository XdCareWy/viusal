import { Square } from "../basicSvg";
export default function ES(snap, x, y, text) {
    const width = 66,
        basicParams = {
            x: x - width / 2,
            y: y - width / 2,
            width
        },
        style = {
            fill: ES.color,
            strokeWidth: 0
        };
    const db = Square(snap, basicParams, style);
}
ES.color = "#42BA97";
