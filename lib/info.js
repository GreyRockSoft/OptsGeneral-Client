var os = require('os');
module.exports = function serverInfo() {
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
      "arch": os.arch(),
      "hostname": os.hostname(),
      "type": os.type(),
      "release": os.release()
    },
    "uptime": os.uptime(),
    "nodeVersion": process.version
  };
};
