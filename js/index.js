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
    var hudItem = hud(logger, context, 1, 1, 700);
    hudItem.setTitle("Asteroid Dodger");
    hudItem.setHealth("100");

    app.addItem(hudItem);

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
    app.run();
  } catch (err) {
    logger.error("Application error occurred: " + err.toString());
  }
}
