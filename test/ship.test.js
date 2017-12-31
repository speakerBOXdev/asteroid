var undertest,
  logger = fakeLog,
  context = fakeContext,
  xPosition = 10,
  yPosition = 20,
  xspeed = 3,
  yspeed = 4,
  minx = 1,
  miny = 2,
  maxx = 101,
  maxy = 102,
  radius = 5,
  color = '#aaabbb',
  twoxpi = Math.PI * 2,
  drawAntiClockwise = true;

QUnit.module("ship");

QUnit.test("init", function(assert) {
  undertest = ship(logger, context, color, xPosition, yPosition, radius);
  assert.ok(ship, "Object initialized.");
  assert.equal(undertest.getX(), xPosition, "x position set.");
  assert.equal(undertest.getY(), yPosition, "y position set.");
});

QUnit.test("init no logger", function(assert) {
  assert.throws(function() {
      ship();
    },
    function(err) {
      return err.toString() === "Parameter: 'shipLogger' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no context", function(assert) {
  assert.throws(function() {
      ship(logger);
    },
    function(err) {
      return err.toString() === "Parameter: 'shipContext' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no color", function(assert) {
  assert.throws(function() {
      ship(logger, context);
    },
    function(err) {
      return err.toString() === "Parameter: 'shipColor' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no xPosition", function(assert) {
  assert.throws(function() {
      ship(logger, context, color);
    },
    function(err) {
      return err.toString() === "Parameter: 'xPosition' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no yPosition", function(assert) {
  assert.throws(function() {
      ship(logger, context, color, xPosition);
    },
    function(err) {
      return err.toString() === "Parameter: 'yPosition' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no radius", function(assert) {
  assert.throws(function() {
      ship(logger, context, color, xPosition, yPosition);
    },
    function(err) {
      return err.toString() === "Parameter: 'shipRadius' is undefined.";
    },
    'Error thrown');
});

QUnit.test("draw", function(assert) {
  var spyContextBeginPath = sinon.spy(context, "beginPath");
  var spyContextArc = sinon.spy(context, "arc");
  var spyContextClosePath = sinon.spy(context, "closePath");
  var spyContextFill = sinon.spy(context, "fill");

  undertest = ship(logger, context, color, xPosition, yPosition, radius);

  undertest.draw();

  assert.equal(context.fillStyle, color, "fillColor set");
  assert.ok(spyContextBeginPath.calledOnce, "beginPath calledOnce");
  assert.ok(spyContextBeginPath.calledBefore(spyContextArc), "beginPath before arg");
  assert.ok(spyContextArc
    .withArgs(xPosition, yPosition, radius, startAngle, twoxpi, drawAntiClockwise)
    .calledOnce, "arc calledOnce");
  assert.ok(spyContextArc.calledBefore(spyContextClosePath), "arc before closePath");
  assert.ok(spyContextClosePath.calledOnce, "closePath calledOnce");
  assert.ok(spyContextClosePath.calledBefore(spyContextFill), "closePath before fill");
  assert.ok(spyContextFill.calledOnce, "fill calledOnce");

  context.beginPath.restore();
  context.arc.restore();
  context.closePath.restore();
  context.fill.restore();
});

QUnit.test("move", function(assert) {

  undertest = ship(logger, context, color, xPosition, yPosition, radius);
  undertest.setBounds(minx, miny, maxx, maxy);
  undertest.setSpeed(xspeed, yspeed);
  undertest.move();

  assert.equal(undertest.getX(), xPosition - xspeed, "x position updated.");
  assert.equal(undertest.getY(), yPosition - yspeed, "y position updated.");
});

QUnit.test("move no bounds", function(assert) {
  undertest = ship(logger, context, color, xPosition, yPosition, radius);
  assert.throws(function() {
      undertest.move();
    },
    function(err) {
      return err.toString() === "ship.move() called without set bounds."
    },
    "Error thrown");
});

QUnit.test("keyEvent left", function(assert) {
  undertest = ship(logger, context, color, xPosition, yPosition, radius);
  undertest.setBounds(minx, miny, maxx, maxy);

  undertest.handleKeyEvent({
    keyCode: 37
  });
  undertest.move();

  assert.equal(undertest.getX(), xPosition - 1, "x position updated left.");
});

QUnit.test("keyEvent right", function(assert) {
  undertest = ship(logger, context, color, xPosition, yPosition, radius);
  undertest.setBounds(minx, miny, maxx, maxy);

  undertest.handleKeyEvent({
    keyCode: 39
  });
  undertest.move();

  assert.equal(undertest.getX(), xPosition + 1, "x position updated right.");
});

QUnit.test("keyEvent up", function(assert) {
  undertest = ship(logger, context, color, xPosition, yPosition, radius);
  undertest.setBounds(minx, miny, maxx, maxy);

  undertest.handleKeyEvent({
    keyCode: 38
  });
  undertest.move();

  assert.equal(undertest.getY(), yPosition - 1, "y position updated up.");
});

QUnit.test("keyEvent down", function(assert) {
  undertest = ship(logger, context, color, xPosition, yPosition, radius);
  undertest.setBounds(minx, miny, maxx, maxy);

  undertest.handleKeyEvent({
    keyCode: 40
  });
  undertest.move();

  assert.equal(undertest.getY(), yPosition + 1, "y position updated down.");
});

QUnit.test("prevent exit left", function(assert) {
  var expectedXPosition = minx + radius;
  undertest = ship(logger, context, color, minx, yPosition, radius);
  undertest.setBounds(minx, miny, maxx, maxy);
  undertest.setSpeed(1, 0);

  undertest.move();

  assert.notOk(undertest.getX() < minx, "x position not less that min");
  assert.equal(undertest.getX(), expectedXPosition, "x position set to acceptable position");
});

QUnit.test("prevent exit right", function(assert) {
  var expectedXPosition = maxx - radius;
  undertest = ship(logger, context, color, maxx, yPosition, radius);
  undertest.setBounds(minx, miny, maxx, maxy);
  undertest.setSpeed(-1, 0);

  undertest.move();

  assert.notOk(undertest.getX() > maxx, "x position not greater that max");
  assert.equal(undertest.getX(), expectedXPosition, "x position set to acceptable position");
});

QUnit.test("prevent exit top", function(assert) {
  var expectedYPosition = miny + radius;
  undertest = ship(logger, context, color, xPosition, miny, radius);
  undertest.setBounds(minx, miny, maxx, maxy);
  undertest.setSpeed(0, -1);

  undertest.move();

  assert.notOk(undertest.getY() < miny, "y position not less that min");
  assert.equal(undertest.getY(), expectedYPosition, "y position set to acceptable position.");
});

QUnit.test("prevent exit bottom", function(assert) {
  var expectedYPosition = maxy - radius;
  undertest = ship(logger, context, color, xPosition, maxy, radius);
  undertest.setBounds(minx, miny, maxx, maxy);
  undertest.setSpeed(0, 1);

  undertest.move();

  assert.notOk(undertest.getY() > maxy, "y position not greater that max");
  assert.equal(undertest.getY(), expectedYPosition, "y position set to acceptable position.");
});
