var undertest,
  starColor = '#ffffff',
  starX = 1,
  starY = 2,
  starRadius = 10,
  startAngle = 0,
  twoxpi = Math.PI * 2,
  drawAntiClockwise = true;

var context = fakeContext;

QUnit.module("star", {
  setup: function() {
    undertest = star(context, starColor, starX, starY, starRadius);
  },
  teardown: function() {

  }
});

QUnit.test("init", function(assert) {

  undertest = star(context, starColor, starX, starY, starRadius);
  assert.ok(star, "Object initialized.");
  assert.ok(undertest.getX() == starX, "x is set");
  assert.ok(undertest.getY() == starY, "y is set");
});

QUnit.test("init no context", function (assert) {
    assert.throws(function () { star(); },
        function (err) {
           return err.toString() === "Parameter: 'starContext' is undefined."
         },
        'Error thrown');
});

QUnit.test("init no color", function (assert) {
    assert.throws(function () { star({}); },
        function (err) {
           return err.toString() === "Parameter: 'starColor' is undefined."
         },
        'Error thrown');
});

QUnit.test("init no x", function (assert) {
    assert.throws(function () { star({}, "abcd"); },
        function (err) {
           return err.toString() === "Parameter: 'starX' is undefined."
         },
        'Error thrown');
});

QUnit.test("init no y", function (assert) {
    assert.throws(function () { star({}, "abcd", 1); },
        function (err) {
           return err.toString() === "Parameter: 'starY' is undefined."
         },
        'Error thrown');
});

QUnit.test("init no radius", function (assert) {
    assert.throws(function () { star({}, "abcd", 1, 2); },
        function (err) {
           return err.toString() === "Parameter: 'starRadius' is undefined."
         },
        'Error thrown');
});

QUnit.test("draw", function(assert) {
  var spyContextBeginPath = sinon.spy(context, "beginPath");
  var spyContextArc = sinon.spy(context, "arc");
  var spyContextClosePath = sinon.spy(context, "closePath");
  var spyContextFill = sinon.spy(context, "fill");

  undertest = star(context, starColor, starX, starY, starRadius);
  undertest.draw();

  assert.equal(context.fillStyle, starColor, "fillColor set");
  assert.ok(spyContextBeginPath.calledOnce, "beginPath calledOnce");
  assert.ok(spyContextBeginPath.calledBefore(spyContextArc), "beginPath before arg");
  assert.ok(spyContextArc
    .withArgs(starX, starY, starRadius, startAngle, twoxpi, drawAntiClockwise)
    .calledOnce, "arc calledOnce");
  assert.ok(spyContextArc.calledBefore(spyContextClosePath), "arc before closePath");
  assert.ok(spyContextClosePath.calledOnce, "closePath calledOnce");
  assert.ok(spyContextClosePath.calledBefore(spyContextFill), "closePath before fill");
  assert.ok(spyContextFill.calledOnce, "fill calledOnce");
});
