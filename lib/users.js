var os = require('os');

module.exports.addUser = function addUser(userDetails, callback) {
  if(os.type() === 'Linux') {
    require('./impl/linux/linuxUsers').addUser(userDetails, callback);
  }
  else {
    callback('Unsupported');
  }
};
