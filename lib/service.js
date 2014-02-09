var os = require('os');


module.exports.service  = function service(serviceName, action, callback) {
  if(os.type() === 'Linux') {
    require('./impl/linux/service').service(serviceName, action, callback);
  }
  else {
    callback('Unsupported');
  }
};