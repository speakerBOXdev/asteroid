var undertest,
  logger = fakeLog,
  context = fakeContext,
  color = "#FFAABB"
xPosition = 10,
  yPosition = 10,
  radius = 100;

QUnit.module("asteroid");

QUnit.test("init", function(assert) {
  undertest = asteroid(logger, context, color, xPosition, yPosition, radius);
  assert.ok(undertest, "Object initialized.");
});

QUnit.test("init no logger", function(assert) {
  assert.throws(function() {
      undertest = asteroid();
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidLogger' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no context", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger);
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidContext' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no color", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context);
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidColor' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no xPosition", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context, color);
    },
    function(err) {
      return err.toString() === "Parameter: 'xPosition' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no yPosition", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context, color, xPosition);
    },
    function(err) {
      return err.toString() === "Parameter: 'yPosition' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no radius", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context, color, xPosition, yPosition);
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidRadius' is undefined."
    },
    "Error thrown");
});

QUnit.test("draw", function(assert) {
  var spyContextBeginPath = sinon.spy(context, "beginPath");
  var spyContextArc = sinon.spy(context, "arc");
  var spyContextClosePath = sinon.spy(context, "closePath");
  var spyContextFill = sinon.spy(context, "fill");

  undertest = asteroid(logger, context, color, xPosition, yPosition, radius);

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

    undertest = asteroid(logger, context, color, xPosition, yPosition, radius);

  undertest.move();

  assert.notEqual(undertest.getX(), xPosition, "x position changed.");
  assert.notEqual(undertest.getY(), yPosition, "y position changed.");
});
