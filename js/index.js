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

    var app = asteroid(logger, context, maxx, maxy);
    var hudItem = hud(context, 1, 1, 700);
    hudItem.setTitle("Asteroid");

    app.addItem(hudItem);

    var x, y, c, r;
    for (var i = 0; i < 50; i++) {
      x = Math.floor(Math.random() * maxx + minx);
      y = Math.floor(Math.random() * (maxy) + miny);

      r = Math.floor(Math.random() * 4) + 1;
      switch (r) {
        case 4:
          c = "#eeeeee";
          break;
        case 3:
          c = "#cccccc";
          break;
        case 2:
          c = "#aaaaaa";
          break;
        default:
          c = "#888888";
      }

      app.addItem(star(context, c, x, y, r));
    }
    app.run();
  } catch (err) {
    logger.error("Application error occurred: " + err.toString());
  }
}
