var os = require('os');
var osDetection = require('./osDetection');
module.exports.serverInfo = function serverInfo() {
  return {
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
    },
    "uptime": os.uptime(),
    "nodeVersion": process.version
  };
};
