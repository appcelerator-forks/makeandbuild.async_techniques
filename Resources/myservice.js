var async = require('async');

exports.myservice = {
  _ensureSession: function(task, callback) {
    callback(null, task);
  },
  _saveConfig: function(task, callback) {
    Ti.App.Properties.setBool(task.name, true);
    callback(null, task);
  },
  save: function(name, value, callback) {
    Ti.API.debug('saveConfig ' + name + '=' + value);
    this.config[name] = value;
    this.queue.push({
      name: name,
      value: value
    }, callback);
  },
  get:function(name) {
    return Ti.App.Properties.getBool(name, false);
  },
  _synced: function(task, callback) {
    var value = task.push.config[task.name];
    var synced = Ti.App.Properties.getBool(task.name, false);
    if (value === synced) {
      callback("worker already synced", task);
    } else {
      Ti.API.debug('_synced continuing');
      callback(null, task);
    }
  },
  _delay: function(task, callback) {
    setTimeout(function() {
      callback(null, task);
    }, 2500);
  },
  _initialize: function() {
    Ti.API.info('initializing');
    var self = this;
    this.config = {};
    this.queue = async.queue(function(task, callback) {
      async.waterfall([
        function(callback) {
          task.push = self;
          self._delay(task, callback);
        },
        self._ensureSession,
        self._synced,
        self._saveConfig
      ], function(err) {
        if (err) {
          Ti.API.error('error in worker ' + task.name + ' ' + err);
          callback(err);
        } else {
          Ti.API.info('completed worker ' + task.name + ' is ' + Ti.App.Properties.getBool(task.name));
          callback();
        }
      });
    }, 1);
    Ti.API.info('initialized complete');
    return this;
  }
}._initialize();
