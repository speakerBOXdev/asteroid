var undertest;

var context = fakeContext,
  xPosition = 100,
  yPosition = 100;

QUnit.module("base");

QUnit.test("init", function(assert) {
  undertest = base(context, xPosition, yPosition);
  assert.ok(undertest, "Object initialized.");
});

QUnit.test("init no context", function(assert) {
  assert.throws(function() {
      undertest = base();
    },
    function(err) {
      return err.toString() === "Parameter: 'baseContext' is undefined."
    },
    "Error thrown"
  );
});

QUnit.test("init no x", function(assert) {
  assert.throws(function() {
      undertest = base(context);
    },
    function(err) {
      return err.toString() === "Parameter: 'xPosition' is undefined."
    },
    "Error thrown"
  );
});

QUnit.test("init no y", function(assert) {
  assert.throws(function() {
      undertest = base(context, xPosition);
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

  undertest = base(context, xPosition, yPosition);

  undertest.draw();

  assert.ok(spyContextFillRect.withArgs(xPosition, yPosition, 100, 100).calledOnce, "fillRect called once");
  context.fillRect.restore();
  context.strokeRect.restore();
})
