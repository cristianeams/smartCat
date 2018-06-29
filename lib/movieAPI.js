var request = require('request');
// var key = 'a5840984';
var baseurl = 'http://www.omdbapi.com/?t=';
var rp = require('request-promise');

module.exports = {

  getMovieByTitle: function (title) {

    var options = {
      url: baseurl + title + "&apikey=" + 'a5840984'
    };

    return rp(options).then(function (body) {

      var movieCat = 3;
      var data = JSON.parse(body);
      if (data['Title']) {
        console.log("I AM A MOVIEEEEE", data['Title'])
        movieCat = 2;
      } else {
        movieCat = 4;
      }
      return movieCat;
    });

  }


}
