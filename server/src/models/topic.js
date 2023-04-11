// creating a model for topic
const mongoose = require('mongoose')
const topicSchema =new mongoose.Schema({

    //topic details
    subject:String,
    topicname:String,
    branch:String,
    duedate:String,
    duetime:String,
    femail:String,
    fname:String,
    studentemail:String,
    ifSubmitted:Array,


},{timestamps: true})
module.exports = mongoose.model('Topic', topicSchema);
