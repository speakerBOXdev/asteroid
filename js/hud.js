var hud = function(hudLogger, hudContext, minXPosition, minYPosition, hudWidth) {
  if (!hudLogger)
    throw "Parameter: 'hudLogger' is undefined.";
  if (!hudContext)
    throw "Parameter: 'hudContext' is undefined.";
  if (!minXPosition)
    throw "Parameter: 'minXPosition' is undefined.";
  if (!minYPosition)
    throw "Parameter: 'minYPosition' is undefined.";
  if (!hudWidth)
    throw "Parameter: 'hudWidth' is undefined.";

  var logger = hudLogger,
    context = hudContext,
    x = minXPosition,
    y = minYPosition,
    width = hudWidth,
    height = 30,
    padding = 10,
    health = 0,
    points = 0,
    title = "",
    titleX,
    healthTextX,
    healthTextY,
    healthBarWidth,
    healthBarHeight,
    healthBarXPositions = [],
    maxHealth = 100,
    healthDivisor = maxHealth / healthBarXPositions.length,
    healthValues = [];

  var frameBorderColor = "#666666",
    frameBackgroundColor = "#333333",
    fontColor = "#DDDDDD",
    fontStyle = "14px Arial"
  titleFontStyle = "18px Arial";

  function setPositions() {

    healthBarY = 5;
    healthTextY = height - padding;

    healthBarWidth = 15;
    healthBarHeight = 20;

    titleX = width / 2 - 100;

    var healthBarCount = 5;

    healthTextX = width - (healthBarCount * healthBarWidth) - 50;

    for (var i = healthBarCount; i > 0; i--) {
      healthBarXPositions.push(width - (i * healthBarWidth));
    }
  }

  function draw() {
    drawFrame();
    drawTitle();
    drawHealth();
    drawPoints();
  };

  function setHealth(value) {
    if (value) {
      health = value;
      healthValues = [];

      var calcHealth = health;
      for (var x = healthBarXPositions.length; x > 0; x--) {
        var barValue = calcHealth - (healthDivisor * (x - 1));
        if (barValue < 0) barValue = 0;
        healthValues.push(barValue);
        calcHealth -= barValue;
      }
      logger.debug("Health set:" + value);
    }
  }

  function setPoints(value) {
    if (value) {
      points = value;
    }
  }

  function setTitle(value) {
    if (value) {
      title = value;
    }
  }

  function drawFrame() {
    // Draw background
    context.fillStyle = frameBackgroundColor;
    context.fillRect(x, y, width, height);
    // Draw border
    context.strokeStyle = frameBorderColor;
    context.strokeRect(x + 1, y, width - 3, height);
  }

  function drawHealth() {
    // Draw text
    context.fillStyle = fontColor;
    context.font = fontStyle;
    context.fillText("Health", healthTextX, healthTextY);

    // Draw bars of health
    for (var i = 0; i < healthBarXPositions.length; i++) {
      drawHealthBar(healthBarXPositions[i], healthValues[i]);
    }
  };

  function drawHealthBar(xPosition, value) {

    var maxBarValue = maxHealth / healthValues.length;

    var r = 102,
      g = 155,
      b = 74,
      a = value / maxBarValue; // percentage of max bar health

    if (a < 0.3) {
      r = 193;
      g = 53;
      b = 29;
    }

    var fillStyle = `rgba(${r},${g},${b},${a})`,
      strokeStyle = "#666666";

    context.fillStyle = fillStyle;
    context.fillRect(xPosition, healthBarY, healthBarWidth, healthBarHeight);

    context.strokeStyle = strokeStyle;
    context.strokeRect(xPosition, healthBarY, healthBarWidth, healthBarHeight);
  }

  function drawPoints() {
    context.fillStyle = fontColor;
    context.font = fontStyle;
    context.fillText("Score: " + points, padding, healthTextY);
  }

  function drawTitle() {
    context.fillStyle = fontColor;
    context.font = titleFontStyle;
    context.fillText(title, titleX, healthTextY);
  };

  setHealth(maxHealth);
  setPositions();

  logger.debug(`hud created => x:${x};y:${y};width:${width}`)

  return {
    draw: draw,
    setHealth: setHealth,
    setPoints: setPoints,
    setTitle: setTitle,
  };
}
