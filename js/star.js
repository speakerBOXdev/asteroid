/**
 * @name star
 * @description returns a Star
 * @param starContext Canvas 2DContext on which to render Star
 * @param starColor Color of star; Used as context.fillColor. Example: '#FFFFFF'
 * @param starX x location of star
 * @param starY y location of star
 * @param starRadius Determines Star size
 */
var star = function(starContext, starColor, starX, starY, starRadius) {

  if (!starContext)
    throw "Parameter: 'starContext' is undefined.";
  if (!starColor)
    throw "Parameter: 'starColor' is undefined.";
  if (!starX)
    throw "Parameter: 'starX' is undefined.";
  if (!starY)
    throw "Parameter: 'starY' is undefined.";
  if (!starRadius)
    throw "Parameter: 'starRadius' is undefined.";

  var context = starContext,
    color = starColor,
    x = starX,
    y = starY,
    radius = starRadius,
    xspeed = 1, // hardcoded value makes all instances move the same
    yspeed = 1; // hardcoded value  makes all instances move the same

  /**
  * @name draw
  * @description renders star on context
  */
  function draw() {
    context.fillColor = color;
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
    move: move
  };
}
