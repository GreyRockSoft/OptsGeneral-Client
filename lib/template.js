var swig = require('swig');
var fs = require('fs');

module.export.template = function template(template, outputFileName, options, callback) {
  swig.renderFile(template, options, function(err, output){
    if(err) {
      callback(err);
    }
    else {
      fs.writeFile(outputFileName, output,function(err) {
        if(err) {
          callback(err);
        }
        else {
          callback(null);
        }
      });
    }
  });
};
