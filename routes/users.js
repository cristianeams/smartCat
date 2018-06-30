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
        knex.select("description", 'category_id', "id").from("tasks").where('users_id', '=', userId).then((tasks) => {
          console.log(tasks)
          res.json(tasks);
        })
      });
  });

  router.get("/:id/profile", (req, res) => {
    knex
      .select("name")
      .from("users").where('id', '=', req.params.id)
      .then((results) => {
        var userName = results[0].name
        console.log('RESULTTTTT WHAT AM I OBJECT ARRAY?:', userName);
        res.json(userName);
      })
  });


  router.post("/:id", (req, res) => {
    var tasktext = req.body.text;
    var userId = req.params.id;
    categoryGen.generateCategory(tasktext).then((category) => {
      //console.log('tasktext', tasktext)
      return knex.insert({
        description: tasktext,
        users_id: userId,
        category_id: category || 4
      }).into('tasks')
    }).then(function (id) {
      //console.log('userID', userId, "tasktext", tasktext)
    }).catch(()=> {
      throw new Error("cannot categorize")
    }).then(() => {
      res.send("good job")
    })

  });


  router.post("/:id/update", (req, res) => {
    var taskAtt = req.body.taskAttr;
    var newCat = req.body.taskCatId
    return knex('tasks').where('id', '=', taskAtt).update({
      category_id: newCat
    }).then((results) => {
      console.log("updated category", results);
    }).catch(() => {
      console.log("cannot categorize")
    }).then(() => {
      res.send("good job")
    })
  });


  router.post("/:id/updateProfile", (req, res) => {
    var userProfileId = req.params.id;
    var newName = req.body.newName; 
    return knex('users').where('id', '=', userProfileId).update({
      name: newName
    }).then((results) => {
      console.log("updated category", results);
    }).catch(() => {
      console.log("cannot categorize")
    }).then(() => {
      res.send("good job")
    })
  });

  return router;
}
