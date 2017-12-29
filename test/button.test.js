var undertest;

QUnit.module("button");

QUnit.test("init", function (assert) {
  undertest = button();
  assert.ok(button, "Object initialized.");
});
