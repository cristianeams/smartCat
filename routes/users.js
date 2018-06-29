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
    var tasktext = req.body.text;
    var userId = req.params.id;
    categoryGen.generateCategory(tasktext).then((category) => {
      console.log('tasktext', tasktext)
      return knex.insert({
        description: tasktext,
        users_id: userId,
        category_id: category
      }).into('tasks')
    }).then(function (id) {
      console.log('userID', userId, "tasktext", tasktext)
    }).catch(()=> {
      console.log("cannot categorize")
    }).then(() => {
      res.send("good job")
    } )

  });

  return router;
}
