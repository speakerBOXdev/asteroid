/// <reference path="js/game.js" />

var context = fakeContext;
var logger = fakeLog;
var undertest,
  minX = 0,
  minY = 0,
  maxX = 100,
  maxY = 100;

QUnit.module("game");


QUnit.test("init", function(assert) {
  var spyContextFillRect = sinon.spy(context, "fillRect");

  undertest = game(fakeLog, context, maxX, maxY, minX, minY);
  assert.ok(undertest, "Object initialized");
  //assert.equal(spyContextFillRect.withArgs(minX, minY, maxX, maxY).callCount, 5, "fillRect background 5x");
  context.fillRect.restore();
});

QUnit.test("init no logger", function (assert) {
  assert.throws(function () { game(); },
      function (err) {
         return err.toString() === "Parameter: 'gameLogger' is undefined.";
       },
      'Error thrown');
});

QUnit.test("init no context", function (assert) {
  assert.throws(function () { game(fakeLog); },
      function (err) {
         return err.toString() === "Parameter: 'gameContext' is undefined.";
       },
      'Error thrown');
});

QUnit.test("init no maxX", function (assert) {
  assert.throws(function () { game(fakeLog, context); },
      function (err) {
         return err.toString() === "Parameter: 'maxXPosition' is undefined.";
       },
      'Error thrown');
});

QUnit.test("init no maxY", function (assert) {
  assert.throws(function () { game(fakeLog, context, maxX); },
      function (err) {
         return err.toString() === "Parameter: 'maxYPosition' is undefined.";
       },
      'Error thrown');
});
