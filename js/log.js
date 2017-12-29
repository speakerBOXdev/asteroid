var LogLevel = {
  Trace: 1,
  Debug: 2,
  Info: 3,
  Warn: 4,
  Error: 5,
  None: 6
}

var log = function(logLevel, logContainer) {

  if (!logLevel)
    logLevel = LogLevel.Debug;

  var currentLevel = logLevel,
    container = logContainer;

  function trace(message) {
    if (logLevel <= LogLevel.Trace) {
      console.trace(message);
      outputMessage(LogLevel.Trace, message);
    }
  };

  function debug(message) {
    if (logLevel <= LogLevel.Debug) {
      console.debug(message);
      outputMessage(LogLevel.Debug, message);
    }
  };

  function info(message) {

    if (logLevel <= LogLevel.Info) {
      console.info(message);
      outputMessage(LogLevel.Info, message);
    }
  };

  function warn(message) {

    if (logLevel <= LogLevel.Warn) {
      console.warn(message);
      outputMessage(LogLevel.Warn, message);
    }
  };

  function error(message) {
    if (logLevel <= LogLevel.Error) {
      console.error(message);
      outputMessage(LogLevel.Error, message);
    }
  };

  function getClassFromLogLevel(level) {
    var cls = "";
    switch (level) {
      case LogLevel.Trace:
        cls = "log-trace"
        break;
      case LogLevel.Debug:
        cls = "log-debug"
        break;
      case LogLevel.Info:
        cls = "log-info"
        break;
      case LogLevel.Warn:
        cls = "log-warn"
        break;
      case LogLevel.Error:
        cls = "log-error"
        break;
      default:
        cls = "log-info";
        break;
    }
    return cls;
  };

  function outputMessage(level, message) {
    var levelClass = getClassFromLogLevel(level);
    if (container) {
      container.innerHTML += "<div class='" + levelClass + "'>" + message + "</div>";
    }
  };

  return {
    trace: trace,
    debug: debug,
    info: info,
    warn: warn,
    error: error
  };
}
