var game = function(gameLogger, gameContext, maxXPosition, maxYPosition, minXPosition, minYPosition, rate) {
  if (!gameLogger)
    throw "Parameter: 'gameLogger' is undefined.";
  if (!gameContext)
    throw "Parameter: 'gameContext' is undefined."
  if (!maxXPosition)
    throw "Parameter: 'maxXPosition' is undefined.";
  if (!maxYPosition)
    throw "Parameter: 'maxYPosition' is undefined.";

  if (!minXPosition)
    minXPosition = 0;
  if (!minYPosition)
    minYPosition = 0;
  if (!rate)
    rate = 30;

  var logger = gameLogger,
    context = gameContext,
    xmin = minXPosition,
    ymin = minYPosition,
    xmax = maxXPosition,
    ymax = maxYPosition,
    gameInterval,
    maxRepeat = -50, // Debugging only
    refreshRate = rate,
    items = [];

  /* Style */
  var backgroundColor = "#000000";

  function addItem(item) {
    if (item) {
      items.push(item);
    }
  };

  function run() {

    if (!gameInterval) {
      try {
        gameInterval = setInterval(mainLoop, refreshRate);
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

  function handleKeyEvent(keyEvent) {
    switch (keyEvent.keyCode) {
      case 27:
        pause();
        break;
      case 32:
        run();
        break;
      default:
        // Unregistered keyCode. Do nothing.
        break;
    }
  }

  return {
    addItem: addItem,
    handleKeyEvent: handleKeyEvent,
    pause: pause,
    run: run
  };
}
