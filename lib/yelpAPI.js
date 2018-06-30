'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
//const apiKey = 'wSjxilrtX0jTNVotR8t-CwvZ7TiKZyuugVk4VXnwZZRbfokJQZsB4Ml1a5L4MgJ-C-9oYvFl5iyvBJGcCdaiOIMD1hachqEUSWLNg1OVXj4_bQ75ndAcB1xI6yY1W3Yx';
function getResturantName(title , location) {

  const searchRequest = {
    term: title,
    location: location
    // location: 'vancouver , bc '
  };
  const client = yelp.client('wSjxilrtX0jTNVotR8t-CwvZ7TiKZyuugVk4VXnwZZRbfokJQZsB4Ml1a5L4MgJ-C-9oYvFl5iyvBJGcCdaiOIMD1hachqEUSWLNg1OVXj4_bQ75ndAcB1xI6yY1W3Yx');
  client.search(searchRequest).then(response => {

    const firstResult = response.jsonBody.businesses[0];
    const second = response.jsonBody.businesses[0].name;
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log('Name is ' , second)
    return second ;

  
    
  })
  return "hello"
  // .catch(e => {
  //   console.log(e);
  // });
}


console.log( 'Reesult is' ,getResturantName("The Flying Pig" , "vancouver , bc"))
// const searchRequest = {
//   term:'Revolving Resturant',
//   location: 'vancouver , bc '
// };


//const client = yelp.client('wSjxilrtX0jTNVotR8t-CwvZ7TiKZyuugVk4VXnwZZRbfokJQZsB4Ml1a5L4MgJ-C-9oYvFl5iyvBJGcCdaiOIMD1hachqEUSWLNg1OVXj4_bQ75ndAcB1xI6yY1W3Yx');
// client.search(searchRequest).then(response => {

//   const firstResult = response.jsonBody.businesses[0];
//   const second = response.jsonBody.businesses[0].categories;
//   const prettyJson = JSON.stringify(firstResult, null, 4);

//   console.log(prettyJson);
//   console.log('category', second);
// }).catch(e => {
//   console.log(e);
// });