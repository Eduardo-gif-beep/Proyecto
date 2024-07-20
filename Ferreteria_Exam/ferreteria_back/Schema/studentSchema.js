const mongoose = require("mongoose");

const studenSchema = mongoose.Schema({
    _id: String,
    name: String,
    last_name: String,
    age:Number
});

module.exports = mongoose.model("studentSchema",studenSchema)
