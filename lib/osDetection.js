var os = require('os');
var fs = require('fs');

function windowsName() {
  var version = os.release();
  if(version.indexOf('6.3') >= 0) {
    return 'Windows 8.1/Windows Server 2012 R2';
  }
  else if (version.indexOf('6.2') >= 0) {
    return 'Windows 8/Windows Server 2012';
  }
  else if(version.indexOf('6.1') >= 0) {
    return 'Windows 7/Windows Server 2008 R2';
  }
  else if(version.indexOf('6.0') >= 0) {
    return 'Windows Vista/Windows Server 2008';
  }
  else if(version.indexOf('5.2') >= 0) {
    return 'Windows XP 64-Bit Edition/Windows Server 2003 [R2]';
  }
  else if(version.indexOf('5.1') >= 0) {
    return 'Windows XP';
  }
  else if(version.indexOf('5.0') >= 0) {
    return 'Windows 2000';
  }
  else {
    return 'Unknown Windows Version';
  }
};

function linuxName() {
  var lsbFile = fs.readFileSync('/etc/lsb-release'); 
  var keyPairs = lsbFile.toString().split('\n').map(function(elem) {
    var pair = elem.split('=');
    return {
      key:pair[0],
      value:pair[1]
     };
  });

  var idName = null; 
  var release = null;

  for(var i = 0; i < keyPairs.length; i++) {
    var pair = keyPairs[i];
    if(pair.key === 'DISTRIB_ID') {
      idName = pair.value;
    }
    else if(pair.key === 'DISTRIB_RELEASE') {
      release = pair.value;
    }
  }

  if(idName === null) {
    return 'Unknown Linux Distro';
  }
  else {
    if (release !== null) {
      return idName + ' ' + release;
    }
    return idName;
  }
};

function unixName() {
  return "Unix";
};

module.exports = function osName() {
  var type = os.type();
  if(type.indexOf('Linux') >= 0 || type.indexOf('linux') >= 0) {
    return linuxName();
  }
  else if(type.indexOf('Unix') >= 0 || type.indexOf('unix')) {
    return unixName(); 
  }
  else if(type.indexOf('Windows') >= 0 || type.indexOf('windows') >= 0){
    return windowsName();
  }
  else {
    return 'Unknown OS';
  }
};
