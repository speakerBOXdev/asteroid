/// <reference path="js/game.js" />

var context = fakeContext;
var logger = fakeLog;
var undertest,
  minX = 0,
  minY = 0,
  maxX = 100,
  maxY = 100,
  refreshRate = 3;

QUnit.module("game");


QUnit.test("init", function(assert) {
  undertest = game(logger, context, maxX, maxY, minX, minY);
  assert.ok(undertest, "Object initialized");
});

QUnit.test("init no logger", function(assert) {
  assert.throws(function() {
      game();
    },
    function(err) {
      return err.toString() === "Parameter: 'gameLogger' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no context", function(assert) {
  assert.throws(function() {
      game(logger);
    },
    function(err) {
      return err.toString() === "Parameter: 'gameContext' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no maxX", function(assert) {
  assert.throws(function() {
      game(logger, context);
    },
    function(err) {
      return err.toString() === "Parameter: 'maxXPosition' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no maxY", function(assert) {
  assert.throws(function() {
      game(logger, context, maxX);
    },
    function(err) {
      return err.toString() === "Parameter: 'maxYPosition' is undefined.";
    },
    'Error thrown');
});

QUnit.test("run", function(assert) {
  var clock = sinon.useFakeTimers();
  var spyContextFillRect = sinon.spy(context, "fillRect");
  undertest = game(logger, context, maxX, maxY, 0, 0, refreshRate);

  undertest.run();

  // Move one cycle
  clock.tick(refreshRate);

  assert.equal(spyContextFillRect.withArgs(0, 0, maxX, maxY).callCount, 1, "background fillRect calledOnce");
  context.fillRect.restore();
});

QUnit.test("run with item", function(assert) {

  var clock = sinon.useFakeTimers();
  var spyContextFillRect = sinon.spy(context, "fillRect");
  undertest = game(logger, context, maxX, maxY, 0, 0, refreshRate);

  var mockItem = sinon.mock(fakeGameItem);
  mockItem.expects("draw").once;
  mockItem.expects("move").once;

  undertest.addItem(fakeGameItem);

  undertest.run();

  // Move one cycle
  clock.tick(refreshRate);

  assert.equal(spyContextFillRect.withArgs(0, 0, maxX, maxY).callCount, 1, "background fillRect calledOnce");
  context.fillRect.restore();

  assert.ok(mockItem.verify(), "mockItem called");
});

QUnit.test("run with item no methods", function(assert) {

  var clock = sinon.useFakeTimers();
  var spyContextFillRect = sinon.spy(context, "fillRect");
  undertest = game(logger, context, maxX, maxY, 0, 0, refreshRate);

  undertest.addItem({});

  // Run should not fail when an item does not have draw or move
  undertest.run();

  // Move one cycle
  clock.tick(refreshRate);

  assert.equal(spyContextFillRect.withArgs(0, 0, maxX, maxY).callCount, 1, "background fillRect calledOnce");
  context.fillRect.restore();
});

QUnit.test("key event esc", function(assert) {

  var clock = sinon.useFakeTimers();
  undertest = game(logger, context, maxX, maxY, 0, 0, refreshRate);

  var mockItem = sinon.mock(fakeGameItem);
  mockItem.expects("draw").never();
  mockItem.expects("move").never();

  undertest.addItem(fakeGameItem);

  undertest.run();

  // key event causes game loop to pause
  undertest.handleKeyEvent({
    keyCode: 27
  });

  // Move one cycle
  clock.tick(refreshRate);

  assert.ok(mockItem.verify(), "mockItem never called");
});

QUnit.test("key event spacebar", function(assert) {

  var clock = sinon.useFakeTimers();
  undertest = game(logger, context, maxX, maxY, 0, 0, refreshRate);

  var mockItem = sinon.mock(fakeGameItem);
  mockItem.expects("draw").once;
  mockItem.expects("move").once;

  undertest.addItem(fakeGameItem);

  // key event causes game loop to run
  undertest.handleKeyEvent({
    keyCode: 32
  });

  // Move one cycle
  clock.tick(refreshRate);

  assert.ok(mockItem.verify(), "mockItem called");
});
