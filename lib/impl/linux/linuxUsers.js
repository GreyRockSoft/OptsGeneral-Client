var spawn = require('child_process').spawn;

function buildArgArray(userDetails) {
  return [userDetails.name];
}

module.exports.addUser = function addUser(userDetails, callback) {
  var addUserProc = spawn('adduser', buildArgArray(userDetails));
  addUserProc.stdout.on('data', function(data){
    console.log(data.toString());
  });
  addUserProc.stderr.on('data', function(data){
    console.error(data.toString());
  });
  addUserProc.on('close', function(code) {
    if(code !== 0) {
      callback('Failed to create user.');
    }
    else {
      callback(null);
    }
  });
};
