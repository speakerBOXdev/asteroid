var asteroid = function(asteroidLogger, asteroidContext, asteroidColor, xPosition, yPosition, asteroidRadius, asteroidSpeedX, asteroidSpeedY) {
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
  if (!asteroidSpeedX)
    throw "Parameter: 'asteroidSpeedX' is undefined.";
  if (!asteroidSpeedY)
    throw "Parameter: 'asteroidSpeedY' is undefined.";

  var logger = asteroidLogger,
    context = asteroidContext,
    color = asteroidColor,
    x = xPosition,
    y = yPosition,
    radius = asteroidRadius,
    xspeed = asteroidSpeedX,
    yspeed = asteroidSpeedY,
    xmin, ymin, xmax, ymax;

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
    if (!xmin || !xmax || !ymin || !ymax)
      throw 'asteroid.move() called without set bounds.';

    var oldx = x,
      oldy = y;

    x = x - xspeed;
    if (x < xmin || x > xmax) {
      x = oldx;
    }

    y = y - yspeed;
    if (y < ymin || y > ymax)
      y = oldy;
  }

  function setBounds(minX, minY, maxX, maxY) {
    xmin = minX;
    ymin = minY;
    xmax = maxX;
    ymax = maxY;
  }

  logger.debug(`asteroid created => radius${radius};xspeed${xspeed};yspeed:${yspeed}`);
  return {
    draw: draw,
    getX: getX,
    getY: getY,
    move: move,
    setBounds: setBounds
  };
}
