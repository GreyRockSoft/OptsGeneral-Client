var os = require('os');

module.exports.addUser = function addUser(userDetails, callback) {
  if(os.type() === 'Linux') {
    require('./impl/linux/linuxUsers').addUser(userDetails, callback);
  }
  else {
    callback('Unsupported');
  }
};

module.exports.addGroup = function addGroup(groupName, callback) {
  if(os.type() === 'Linux') {
    require('./impl/linux/linuxUsers').addGroup(groupName, callback);
  }
  else {
    callback('Unsupported');
  }
};
