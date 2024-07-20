const express = require("express");
const routes = express.Router();
const studentSchema = require("../../Schema/studentSchema");
const mongoose = require("mongoose");

routes.post("/",(req, res, next) => {
    if (req.body._id && req.body.name && req.body.last_name && req.body.age) {
        const student = new studentSchema({
            _id: req.body._id,
            name: req.body.name,
            last_name: req.body.last_name,
            age: req.body.age
        });

        student
            .save()
            .then(result => {
                res.status(200).json({
                    message: "The record was successfully added.",
                    id: student.id
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was a problem adding the record.",
                    error: err
                });
            });

    } else {
        res.status(400).json({
            message: "Please check your input."
        });
    }
});

routes.delete("/delete/:id", (req, res, next) => {
    if (req.params.id) {
        studentSchema.findOneAndDelete({_id:req.params.id})
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "The record was successfully deleted."
                });
            } else {
                res.status(404).json({
                    message: "Record not found."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "There was a problem deleting the record.",
                error: err
            });
        });
    } else {
        res.status(400).json({
            message: "Please check your input."
        });
    }
});

routes.get("/", (req, res, next) => {
    console.log("GET");
    studentSchema.find()
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Here you have all the records.",
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "We were not able to retrieve all the records.",
                error: err
            });
        });
});

routes.get("/id/:id", (req, res, next) => {
    studentSchema.findById(req.params.id)
        .exec()
        .then(doc => {
            if (doc !== null) {
                res.status(200).json({
                    message: "Here you have your record.",
                    data: doc
                });
            } else {
                res.status(404).json({
                    message: "This ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "We were not able to retrieve the record.",
                error: err
            });
        });
});

module.exports = routes;
