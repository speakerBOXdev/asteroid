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
    healthBarXPositions = [600, 620, 640, 660, 680],
    maxHealth = 100,
    healthDivisor = maxHealth / healthBarXPositions.length,
    healthValues = [];

  var frameBorderColor = "#666666",
    frameBackgroundColor = "#333333",
    fontColor = "#DDDDDD",
    fontStyle = "14px Arial"
  titleFontStyle = "18px Arial";

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
    context.fillText("Health", 550, height - padding);

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
    context.fillRect(xPosition, 5, 15, 20);

    context.strokeStyle = strokeStyle;
    context.strokeRect(xPosition, 5, 15, 20);
  }

  function drawPoints() {
    context.fillStyle = fontColor;
    context.font = fontStyle;
    context.fillText("Score: " + points, padding, height - padding);
  }

  function drawTitle() {
    context.fillStyle = fontColor;
    context.font = titleFontStyle;
    context.fillText(title, 250, height - padding);
  };

  setHealth(maxHealth);

  return {
    draw: draw,
    setHealth: setHealth,
    setPoints: setPoints,
    setTitle: setTitle,
  };
}

/******
 * OBJECT headsUpDisplay - area for displaying hitpoints and score
 *
 * Parameters:
 *   x - left position
 *   y - top position
 *	 width - width of area
 *****/
function headsUpDisplay(x, y, width) {

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = 30;

  this.fontColor = "#dddddd";
  this.fontStyle = "14px Times";
  this.padding = 10;

  this.health = 100;
  this.points = 0;

  this.draw = function(context) {

    // Draw Frame
    context.strokeStyle = "#666666";
    context.fillStyle = "#333333";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeRect(this.x + 1, this.y, this.width - 3, this.height);

    // Draw Points & Health
    this.drawHealth(context);
    this.drawPoints(context);
  }

  this.drawHealth = function(context) {

    if (this.health <= 0) {
      // TODO: Draw GAME OVER

      // Health Text
      context.fillStyle = this.fontColor;
      context.font = "14px Times";
      context.fillText("Game Over", 550, this.height - this.padding);
    } else {

      // Health Text
      context.fillStyle = "#FFFFFF";
      context.font = this.fontStyle;
      context.fillText("Health:", 540, 20);

      context.lineWidth = 2;

      var status1 = "none";
      var status2 = "none";
      var status3 = "none";
      var status4 = "none";
      var status5 = "none";

      if (this.health < 20) {
        status1 = "bad";
      } else if (this.health < 40) {
        status1 = "good";
        status2 = "bad";
      } else if (this.health < 60) {
        status1 = "good";
        status2 = "good";
        status3 = "bad";
      } else if (this.health < 80) {
        status1 = "good";
        status2 = "good";
        status3 = "good";
        status4 = "bad";
      } else if (this.health < 100) {
        status1 = "good";
        status2 = "good";
        status3 = "good";
        status4 = "good";
        status5 = "bad";
      } else {
        status1 = "good";
        status2 = "good";
        status3 = "good";
        status4 = "good";
        status5 = "good";
      }

      this.drawHealthBar(600, status1, context);
      this.drawHealthBar(620, status2, context);
      this.drawHealthBar(640, status3, context);
      this.drawHealthBar(660, status4, context);
      this.drawHealthBar(680, status5, context);
    }
  }

  this.drawHealthBar = function(x, status, context) {

    switch (status) {
      case "good":
        context.fillStyle = "#009900";
        context.strokeStyle = "#33bb33";
        break;
      case "bad":
        context.fillStyle = "#660000";
        context.strokeStyle = "#bb3333";
        break;
      default:
        context.fillstyle = "#333333";
        context.strokeStyle = "#666666";

    }

    context.fillRect(x, 5, 15, 20);
    context.strokeRect(x, 5, 15, 20);
  }

  this.drawPoints = function(context) {

    context.fillStyle = this.fontColor;
    context.font = this.fontStyle;
    context.fillText("Score: " + this.points, this.padding, this.height - this.padding);

  }
} // END headsUpDisplay */
