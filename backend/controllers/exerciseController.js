"use strict";
const Models = require("../models"); 

const getExercises = (res) => {
 // finds all exercises
 Models.Exercise.find({})
 .then(data => res.send({result: 200, data: data}))
 .catch(err => {
 console.log(err);
 res.send({result: 500, error: err.message})
 }) 
}

const createExercise = (data, res) => {
 // creates a new exercise using JSON data POSTed in request body
 console.log(data)
 new Models.Exercise(data).save()
 .then(data => res.send({result: 200, data: data}))
 .catch(err => {
 console.log(err);
 res.send({result: 500, error: err.message})
 }) 
}

const updateExercise = (req, res) => {
    // updates the exercise matching the ID from the param using JSON data POSTed in request body
    console.log(req.body)
    Models.Exercise.findByIdAndUpdate(req.params.id, req.body, { 
   new: true })
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
    console.log(err);
    res.send({result: 500, error: err.message})
    }) 
   }
   const deleteExercise = (req, res) => {
    // deletes the exercise matching the ID from the param
    Models.Exercise.findByIdAndDelete(req.params.id)
    .then(data => res.send({result: 200, data: data}))
    .catch(err => {
    console.log(err);
    res.send({result: 500, error: err.message})
    }) 
   }

module.exports = {
 getExercises, createExercise, updateExercise, deleteExercise
}
