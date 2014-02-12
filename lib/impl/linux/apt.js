var spawn = require('child_process').spawn;
var util = require('util');
module.exports.update = function update(options, callback) {
  var apt = spawn('apt-get', ['update']);
  apt.stdout.on('data', function(data) {
    util.log(data.toString());
  });
  apt.stderr.on('data', function(data){
    util.error(data);
  });
  apt.on('close', function(code) {
    if(code !== 0) {
      callback('Failed to update.');
    }
    else {
      callback();
    }
  });
};

module.exports.install = function install(packageName, options, callback) {
  var apt = spawn('apt-get', ['install', packageName, '-y']);
  apt.stdout.on('data', function(data) {
    util.log(data.toString());
  });
  apt.stderr.on('data', function(data){
    util.error(data);
  });
  apt.on('close', function(code) {
    if(code !== 0) {
      callback('Failed to install: ' + packageName);
    }
    else {
      callback();
    }
  });

};