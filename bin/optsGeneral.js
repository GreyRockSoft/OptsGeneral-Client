#!/usr/bin/env node

//Check for sudo access
if(process.getuid() !== 0) {
  console.warn('Warning: You do not have sudo access.  Some system modification may not perform correctly.');
}

function loadGeneralFile(fileName) {
  try {
    return require(fileName);
  }
  catch (e) {
    console.log('Could not load: ' + fileName);
    return undefined;
  }
}

var fs = require('fs');
var path = require('path');
var optsGeneral = require('../');

//search for the genearl.js file and execute it

var generalPath =  path.resolve('general.js');
var general = require(generalPath);
if(general) {
  general(optsGeneral);
}
else {
  console.error('Could not find general.js file.');
}

