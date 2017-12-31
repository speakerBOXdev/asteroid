var undertest,
  logger = fakeLog,
  context = fakeContext,
  xPosition = 98,
  yPosition = 99,
  width = 100,
  height = 101;

QUnit.module("base");

QUnit.test("init", function(assert) {
  undertest = base(logger, context, xPosition, yPosition);
  assert.ok(undertest, "Object initialized.");
});

QUnit.test("init no logger", function(assert) {
  assert.throws(function() {
      undertest = base();
    },
    function(err) {
      return err.toString() === "Parameter: 'baseLogger' is undefined."
    },
    "Error thrown"
  );
});

QUnit.test("init no context", function(assert) {
  assert.throws(function() {
      undertest = base(logger);
    },
    function(err) {
      return err.toString() === "Parameter: 'baseContext' is undefined."
    },
    "Error thrown"
  );
});

QUnit.test("init no x", function(assert) {
  assert.throws(function() {
      undertest = base(logger, context);
    },
    function(err) {
      return err.toString() === "Parameter: 'xPosition' is undefined."
    },
    "Error thrown"
  );
});

QUnit.test("init no y", function(assert) {
  assert.throws(function() {
      undertest = base(logger, context, xPosition);
    },
    function(err) {
      return err.toString() === "Parameter: 'yPosition' is undefined."
    },
    "Error thrown"
  );
});

QUnit.test("draw", function(assert) {
  var spyContextFillRect = sinon.spy(context, "fillRect");
  var spyContextStrokeRect = sinon.spy(context, "strokeRect");

  undertest = base(logger, context, xPosition, yPosition, width, height);

  undertest.draw();

  assert.ok(spyContextFillRect.withArgs(xPosition, yPosition, width, height).calledOnce, "fillRect called once");
  context.fillRect.restore();
  context.strokeRect.restore();
})
