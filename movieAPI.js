var request = require('request');
var key = 'a5840984' ;
var baseurl = 'http://www.omdbapi.com/?t=';

console.log('Welcome to the Movie Downloader!');

//Parse the data to make it accessible
function getMovieByTitle(title, key , cb) {
 var options = { 
   url : baseurl + title + "&apikey=" + key 
 };
 request(options, function(err, res, body) {
   var data = JSON.parse(body);
   console.log(data)
   console.log(data["Title"])
   //cb(err, data);
 });
}

getMovieByTitle("Starbucks" , key ); 
