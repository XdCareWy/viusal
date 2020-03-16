function ArrowLine(snap, basicParams, styleParams = {}) {
  const { x1, y1, x2, y2 } = basicParams;
  const {
    fill = "none",
    stroke = "gray",
    strokeWidth = "2",
    fillOpacity = "1",
    width = "",
    ...rest
  } = styleParams;
  const arrowLine = snap.line(x1, y1, x2, y2);
  const arrowPath = snap.path("M0,0 L0,4 L3,2 L0,0").attr({
    fill: stroke
  });
  const markerEnd = arrowPath.marker(0, 0, 12, 12, 3, 2);
  const attrs = {
    fill,
    stroke,
    strokeWidth,
    fillOpacity,
    width,
    markerEnd: markerEnd,
    ...rest
  };

  arrowLine.attr(attrs);

  return arrowLine;
}
ArrowLine.prototype.type = "ArrowLine";

export { ArrowLine };
