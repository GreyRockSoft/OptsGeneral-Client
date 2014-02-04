var async = require('async');
var spawn = require('child_process').spawn;

function languageDetails(language, callback) {
  var which = spawn('which', [language]);
  var path = '';
  which.stdout.on('data', function(data){
    path += data;
  });

  which.on('close', function(code) {
    if(code !== 0) {
      callback('Could not find program');
    }
    else {
      callback(null, path.trim());
    }
  });
}

function findLanguage(language,callback) {
  languageDetails(language, function(err, path){
    var languageObj = {language: language};
    if(err) {
      console.warn('Could not find ruby language');
      languageObj['path'] = '';
      callback(null, languageObj);
    }
    else {
      languageObj['path'] = path;
      callback(null, languageObj);
    }
  });

}

function languages(callback) {
  async.map(['ruby', 'python', 'node'], findLanguage,
    function (err, results) {
      if(err) {
        console.error('Failed to get linux details.');
        callback(err);
      }
      else {
        var allLanguages = results.reduce(function(prev,current){
          prev[current.language] = current.path;
          return prev;
        },{});
        callback(null, allLanguages);
      }
    });
}

module.exports = function linuxDetails(callback) {
  languages(function(err, result){
    callback(null,{languages: result});
  });
};


