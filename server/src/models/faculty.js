// creating a model for faculty
const mongoose = require('mongoose')
const facultySchema =new mongoose.Schema({

    //student details
    facultyname: String,
    facultybranch: String,
    facultyemail: String,
    facultypassword: String

},{timestamps: true})
module.exports = mongoose.model('Faculty', facultySchema);
