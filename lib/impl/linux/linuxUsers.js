var spawn = require('child_process').spawn;

function buildUserString(userDetails) {
  var userString = userDetails.name + ':';
  userString += userDetails.password + ':';

  if(userDetails['uid']) {
    userString += userDetails['uid'];
  }
  userString += ':';

  if(userDetails['gid']) {
    userString += userDetails['gid'];
  }
  userString += ':';

  if(userDetails['gecos']) {
    userString += userDetails['gecos'];
  }
  userString += ':';

  if(userDetails['dir']) {
    userString += userDetails['dir'];
  }
  else {
    userString += '/home/' + userDetails['name'];
  }
  userString += ':';

  if(userDetails['shell']) {
    userString += userDetails['shell'];
  }
  else {
    userString += '/bin/bash';
  }

  return userString;
}

function validateRequiredArgs(userDetails) {
  if(!userDetails['name']) {
    throw "The user's name must be set";
  }
  if(!userDetails['password']) {
    throw "The user's password must be set";
  }
}

module.exports.addUser = function addUser(userDetails, callback) {

  try{
    validateRequiredArgs(userDetails);
  }
  catch(e) {
    console.error('ERROR: ' + e);
    callback(e);
    return;
  }

  var addUserProc = spawn('newusers');

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
  var userString = buildUserString(userDetails);
  console.log(userString);
  addUserProc.stdin.write(userString);
  addUserProc.stdin.end();
};
