const express = require("express");
const app = express();
const studentRoutes = require("./api/routes/student");
const studentRoutesM = require("./api/routes/studentM");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("mongodb+srv://st3883:Titofer09@chris07.ufqczet.mongodb.net/?retryWrites=true&w=majority&appName=Chris07");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/student", studentRoutes);
app.use("/studentM", studentRoutesM);

app.use(express.static("public")); 

module.exports = app;
