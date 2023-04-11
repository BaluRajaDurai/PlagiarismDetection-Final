const Faculty = require("../models/faculty");
const Topic = require("../models/topic");
const SubmittedTopic = require("../models/submittedtopic");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const axios = require("axios");

// sending faculty information using nodemailer
const sendEmail = (email, name, password) => {
  console.log(email,name,password)
  var Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "plagiarismdetectionofficial@gmail.com",
      pass: "Welcome@123",
    },
  });

  var mailOptions;
  let sender = "PlagiarismDetection Admin";
  mailOptions = {
    from: sender,
    to: email,
    subject: "Faculty Login Details",
    html: `<h4>Hello, ${name}</h4>
        <p>You have been successfully added as faculty in plagiarism checker app by admin</p>
        <p>Please use below details for login</p>
        <p>Your Email : ${email}</p>
        <p>Your Password : ${password}</p>
        </div>`,
  };

  Transport.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log(err);
      console.log("error");
    } else {
      console.log("Email sent to faculty successfully");
    }
  });
};

// controller for add faculty
exports.addFaculty = async (req, reply) => {
  try {
    console.log(req.body)
    const check = await Faculty.findOne({
      facultyemail: req.body.facultyemail,
    });
    if (check) {
      reply.send({ alert: "Email already exist!" });
    } else {
      // Insert the new user if they do not exist yet
      const faculty = new Faculty(req.body);
      await faculty.save();
      sendEmail(
        req.body.facultyemail,
        req.body.facultyname,
        req.body.facultytmprypassword
      );
      reply.send({ faculty, message: "Faculty Added!" });
    }
  } catch (error) {
    reply.send({ error: "Creation Failed" });
  }
};

// controller for faculty login
exports.facultyLogin = async (req, reply) => {
  try {
    // checking if the email in db

    const login = await Faculty.findOne({
      facultyemail: req.body.facultyemail,
    });

    if (login) {
      // checking for valid faculty
      const validPassword = await bcrypt.compare(
        req.body.facultypassword,
        login.facultypassword
      );
      if (validPassword) {
        reply.send({ message: "Login Successfull!" });
      } else {
        reply.send({ error2: "Invalid password!" });
      }
    } else {
      reply.send({ error1: "Email id not found!" });
    }
  } catch (error) {
    console.log(error);
    reply.send({ error: "Login Failed" });
  }
};

// controller for geting faculty details
exports.facultyDetail = async (req, reply) => {
  try {
    const facultydetails = await Faculty.find({});
    reply.code(200).send(facultydetails);
  } catch (e) {
    reply.code(500).send(e);
  }
};

// controller for geting faculty profile
exports.facultyProfile = async (req, reply) => {
  try {
    const id = req.params.id;
    const facultyprofile = await Faculty.findOne({ facultyemail: id });
    reply.code(200).send(facultyprofile);
  } catch (e) {
    reply.code(500).send(e);
  }
};

//controller for editing facultyprofile
exports.profileEdit = async (req, reply) => {
  try {
    const id = req.params.id;
    const profedit = await Faculty.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (profedit) {
      reply.send({ profedit, message: "Profile Updated Successfully" });
    } else {
      reply.send({ error: "No Profie Found" });
    }
  } catch (e) {
    console.log(e);
    reply.send({ error: "Update Failed" });
  }
};

//controller for deleting faculty
exports.facultyDelete = async (req, reply) => {
  try {
    const id = req.params.id;
    const facultydelete = await Faculty.findOneAndDelete({ facultyemail: id });
    reply.code(200).send({ facultydelete, message: "Faculty Deleted!" });
  } catch (e) {
    reply.code(500).send(e);
  }
};

//controller for adding topic
exports.addTopic = async (req, reply) => {
  try {
    // console.log(req.body)
    const topic = new Topic(req.body);
    await topic.save();
    reply.send({ topic, message: "Topic Added!" });
  } catch (error) {
    console.log(error);
    reply.send({ error: "Creation Failed" });
  }
};

// controller for geting faculty details
exports.topicDetail = async (req, reply) => {
  try {
    const id = req.params.id;
    const topicdetails = await Topic.find({ femail: id });
    reply.code(200).send(topicdetails);
  } catch (e) {
    reply.code(500).send(e);
  }
};

// controller for single topic
exports.singleTopic = async (req, reply) => {
  try {
    const id = req.params.id;
    const singletopic = await Topic.find({ _id: id });
    reply.code(200).send(singletopic);
  } catch (e) {
    reply.code(500).send(e);
  }
};

//controller for deleting topic
exports.topicDelete = async (req, reply) => {
  try {
    const id = req.params.id;
    const topicdelete = await Topic.findOneAndDelete({ _id: id });
    if (topicdelete) {
      reply.send({ topicdelete, message: "Topic Deleted Successfully" });
    } else {
      reply.send({ error: "No Topic Found" });
    }
    reply.code(200).send(topicdelete);
  } catch (e) {
    reply.code(500).send(e);
  }
};

//controller for editing topic
exports.topicEdit = async (req, reply) => {
  try {
    const id = req.params.id;
    const topicedit = await Topic.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (topicedit) {
      reply.send({ topicedit, message: "Topic Updated Successfully" });
    } else {
      reply.send({ error: "No Topic Found" });
    }
  } catch (e) {
    console.log(e);
    reply.send({ error: "Update Failed" });
  }
};

// controller for geting submitted topic details
exports.topicSubmitted = async (req, reply) => {
  try {
    const id = req.params.id;
    const submitdetails = await SubmittedTopic.find({ femail: id });
    reply.code(200).send(submitdetails);
  } catch (e) {
    reply.code(500).send(e);
  }
};

// controller for adding comment
exports.addComment = async (req, reply) => {
  try {
    const id = req.params.id;
    const comment = await SubmittedTopic.findByIdAndUpdate(
      { _id: id },
      { $set: { comment: req.body.comment } }
    );
    if (comment) {
      reply.send({ comment, message: "Comment Added Successfully" });
    } else {
      reply.send({ error: "No Student Found" });
    }
  } catch (e) {
    console.log(e);
    reply.send({ error: "Update Failed" });
  }
};

// controller for check plagiarism
exports.checkPlag = async (req, reply) => {
  try {

    const id = req.params.id;

    let plag = [];
  
    axios
      .get("http://localhost:8000/check_plag/" + id)
      .then((response) => {
        Object.keys(response.data.output).forEach((key) => {
          
          let obj = new Object();

          obj.email = key;
          obj.percentage = response.data.output[key].plagPercentage;

          plag.push(obj);
        });

        plag.map(async function (e) {
          await SubmittedTopic.findOneAndUpdate(
            { studentemail: e.email, topicid: id },
            { $set: { result: e.percentage } }
          );
        });

        reply.send({ message: "Successfully checked plagiarism!" });

      })
      .catch((error) => {

        console.log(error);
        reply.send({ error: "Need more than one student to check plagiarism!" });

      });
  } catch (e) {
    console.log(e);
    reply.send({ error: "Unable to check plagiarism!" });
  }
};
