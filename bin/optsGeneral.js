#!/usr/bin/env node

//Check for sudo access
if(process.getuid() !== 0) {
  console.warn('Warning: You do not have sudo access.  Some system modification may not perform correctly.');
}

var optsGeneral = require('../');

optsGeneral.package.update({},function(err) {
  if(err) {
    console.error(err);
  }
  else {
    console.log('Installed sl');
  }
});
/*
optsGeneral.package.install('sl',{},  function(err) {
  if(err) {
    console.error(err);
  }
  else {
    console.log('Installed sl');
  }
});

/*
optsGeneral.service.service('nginx', 'status', function(err) {
  if(err) {
    console.error(err);
  }
  else {
    console.log('Started nginx.');
  }
});


optsGeneral.info.serverInfo(function (err, result){
  if(err) {
    console.log("Failed to get system details.");
  }
  console.log(JSON.stringify(result, null, 2));
});



optsGeneral.users.addUser({name: 'test', password:'test'}, function(err) {
  if(err) {
    console.log('Failed to create user');
  }
  else {
    console.log('Created user Test');
    optsGeneral.file.writeFile('./test', 'This is a test', {perm: 0755, owner: 'test', group: 'test'}, function(err) {
      if(err) {
        console.error(err);
      }
      else {
        console.log('It worked!');
      }
    });
  }
});


optsGeneral.template.template('template.tmpl', 'rendered', {myValue: 'Yay!'}, {owner: 'test'}, function(err) {
  if(err) {
    console.log('Failed to create the template:' + err.toString());
  }
  else {
    console.log('Created the template');
  }
});
 */



