"use strict";
const express = require('express');
const router  = express.Router();
module.exports = (knex) => {
  router.get("/:id", (req, res) => {
    knex
      .select("id")
      .from("users").where('name','=', req.params.id)
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
  return router;
}
