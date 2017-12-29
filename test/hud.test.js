var undertest;

var context = fakeContext,
  minX = 1,
  minY = 2,
  width = 100;
QUnit.module("hud");

QUnit.test("init", function(assert) {
  undertest = hud(context, minX, minY, width);
  assert.ok(undertest, "Object initialized.");
});

QUnit.test("init no context", function(assert) {
  assert.throws(function() {
      hud();
    },
    function(err) {
      return err.toString() === "Parameter: 'hudContext' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no xmin", function(assert) {
  assert.throws(function() {
      hud(context);
    },
    function(err) {
      return err.toString() === "Parameter: 'minXPosition' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no ymin", function(assert) {
  assert.throws(function() {
      hud(context, minX);
    },
    function(err) {
      return err.toString() === "Parameter: 'minYPosition' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no width", function(assert) {
  assert.throws(function() {
      hud(context, minX, minY);
    },
    function(err) {
      return err.toString() === "Parameter: 'hudWidth' is undefined.";
    },
    'Error thrown');
});

QUnit.test("draw", function(assert) {
  var spyContextFillRect = sinon.spy(context, "fillRect");
  var spyContextStrokeRect = sinon.spy(context, "strokeRect");
  undertest = hud(context, minX, minY, width);
  undertest.draw();

  // Assert Frame
  assert.ok(spyContextFillRect.calledBefore(spyContextStrokeRect), "fillRect before strokeRect");
  assert.ok(spyContextFillRect.withArgs(minX, minY, width, 30).calledOnce, "fillRect calledOnce");
  assert.ok(spyContextStrokeRect.withArgs(minX + 1, minY, width - 3, 30).calledOnce, "strokeRect calledOnce");

  // TODO: Assert fillText and others for score, title, and health

  context.fillRect.restore();
})
