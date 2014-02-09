var spawn = require('child_process').spawn;

module.exports.service = function service(serviceName, action, callback) {
  var serv = spawn('service', [serviceName, action]);

  serv.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  serv.stderr.on('data', function(data) {
    console.error(data.toString());
  });

  serv.on('close', function(code) {
    if(code !== 0) {
      callback(action + ' failed on service ' + serviceName);
    }
    else {
      callback();
    }
  });
};