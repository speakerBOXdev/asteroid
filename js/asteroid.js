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
    bounceRate = -0.5,
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

    var newXSpeed = xspeed,
      newYSpeed = yspeed;

    x = x - xspeed;
    if (x < xmin + radius) {
      x = xmin + radius;
      newXSpeed *= bounceRate;
    } else if (x > xmax - radius) {
      x = xmax - radius;
      newXSpeed *= bounceRate;
    }

    y = y - yspeed;
    if (y < ymin + radius) {
      y = ymin + radius;
      newYSpeed *= bounceRate;
    } else if (y > ymax - radius) {
      y = ymax - radius;
      newYSpeed *= bounceRate;
    }

    setSpeed(newXSpeed, newYSpeed);
  }

  function setBounds(minX, minY, maxX, maxY) {
    xmin = minX;
    ymin = minY;
    xmax = maxX;
    ymax = maxY;
  }

  function setSpeed(speedX, speedY) {
    if (speedX != xspeed || speedY != yspeed) {
      xspeed = speedX;
      yspeed = speedY;
      logger.debug(`asteroid speed updated => xspeed:${xspeed};yspeed:${yspeed}`);
    }
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
