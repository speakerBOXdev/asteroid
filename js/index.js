function setup(canvasId, logContainerId) {

  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");
  var divStatus = document.getElementById(logContainerId);

  var logger = log(LogLevel.Debug, divStatus);
  try {

    var minx = 1;
    var miny = 32; // account for hud height
    var maxx = canvas.width;
    var maxy = canvas.height;

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
      var asteroidItem = asteroid(logger, context, color, xPosition, yPosition, radius, xspeed, yspeed);
      asteroidItem.setBounds(minx, miny, maxx, maxy);
      app.addItem(asteroidItem);
    }

    var baseItem = base(logger, context, maxx - 50, maxy - 50);
    app.addItem(baseItem);

    var shipItem = ship(logger, context, '#9999ff', 35, 75, 20);
    shipItem.setBounds(minx, miny, maxx, maxy);
    app.addItem(shipItem);

    window.addEventListener('keydown', shipItem.handleKeyEvent, true);

    var hudItem = hud(logger, context, 1, 1, maxx);
    hudItem.setTitle("Asteroid Dodger");
    hudItem.setHealth("100");

    app.addItem(hudItem);

    window.addEventListener('keydown', app.handleKeyEvent, true);

    app.run();
  } catch (err) {
    logger.error("Application error occurred: " + err.toString());
  }
}
