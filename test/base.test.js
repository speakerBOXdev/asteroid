var undertest;

QUnit.module("base");

QUnit.test("init", function (assert) {
  undertest = base();
  assert.ok(undertest, "Object initialized.");
});
