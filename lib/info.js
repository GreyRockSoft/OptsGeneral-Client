var os = require('os');
var osDetection = require('./osDetection');

function platformDetails(callback) {
  if(os.type('Linux')) {
    require('./impl/linux/platformDetails')(callback);
  }
  else {
    callback({});
  }
};

module.exports.serverInfo = function serverInfo(callback) {

   var systemDetails = {
    "hardware": {
      "cpus": os.cpus(),
      "memory": {
        "totalMemory": os.totalmem(),
        "freeMemory": os.freemem()
      },
      "networkInterfaces": os.networkInterfaces()
    },
    "os": {
      "name": osDetection(),
      "arch": os.arch(),
      "hostname": os.hostname(),
      "type": os.type(),
      "release": os.release(),
      "uptime": os.uptime()
    },
    "nodeVersion": process.version
  };

  platformDetails(function(err, details) {
    if(err) {
      callback(err);
    }
    else {
      systemDetails.env = details;
      callback(null, systemDetails)
    }
  });
};
