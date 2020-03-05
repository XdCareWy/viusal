function Circle(snap, basicParams, styleParams = {}) {
  const { x, y, r } = basicParams;
  const {
    fill = "rgb(215,216,217)",
    stroke = "gray",
    strokeWidth = "1",
    fillOpacity = "1",
    width = "",
    ...rest
  } = styleParams;
  const circle = snap.circle(x, y, r);
  const attrs = {
    fill,
    stroke,
    strokeWidth,
    fillOpacity,
    width,
    strokeDasharray: 0,
    ...rest
  };
  circle.attr(attrs);
  console.log(typeof circle.getBBox)
  return circle;
}
Circle.prototype.type = "circle";

export { Circle };
