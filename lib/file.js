var fs = require('fs');
var async = require('async');
var spawn = require('child_process').spawn;

function getUid(userName, callback) {
  var result = '';
  var id = spawn('id', ['-u', userName]);
  id.stdout.on('data', function(data) {
    result += data;
  });
  id.stderr.on('data', function(data) {
    console.error(data);
  });
  id.on('close', function(code) {
    if(code === 0) {
      callback(null, int.parse(result));
    }
    else {
      callback('Failed to get uid of user: ' + userName);
    }
 });
}

function getGid(groupName, callback) {
  var result = '';
  var getent = spawn('getent', ['group', groupName]);

  getent.stdout.on('data', function(data) {
    result += data;
  });

  getent.stderr.on('data', function(data) {
    console.error(data);
  });

  getent.on('close', function(code) {
    if(code === 0) {
      callback(null, int.parse(code.split(':')[2]));
    }
    else {
      callback('Failed to get gid of group: ' + groupName);
    }
  });
}

function chown(file, owner, group) {
  return function(callback) {
    var uid;
    var gid;

    async.parallel([
      function(kallback) {
        if(typeof(owner) === 'string') {
          getUid(owner, kallback);
        }
        else {
          kallback(null, owner);
        }
      },
      function(kallback) {
        if(typeof(group) === 'string') {
          getGid(group, kallback);
        }
        else {
          kallback(null, group);
        }
      }
    ], function(err, results){
      if(err) {
        callback(err);
        return;
      }
      var uid = results[0];
      var gid = results[1];
      fs.chown(file, uid, gid, callback);
    });
  }
}

function chmod(file, mode) {
  return function(callback) {
    fs.chmod(file, mode, callback);
  }
}

module.exports.modifyPerms = function modifyPerms(file, options, callback){
  var execute = [];
  if(options['owner']) {
    var owner = options['owner'];
    var group;
    if(options['group']) {
      group = options['group'];
    }
    else {
      group = options['owner'];
    }
    execute.append(chown(file, owner, group));
  }
  else if(!options['owner'] && options['group']) {
    callback('Group cannot be set without an owner.');
    return;
  }
};

/**
 * options can include, user, group, permission octet
 */
module.exports.writeFile = function writeFile(file, contents, options, callback) {
  fs.writeFile(file, contents, function() {
    module.exports.modifyPerms(options, callback);
  });
};


module.exports.deleteFile = function deleteFile(file, callback) {
  fs.unlink(file, callback);
};