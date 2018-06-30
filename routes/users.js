"use strict";
const express = require('express');
const router = express.Router();
const categoryGen = require('../lib/generateCategory')
// const movie = require('../lib/movieAPI')
module.exports = (knex) => {
  router.get("/:id", (req, res) => {
    knex
      .select("id")
      .from("users").where('id', '=', req.params.id)
      .then((results) => {
        var userId = results[0].id
        //console.log('RESULT:',userId);
        return userId;
        //res.json(results);
      }).then((userId) => {
        knex.select("description", 'category_id').from("tasks").where('users_id', '=', userId).then((tasks) => {
          console.log(tasks)
          res.json(tasks);
        })
      });
  });


  router.post("/:id", (req, res) => {
    var taskText = req.body.text;
    var userId = req.params.id;
 

  let wordsList = taskText.toLowerCase().split(' ');

  if(categoryGen.eatKeywordsExists(wordsList)) {
      let category = 1;
      knex.insert({
        description: taskText,
        users_id: userId,
        category_id: category
      }).into('tasks')
      console.log('Eats category', category);
  } else { 
    categoryGen.generateCategory(taskText)
    .then((cat) => {
      knex.insert({
        description: taskText,
        users_id: userId,
        category_id: cat
      }).into('tasks')
      console.log('category', cat);
    }).catch(err => {
      console.log(err, "cannot categorize")
    });
  }



  });

  return router;
}
