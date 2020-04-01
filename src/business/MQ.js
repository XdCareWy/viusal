import { Circle, Text } from "../basicSvg";
import { CIRCLE_R } from "../tool/constants";
export default function MQ(snap, x, y, text, id) {
  const r = CIRCLE_R,
    style = {
      fill: MQ.color,
      strokeWidth: 0,
      id
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
MQ.color = "#BF97BF";
