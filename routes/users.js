"use strict";
const express = require('express');
const router  = express.Router();
module.exports = (knex) => {
  router.get("/:id", (req, res) => {
    knex
      .select("id")
      .from("users").where('id','=', req.params.id)
      .then((results) => {
        var userId = results[0].id
        //console.log('RESULT:',userId);
        return userId;
        //res.json(results);
    }).then((userId) => {
      knex.select("description" , 'category_id').from("tasks").where('users_id','=',userId).then((tasks)=> {
        console.log(tasks)
        res.json(tasks);
      })
    });
  });

 

  router.post("/:id", (req,res) => {
    var tasktext = req.body.text; 
    var userId = req.params.id; 
    console.log('tasktext', tasktext)
    knex.insert({description: tasktext, users_id:userId, category_id:1}).into('tasks').then(function(id) {
    console.log('userID', userId, "tasktext", tasktext)
    })
  
  }); 

  return router;
}
