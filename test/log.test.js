var undertest;

QUnit.module("log");

function getFakeDiv() {
  return { innerHTML: ""};
}

QUnit.test('init', function(assert) {
  undertest = log();
  assert.ok(undertest, "Object initialized.");
});

QUnit.test('trace', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Trace, div);
  undertest.trace("test message");
  assert.equal(div.innerHTML, "<div class='log-trace'>test message</div>");
});

QUnit.test('trace not logged', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Debug, div);
  undertest.trace("test message");
  assert.equal(div.innerHTML, "");
});

QUnit.test('debug', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Trace, div);
  undertest.debug("test message");
  assert.equal(div.innerHTML, "<div class='log-debug'>test message</div>");
});

QUnit.test('debug not logged', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Info, div);
  undertest.debug("test message");
  assert.equal(div.innerHTML, "");
});

QUnit.test('info', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Trace, div);
  undertest.info("test message");
  assert.equal(div.innerHTML, "<div class='log-info'>test message</div>");
});

QUnit.test('info not logged', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Warn, div);
  undertest.info("test message");
  assert.equal(div.innerHTML, "");
});

QUnit.test('warn', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Trace, div);
  undertest.warn("test message");
  assert.equal(div.innerHTML, "<div class='log-warn'>test message</div>");
});

QUnit.test('warn not logged', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Error, div);
  undertest.warn("test message");
  assert.equal(div.innerHTML, "");
});

QUnit.test('error', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.Trace, div);
  undertest.error("test message");
  assert.equal(div.innerHTML, "<div class='log-error'>test message</div>");
});

QUnit.test('error not logged', function(assert) {
  var div = getFakeDiv();
  undertest = log(LogLevel.None, div);
  undertest.error("test message");
  assert.equal(div.innerHTML, "");
});
