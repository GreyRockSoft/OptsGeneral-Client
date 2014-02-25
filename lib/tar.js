var fs = require('fs');
var _ = require('underscore');
var spawn = require('child_process').spawn;

function processOptions(options) {
  var optionsList = [];

  if(options['owner']) {
    optionsList.concat('--owner=' + options['owner']);
  }

  if(options['group']) {
    optionsList.concat('--group=' + options['group']);
  }
  return optionsList;
}

module.exports.extract = function extract(tarFile, targetDirectory, options, callback) {
  if(_.isFunction(options)) {
    callback = options;
    options = {};
  }

  fs.exists(targetDirectory, function(exists){
    if(exists) {
      callback();
      return;
    }
    var tarArgs = ['-xvf', '-C', targetDirectory, tarFile];
    tarArgs.concat(processOptions(options));

    var tar = spawn('tar',tarArgs);
    tar.stderr.on('data', function(data) {
      console.error(data.toString());
    });
    tar.stdout.on('data', function(data) {
      console.log(data);
    });
    tar.on('close', function(code) {
      if(code === 0) {
        callback();
      }
      else {
        callback('return code was non zero: ' + code.toString());
      }
    });
  });
};