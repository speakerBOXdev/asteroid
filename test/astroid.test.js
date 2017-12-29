/// <reference path="js/astroid.js" />

var context = fakeContext;
var fakeLog = {
  trace: function() {},
  debug: function() {},
  info: function() {},
  warn: function() {},
  error: function() {}
}

var undertest,
  minX = 0,
  minY = 0,
  maxX = 100,
  maxY = 100;

QUnit.module("astroid");


QUnit.test("init", function(assert) {
  var spyContextFillRect = sinon.spy(context, "fillRect");

  undertest = astroid(fakeLog, context, maxX, maxY, minX, minY);
  assert.ok(undertest, "Object initialized");
  //assert.equal(spyContextFillRect.withArgs(minX, minY, maxX, maxY).callCount, 5, "fillRect background 5x");
  context.fillRect.restore();
});

QUnit.test("init no logger", function (assert) {
  assert.throws(function () { astroid(); },
      function (err) {
         return err.toString() === "Parameter: 'astroidLogger' is undefined.";
       },
      'Error thrown');
});

QUnit.test("init no context", function (assert) {
  assert.throws(function () { astroid(fakeLog); },
      function (err) {
         return err.toString() === "Parameter: 'astroidContext' is undefined.";
       },
      'Error thrown');
});

QUnit.test("init no maxX", function (assert) {
  assert.throws(function () { astroid(fakeLog, context); },
      function (err) {
         return err.toString() === "Parameter: 'maxXPosition' is undefined.";
       },
      'Error thrown');
});

QUnit.test("init no maxY", function (assert) {
  assert.throws(function () { astroid(fakeLog, context, maxX); },
      function (err) {
         return err.toString() === "Parameter: 'maxYPosition' is undefined.";
       },
      'Error thrown');
});
