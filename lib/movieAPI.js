var request = require('request');
// var key = 'a5840984';
var baseurl = 'http://www.omdbapi.com/?t=';
var rp = require('request-promise');
var convert = require('xml-js');
var baseurlbook = 'https://www.goodreads.com/search/index.xml?key=wnDzCaQwP95ggCMnr7XEGw&q=';

function getBookByTitle(title) {
  var options = {
    url: baseurlbook + title
  };
  return rp(options)
    .then((body) => {
      var resultJSON = convert.xml2json(body, {
        compact: true,
        spaces: 4
      })
      var data = JSON.parse(resultJSON);  
      console.log('The problem starts here');
      // console.log(data.GoodreadsResponse.search);
      console.log('---');
      console.log(data.GoodreadsResponse.search.results.work);
      return !(data.GoodreadsResponse.search.results.work === undefined);
      
      //return !!data.GoodreadsResponse.search.results.work[0].best_book.title._text;
    });
}

function intersection(listA, listB) {
  const listC = [];
  for (var i = 0; i < listA.length; i++) {
    if (listB.includes(listA[i]) && !listC.includes(listA[i])) {
      listC.push(listA[i]);
    }
  }
  return listC.length;
}

// function intersectionForBooks(listA, listB) {
//   const listC = [];
//   for (var i = 0; i < listA.length; i++) {
//     if (listB.includes(listA[i]) && !listC.includes(listA[i])) {
//       listC.push(listA[i]);
//     }
//   }
//   console.log(listC);
//   return listC.length;
// }


var eatKeywords = ['restaurant', 'cafe', 'food', 'coffee', 'tofu' , 'italian' , 'mexican' , 'indian' , 'pub' , 'beer' , 'drink' ];
//var readKeywords = ['read' , 'by' , 'book' , 'author'];

module.exports = {

  getMovieByTitle: function (title) {
    var titleNoSpaces = title.toLowerCase().split(" ")
    var options = {
      url: baseurl + title + "&apikey=" + 'a5840984'
    };

    return rp(options).then(function (body) {
      var data = JSON.parse(body);
      if (data['Title']) {
        return 2;
      }
      if (intersection(titleNoSpaces, eatKeywords) > 0) {
        return 1;
      }
      console.log('problem continues here ');
      //console.log(getBookByTitle(title));
      console.log('🤠');
      return getBookByTitle(title)
        .then((result) => {
          console.log('🐘')
          console.log(result);
          console.log('got the log');
          return result ? 3 : 4;
        }).catch(err => new Error('Failed to get book by title'));
    });
  }
  

}
