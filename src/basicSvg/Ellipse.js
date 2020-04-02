export function Ellipse(snap, basicParams, styleParams) {
  const { x, y, rx, ry } = basicParams;
  const {
    fill = "rgb(215,216,217)",
    stroke = "gray",
    strokeWidth = "1",
    fillOpacity = "1",
    id,
    ...rest
  } = styleParams || {};
  const ellipse = snap.ellipse(x, y, rx, ry);
  const attrs = {
    id: `module_${id}`,
    fill,
    stroke,
    strokeWidth,
    fillOpacity,
    strokeDasharray: 0,
    ...rest
  };
  ellipse.attr(attrs);
  return ellipse;
}

Ellipse.prototype.type = "ellipse";
