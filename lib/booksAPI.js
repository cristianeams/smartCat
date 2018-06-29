https://www.goodreads.com/search/index.xml?key=wnDzCaQwP95ggCMnr7XEGw&q=To+Kill+A+Mockingbird
var convert = require('xml-js');
var request = require('request');
var key = 'AIzaSyA5nKG2mW_t8X7c6sG8mNltRiabR3QBl98' ;
var baseurl = 'https://www.goodreads.com/search/index.xml?key=wnDzCaQwP95ggCMnr7XEGw&q=';

console.log('Welcome to the Movie Downloader!');

//Parse the data to make it accessible
function getBookByTitle(title, key , cb) {
 var options = { 
   url : baseurl + title
 };
 request(options, function(err, res, body) {
    var resultJSON = convert.xml2json(body , {compact: true , spaces : 4})
    var data = JSON.parse(resultJSON);
    console.log('res is' , data.GoodreadsResponse.search.results.work[0].best_book.title._text);
//    console.log(data)
   //cb(err, data);
 });
}

getBookByTitle("Starbucks" , key ); 