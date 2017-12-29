var undertest;

var logger = fakeLog,
 context = fakeContext,
  minX = 1,
  minY = 2,
  width = 100;
QUnit.module("hud");

QUnit.test("init", function(assert) {
  undertest = hud(logger, context, minX, minY, width);
  assert.ok(undertest, "Object initialized.");
});

QUnit.test("init no logger", function(assert) {
  assert.throws(function() {
      hud();
    },
    function(err) {
      return err.toString() === "Parameter: 'hudLogger' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no context", function(assert) {
  assert.throws(function(logg) {
      hud(logger);
    },
    function(err) {
      return err.toString() === "Parameter: 'hudContext' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no xmin", function(assert) {
  assert.throws(function() {
      hud(logger, context);
    },
    function(err) {
      return err.toString() === "Parameter: 'minXPosition' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no ymin", function(assert) {
  assert.throws(function() {
      hud(logger, context, minX);
    },
    function(err) {
      return err.toString() === "Parameter: 'minYPosition' is undefined.";
    },
    'Error thrown');
});

QUnit.test("init no width", function(assert) {
  assert.throws(function() {
      hud(logger, context, minX, minY);
    },
    function(err) {
      return err.toString() === "Parameter: 'hudWidth' is undefined.";
    },
    'Error thrown');
});

QUnit.test("draw", function(assert) {
  var spyContextFillRect = sinon.spy(context, "fillRect");
  var spyContextFillText = sinon.spy(context, "fillText");
  var spyContextStrokeRect = sinon.spy(context, "strokeRect");

  undertest = hud(logger, context, minX, minY, width);
  undertest.setTitle("title text");
  undertest.setPoints(90);

  undertest.draw();

  // Assert Frame
  assert.ok(spyContextFillRect.calledBefore(spyContextStrokeRect), "frame: fillRect before strokeRect");
  assert.ok(spyContextFillRect.withArgs(minX, minY, width, 30).calledOnce, "frame: fillRect calledOnce");
  assert.ok(spyContextStrokeRect.withArgs(minX + 1, minY, width - 3, 30).calledOnce, "frame: strokeRect calledOnce");

  // Assert Title
  assert.equal(spyContextFillText.withArgs("title text").callCount, 1, "title: fillText calledOnce");

  // Assert score
  assert.equal(spyContextFillText.withArgs("Score: 90").callCount, 1, "score: fillText calledOnce");

  // Assert Health
  assert.equal(spyContextFillText.withArgs("Health").callCount, 1, "health: fillText calledOnce");


  context.fillRect.restore();
  context.fillText.restore();
  context.strokeRect.restore();
})
