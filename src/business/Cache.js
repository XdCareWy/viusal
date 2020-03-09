import { Square } from "../basicSvg";
export default function Cache(snap, x, y, text) {
    const width = 66,
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
}
Cache.color = "#ED7D31";
