var spawn = require('child_process').spawn;
var file = require('./file');

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
  var tarArgs = ['-xvf', '-C', targetDirectory, tarFile];
  if(typeof(options) === 'function') {
    callback = options;
  }
  else {
    tarArgs.concat(processOptions(options));
  }

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
    else
    {
      callback('return code was non zero: ' + code.toString());
    }
  });
};