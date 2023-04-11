// creating a model for report
const mongoose = require('mongoose')
const adminSchema =new mongoose.Schema({

    //report details
    facultyname: String,
    facultyemail: String,
    subject:String,
    topic:String,
    report: String,
    comment: String

},{timestamps: true})
module.exports = mongoose.model('Admin', adminSchema);
