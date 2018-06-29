'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'wSjxilrtX0jTNVotR8t-CwvZ7TiKZyuugVk4VXnwZZRbfokJQZsB4Ml1a5L4MgJ-C-9oYvFl5iyvBJGcCdaiOIMD1hachqEUSWLNg1OVXj4_bQ75ndAcB1xI6yY1W3Yx';

const searchRequest = {
  term:'Revolving Resturant',
  location: 'vancouver , bc '

};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {

  const firstResult = response.jsonBody.businesses[0];
  const second = response.jsonBody.businesses[0].categories;
  const prettyJson = JSON.stringify(firstResult, null, 4);

  console.log(prettyJson);
  console.log('category', second);
}).catch(e => {
  console.log(e);
});