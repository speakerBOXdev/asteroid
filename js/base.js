var base = function(baseContext, xPosition, yPosition) {
  if (!baseContext)
    throw "Parameter: 'baseContext' is undefined.";
  if (!xPosition)
    throw "Parameter: 'xPosition' is undefined.";
  if (!yPosition)
    throw "Parameter: 'yPosition' is undefined.";

  var context = baseContext,
    x = xPosition,
    y = yPosition,
    width = 100,
    height = 100;

  /* Styles */
  var fillColor = "#3333DD",
    strokeColor = "#5555FF";

  draw = function(context) {
    context.fillStyle = fillStyle;
    context.fillRect(x, y, width, height);

    context.strokeStyle = strokeStyle;
    context.strokeRect(x, y, width, height);
  }

  return {
    draw: draw
  };
}
