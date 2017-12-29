var undertest;

QUnit.module("ship");

QUnit.test("init", function (assert) {
  undertest = ship();
  assert.ok(ship, "Object initialized.");
});
