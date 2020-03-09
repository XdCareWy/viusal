import { Circle, Text } from "../basicSvg";
export default function MQ(snap, x, y, text) {
  const r = 30,
    style = {
      fill: MQ.color,
      strokeWidth: 0
    };
  const mq = Circle(snap, { x, y, r }, style);
  text = typeof text === "string" ? text.trim() : "";
  if (text) {
    const t = Text(
      snap,
      { x: x, y: y, text: text },
      { maxWidth: 2 * (r - 10) }
    );
    return snap.g(mq, t);
  }
  return mq;
}
MQ.color = "#4C5155";
