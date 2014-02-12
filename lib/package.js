var osDetection = require('./osDetection');

module.exports.install = function install(packageName, options, callback) {
  if(osDetection().indexOf('Ubuntu') >= 0) {
    require('./impl/linux/apt').install(packageName, options, callback);
  }
  else {
    callback('Unsupported.');
  }
};

module.exports.update = function update(options, callback) {
  if(osDetection().indexOf('Ubuntu') >= 0) {
    require('./impl/linux/apt').update(options, callback);
  }
  else {
    callback('Unsupported.');
  }
};
