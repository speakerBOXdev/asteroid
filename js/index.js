
function setup() {

  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext("2d");
  var divStatus = document.getElementById("status");

  var logger = log(LogLevel.Debug, divStatus);
  try {

    var minx = 0;
    var miny = 0;
    var maxx = 700;
    var maxy = 400;

    var app = game(logger, context, maxx, maxy);

    var xPosition, yPosition, color, radius;
    for (var i = 0; i < 50; i++) {
      xPosition = Math.floor(Math.random() * (maxx + minx)) + 1;
      yPosition = Math.floor(Math.random() * (maxy + miny)) + 1;
      radius = Math.floor(Math.random() * 4) + 1;

      // Apply transparency relative to the size.
      // This appears to add depth to the image.
      var transparency = radius / 4;
      color = `rgba(220, 220, 220, ${transparency})`

      app.addItem(star(context, color, xPosition, yPosition, radius));
    }

    for (var asteroidIndex = 0; asteroidIndex < 5; asteroidIndex++) {

      radius = Math.floor(Math.random() * 10) + 10;
      xPosition = Math.floor(Math.random() * (maxx - radius)) + (minx + radius) + 1;
      yPosition = Math.floor(Math.random() * (maxy - radius)) + (miny + radius) + 1;

      // Apply transparency relative to the size.
      // This appears to add depth to the image.
      var transparency = radius / 4;
      color = `rgba(220, 100, 100, ${transparency})`

      var xspeed = undefined,
        yspeed = undefined;
      while (!xspeed) {
        xspeed = Math.random() * 3 - 1;
      }
      while (!yspeed) {
        yspeed = Math.random() * 3 - 1;
      }
      app.addItem(asteroid(logger, context, color, xPosition, yPosition, radius, xspeed, yspeed));
    }

    var baseItem = base(logger, context, 650, 350);
    app.addItem(baseItem);

    var shipItem = ship(logger, context, '#9999ff', 35, 75, 20);
    app.addItem(shipItem);

    window.addEventListener('keydown', shipItem.handleKeyEvent, true);

    var hudItem = hud(logger, context, 1, 1, 700);
    hudItem.setTitle("Asteroid Dodger");
    hudItem.setHealth("100");

    app.addItem(hudItem);

    window.addEventListener('keydown', app.handleKeyEvent, true);

    app.run();
  } catch (err) {
    logger.error("Application error occurred: " + err.toString());
  }
}
