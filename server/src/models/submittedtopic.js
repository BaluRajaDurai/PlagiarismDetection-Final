// creating a model for submitted topic
const mongoose = require('mongoose')
const submittedtopicSchema =new mongoose.Schema({

    //topic details
    studentname:String,
    studentemail:String,
    branch:String,
    duedate:String,
    duetime:String,
    docname:String,
    topicname:String,
    subjectname:String,
    topicid:String,
    comment:String,
    result:String,
    fname:String,
    femail:String

},{timestamps: true})
module.exports = mongoose.model('SubmittedTopic', submittedtopicSchema);
