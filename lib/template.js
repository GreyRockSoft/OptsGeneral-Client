var swig = require('swig');
var fs = require('fs');
var file = require('./file');

module.exports.template = function template(template, outputFileName, templateOptions, fileOptions, callback) {
  fs.realpath(template, function(err, path){
    if(err) {
      callback(err);
      return;
    }
    swig.renderFile(path, templateOptions, function(err, output){
      if(err) {
        callback(err);
      }
      else {
        file.writeFile(outputFileName, output, fileOptions, function(err){
          callback(err);
        });
      }
    });
  });
};
