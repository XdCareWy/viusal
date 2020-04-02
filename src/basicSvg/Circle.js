function Circle(snap, basicParams, styleParams = {}) {
  const { x, y, r } = basicParams;
  const {
    fill = "rgb(215,216,217)",
    stroke = "gray",
    strokeWidth = "1",
    fillOpacity = "1",
    width = "",
    id,
    ...rest
  } = styleParams;
  const circle = snap.circle(x, y, r);
  const attrs = {
    fill,
    stroke,
    strokeWidth,
    fillOpacity,
    width,
    id: `module_${id}`,
    strokeDasharray: 0,
    ...rest
  };
  circle.attr(attrs);
  return circle;
}
Circle.prototype.type = "circle";

export { Circle };
