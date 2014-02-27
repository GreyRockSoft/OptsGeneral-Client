OptsGeneral-Client
===========

## Install

To install clone the repository and install it with npm.  This will allow you to use the client from the cli.

`$ sudo npm install OptsGeneral-Client -g`

Once the client is installed you can then start creating your own install scripts.  These scripts are stored in general.js files.  These files describe how the system should be setup.  An example general.js file that adds a new user "steve" would look like this.

```javascript

module.exports = function(general) {
  general.user.addUser({name: 'scott', group: 'scott', password: 'password!'}, function(err) {
    if(err) {
      console.error('Failed to create user scott');
    }
    else {
      console.log('Created new user scott.');
    }
  });
};

```

It is also very easy to chain together commands using the async module.

```javascript

var async = require('async');

module.exports = function(general) {
  async.series([
    function(callback) {
      general.user.addUser({name: 'scott', group: 'scott', password: 'password!'}, callback);
    },
    function(callback) {
      general.user.addUser({name: 'john', group: 'john', password: 'johnPassword'}, callback);
    }],
    function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        console.log('Success!');
      }
    }
  );
};

```

## Run
Once you have your general.js file you can now use the `optGeneralClient` to execute it.  To do this run `optGeneralClient` from the directory that your general.js file is located. #Note:# come commands require `sudo` access.  If you do not run `optGeneralClient` as `sudo` some commands will not work and the run will fail. 
