var asteroid = function(asteroidLogger, asteroidContext, maxXPosition, maxYPosition, minXPosition, minYPosition) {
  if (!asteroidLogger)
    throw "Parameter: 'asteroidLogger' is undefined.";
  if (!asteroidContext)
    throw "Parameter: 'asteroidContext' is undefined."
  if (!maxXPosition)
    throw "Parameter: 'maxXPosition' is undefined.";
  if (!maxYPosition)
    throw "Parameter: 'maxYPosition' is undefined.";

  if (!minXPosition)
    minXPosition = 0;
  if (!minYPosition)
    minYPosition = 0;

  var logger = asteroidLogger,
    context = asteroidContext,
    xmin = minXPosition,
    ymin = minYPosition,
    xmax = maxXPosition,
    ymax = maxYPosition,
    asteroidHud,
    gameInterval,
    maxRepeat = -50, // Debugging only
    refreshRate = 30,
    items = [];

  /* Style */
  var backgroundColor = "#000000";

  function addItem(item) {
    if (item) {
      items.push(item);
    }
  };

  function start() {
    //run();
    logger.info("Asteroid Game Initialized.");
  };

  function run() {
    if (!gameInterval) {
      try {
        gameInterval = window.setInterval(mainLoop, refreshRate);
      } catch (err) {
        logger.warn("Could not start. " + err.toString());
        pause();
      }
    }
  }

  function pause() {
    if (gameInterval) {
      try {
        clearInterval(gameInterval);
        gameInterval = undefined;
        logger.info("Game Paused.");
      } catch (err) {
        logger.warn("Could not pause. " + err.toString());
      }
    }
  }

  function mainLoop() {
    try {
      drawBackground();

      drawItems();

      moveItems();

      if (!maxRepeat || maxRepeat++ == 0)
        pause();

    } catch (renderError) {
      logger.error("Error during render. " + renderError.toString());
      pause();
    }
  }

  function drawBackground() {
    context.fillStyle = backgroundColor;
    context.fillRect(xmin, ymin, xmax, ymax);
  };

  function drawItems() {
    logger.trace("Draw items");
    for (var i = 0; i < items.length; i++) {
      if (items[i].draw) {
        items[i].draw();
      }
    }
  }

  function moveItems() {
    logger.trace("move items");
    for (var i = 0; i < items.length; i++) {
      if (items[i].move) {
        items[i].move();
      }
    }
  }

  start();

  return {
    run: run,
    pause: pause,
    addItem: addItem
  };
}
