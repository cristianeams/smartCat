var request = require('request');
var key = 'a5840984' ;
var baseurl = 'http://www.omdbapi.com/?t=';
  getMovieByTitle: function(title, cb) {
    var options = { 
      url : baseurl + title + "&apikey=" + 'a5840984'
    };
    request(options, function(err, res, body) {
      
      var data = JSON.parse(body);
      if(data['Title']) {
        return 2 ;
      } else {
        return 1 ;
      }
      console.log(data["Title"])
      //cb(err, data);
    });
   }




