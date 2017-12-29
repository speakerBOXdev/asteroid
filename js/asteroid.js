var asteroid = function(asteroidLogger, asteroidContext, asteroidColor, xPosition, yPosition, asteroidRadius) {
  if (!asteroidLogger)
    throw "Parameter: 'asteroidLogger' is undefined.";
  if (!asteroidContext)
    throw "Parameter: 'asteroidContext' is undefined.";
  if (!asteroidColor)
    throw "Parameter: 'asteroidColor' is undefined.";
  if (!xPosition)
    throw "Parameter: 'xPosition' is undefined.";
  if (!yPosition)
    throw "Parameter: 'yPosition' is undefined.";
  if (!asteroidRadius)
    throw "Parameter: 'asteroidRadius' is undefined.";

  var logger = asteroidLogger,
    context = asteroidContext,
    color = asteroidColor,
    x = xPosition,
    y = yPosition,
    radius = asteroidRadius,
    xspeed = 10,
    yspeed = 10;

  function draw() {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  };

  /**
   * @name getX
   * @description returns the current x position
   */
  function getX() {
    return x;
  }

  /**
   * @name getY
   * @description returns the current y position
   */
  function getY() {
    return y;
  }


  /**
   * @name move
   * @description updates the position of star
   */
  function move() {
    x = x - xspeed;
    y = y - yspeed;
  }

  return {
    draw: draw,
    getX: getX,
    getY: getY,
    move: move,
  };
}
