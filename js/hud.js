var hud = function(hudContext, minXPosition, minYPosition, hudWidth) {
  if (!hudContext)
    throw "Parameter: 'hudContext' is undefined.";
  if (!minXPosition)
    throw "Parameter: 'minXPosition' is undefined.";
  if (!minYPosition)
    throw "Parameter: 'minYPosition' is undefined.";
  if (!hudWidth)
    throw "Parameter: 'hudWidth' is undefined.";

  var context = hudContext,
  x = minXPosition,
  y = minYPosition,
  width = hudWidth,
  height = 30;

  var frameBorderColor = "#666666",
    frameBackgroundColor = "#333333";

  function draw() {

    drawFrame();
  };

  function drawFrame() {
    context.fillStyle = frameBackgroundColor;
    context.fillRect(x, y, width, height);

    context.strokeStyle = frameBorderColor;
    context.strokeRect(x + 1, y, width - 3, height);
  }

  return {
    draw: draw
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
