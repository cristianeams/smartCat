var request = require('request');
// var key = 'a5840984';
var baseurl = 'http://www.omdbapi.com/?t=';
var rp = require('request-promise');

function intersection(listA, listB) {
  const listC = [];
  for (var i = 0; i < listA.length; i++) {
    if (listB.includes(listA[i]) && !listC.includes(listA[i])) {
      listC.push(listA[i]);
    }
  }
  console.log(listC);
  return listC.length;
}

var eatKeywords = ['restaurant', 'cafe', 'food', 'coffee']

module.exports = {

  getMovieByTitle: function (title) {
    var titleNoSpaces = title.toLowerCase().split(" ")
    var options = {
      url: baseurl + title + "&apikey=" + 'a5840984'
    };

    return rp(options).then(function (body) {

      var movieCat = 4;
      var data = JSON.parse(body);
      if (data['Title']) {
        console.log("I AM A MOVIEEEEE", data['Title'])
        movieCat = 2;
      } else if(intersection(titleNoSpaces, eatKeywords) > 0) {
        movieCat = 1;
      }
      return movieCat;
    });

  }


}
