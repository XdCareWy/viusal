export function Rectangle(snap, basicParams, styleParams) {
  const { x, y, width, rx = 0, ry = 0 } = basicParams || {};
  const {
    fill = "rgb(215,216,217)",
    stroke = "gray",
    strokeWidth = "1",
    fillOpacity = "1",
    ...rest
  } = styleParams || {};
  const rectangle = snap.rect(x, y, width, width, rx, ry);
  const attrs = {
    fill,
    stroke,
    strokeWidth,
    fillOpacity,
    strokeDasharray: 0,
    ...rest
  };
  rectangle.attr(attrs);
  return rectangle;
}

Rectangle.prototype.type = "rectangle";
