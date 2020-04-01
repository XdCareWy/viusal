function ArrowLine(snap, basicParams, styleParams = {}) {
  const { x1, y1, x2, y2 } = basicParams;
  const {
    fill = "none",
    stroke = "gray",
    strokeWidth = "2",
    fillOpacity = "1",
    width = "",
    tips = "",
    id,
    ...rest
  } = styleParams;
  const arrowLine = snap.line(x1, y1, x2, y2);
  if (tips) {
    // 起点沿着连线的方向平移
    const textX = x1 + 20;
    let textY;
    if (y1 > y2) {
      textY =
        y1 -
        (Math.abs(y2 - y1) * Math.abs(textX - x1)) / Math.abs(x2 - x1) -
        10;
    } else if (y1 === y2) {
      textY = y1 - 4;
    } else {
      textY =
        (Math.abs(y2 - y1) * Math.abs(textX - x1)) / Math.abs(x2 - x1) +
        y1 +
        10;
    }
    const lineText = snap.text(textX, textY, tips);
    lineText.attr({
      fontSize: 10
    });
  }

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
    id: `arrowLine_${id}`,
    markerEnd: markerEnd,
    ...rest
  };

  arrowLine.attr(attrs);

  return arrowLine;
}
ArrowLine.prototype.type = "ArrowLine";

export { ArrowLine };
