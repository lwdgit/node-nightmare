window.__nightmare = {};
__nightmare.ipc = require('electron').ipcRenderer;
__nightmare.sliced = require('sliced');

// Listen for error events
window.addEventListener('error', function (e) {
  __nightmare.ipc.send('page', 'error', e.message, e.error.stack);
});

(function () {
  // prevent 'unload' and 'beforeunload' from being bound
  var defaultAddEventListener = window.addEventListener;
  window.addEventListener = function (type) {
    if (type === 'unload' || type === 'beforeunload') {
      return;
    }
    defaultAddEventListener.apply(window, arguments);
  };

  // prevent 'onunload' and 'onbeforeunload' from being set
  Object.defineProperties(window, {
    onunload: {
      enumerable: true,
      writable: false,
      value: null
    },
    onbeforeunload: {
      enumerable: true,
      writable: false,
      value: null
    }
  });

  // listen for console.log
  var defaultLog = console.log;
  console.log = function () {
    __nightmare.ipc.send('console', 'log', __nightmare.sliced(arguments));
    return defaultLog.apply(this, arguments);
  };

  // listen for console.warn
  var defaultWarn = console.warn;
  console.warn = function () {
    __nightmare.ipc.send('console', 'warn', __nightmare.sliced(arguments));
    return defaultWarn.apply(this, arguments);
  };

  // listen for console.error
  var defaultError = console.error;
  console.error = function () {
    __nightmare.ipc.send('console', 'error', __nightmare.sliced(arguments));
    return defaultError.apply(this, arguments);
  };

  // overwrite the default alert
  window.alert = function (message) {
    __nightmare.ipc.send('page', 'alert', message);
  };

  // overwrite the default prompt
  window.prompt = function (message, defaultResponse) {
    __nightmare.ipc.send('page', 'prompt', message, defaultResponse);
  }

  // overwrite the default confirm
  window.confirm = function (message, defaultResponse) {
    __nightmare.ipc.send('page', 'confirm', message, defaultResponse);
  }
})()


const join = require('path').join;
require.main.filename = '';
if (/(.*\/node_modules)/.test(__dirname)) {
  require.main.paths.unshift(RegExp.$1);
}
require.main.paths.unshift(process.cwd());
require.main.paths.splice(0, 0, process.cwd(), join(process.cwd(), 'node_modules'), join(process.cwd(), 'node_modules/@ali/node-nightmare/node_modules'));

window.addEventListener('DOMContentLoaded', function () {
  window.__NODE.$ = require('jquery');
  if (!window._$) {
    window._$ = window.__NODE.$;
  }
  if (!window._require) {
    window._require = window.__NODE.require;
  }
});

window.__NODE = window.__NODE || {};
/**防止页面冲突，并保护nodejs变量 */
if (typeof process === 'object') {
  const argsName = ['exports', 'require', 'module', '__filename', '__dirname', 'process', 'global'];
  for (var name of argsName) {
    __NODE[name] = window[name];
    delete window[name];
  }
}