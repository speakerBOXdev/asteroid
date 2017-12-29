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
