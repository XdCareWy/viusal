export function Rectangle(snap, basicParams, styleParams) {
  const { x, y, width, height, rx = 0, ry = 0 } = basicParams || {};
  const {
    fill = "rgb(215,216,217)",
    stroke = "gray",
    strokeWidth = "1",
    fillOpacity = "1",
    id,
    ...rest
  } = styleParams || {};
  const rectangle = snap.rect(x, y, width, height, rx, ry);
  const attrs = {
    id: `rectangle_${id}`,
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
