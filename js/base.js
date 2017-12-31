var base = function(baseLogger, baseContext, xPosition, yPosition, baseWidth, baseHeight) {
  if (!baseLogger)
    throw "Parameter: 'baseLogger' is undefined.";
  if (!baseContext)
    throw "Parameter: 'baseContext' is undefined.";
  if (!xPosition)
    throw "Parameter: 'xPosition' is undefined.";
  if (!yPosition)
    throw "Parameter: 'yPosition' is undefined.";
  if (!baseWidth)
    baseWidth = 50;
  if (!baseHeight)
    baseHeight = 50;

  var logger = baseLogger,
    context = baseContext,
    x = xPosition,
    y = yPosition,
    width = baseWidth,
    height = baseHeight;

  /* Styles */
  var fillStyle = "#3333DD",
    strokeStyle = "#5555FF";

  draw = function() {
    context.fillStyle = fillStyle;
    context.fillRect(x, y, width, height);

    context.strokeStyle = strokeStyle;
    context.strokeRect(x, y, width, height);
    logger.trace("base draw");
  };

  logger.debug(`base created => x:${x};y:${y};width:${width};height:${height}`);

  return {
    draw: draw
  };
}
