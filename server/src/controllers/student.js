const Student = require("../models/student");
const Topic = require("../models/topic");
const SubmittedTopic = require("../models/submittedtopic");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// crating a unique string
const randString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  return randStr;
};

// sending confirmation mail using nodemailer
const sendEmail = (email, uniqueString) => {
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
    subject: "Please confirm your account",
    html: `<h4>Email Confirmation</h4>
            <p>Thank you for registration. Please confirm your email by clicking on the following link</p>
            <a href="http://localhost:5000/studentverify/${uniqueString}"}>Click here</a>
            </div>`,
  };

  Transport.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log(err);
      console.log("error");
    } else {
      console.log("Email sent successfully");
    }
  });
};

// controller for student signup
exports.studentSignup = async (req, reply) => {
  try {
    // console.log(req.body)
    // checking if the email was already in db
    const check = await Student.findOne({
      studentemail: req.body.studentemail,
    });
    if (check) {
      reply.send({ alert: "Email already exist!" });
    } else {
      // Insert the new user if they do not exist yet
      const uniqueString = randString();
      // console.log("unique",uniqueString)
      const isValid = false;
      const student = new Student({ isValid, uniqueString, ...req.body });
      await student.save();
      sendEmail(req.body.studentemail, uniqueString);
      reply.send({ student, message: "Student Created!" });
    }
  } catch (error) {
    console.log(error);
    reply.send({ error: "Creation Failed" });
  }
};

// controller for verifying student email
exports.studentVerify = async (req, reply) => {
  try {
    const uniqueString = req.params.uniqueString;
    const verify = await Student.updateOne(
      { uniqueString: uniqueString },
      { $set: { isValid: true } }
    );
    reply.redirect("http://localhost:3000/plagarismdetection/studentlogin");
  } catch (e) {
    reply.code(500).send(e);
  }
};

// controller for student login
exports.studentLogin = async (req, reply) => {
  try {
    // checking if the email in db
    const login = await Student.findOne({
      studentemail: req.body.studentemail,
    });

    if (login) {
      // checking if user confirmed the email
      if (login.isValid) {
        // checking for valid student name and password
        const validPassword = await bcrypt.compare(
          req.body.studentpassword,
          login.studentpassword
        );
        if (req.body.studentname == login.studentname && validPassword) {
          reply.send({ message: "Login Successfull!" });
        } else {
          reply.send({ error3: "Invalid username or password!" });
        }
      } else {
        reply.send({ error2: "Please confirm your email!" });
      }
    } else {
      reply.send({ error1: "Email id not found!" });
    }
  } catch (error) {
    console.log(error);
    reply.send({ error: "Login Failed" });
  }
};

// controller for geting student details
exports.studentDetail = async (req, reply) => {
  try {
    const studentdetails = await Student.find({});
    reply.code(200).send(studentdetails);
  } catch (e) {
    reply.code(500).send(e);
  }
};

// controller for geting student profile
exports.studentProfile = async (req, reply) => {
  try {
    const id = req.params.id;
    const studentprofile = await Student.findOne({ studentemail: id });
    reply.code(200).send(studentprofile);
  } catch (e) {
    reply.code(500).send(e);
  }
};

//controller for editing studentprofile
exports.studentprofileEdit = async (req, reply) => {
  try {
    const id = req.params.id;
    const studprofedit = await Student.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (studprofedit) {
      reply.send({ studprofedit, message: "Profile Updated Successfully" });
    } else {
      reply.send({ error: "No Profie Found" });
    }
  } catch (e) {
    console.log(e);
    reply.send({ error: "Update Failed" });
  }
};

// controller for student home page topic
exports.studentTopic = async (req, reply) => {
  try {
    const studentTopic = await Student.aggregate([
      {
        $lookup: {
          from: "topics",
          localField: "studentbranch",
          foreignField: "branch",
          as: "student_topic",
        },
      },
    ]);
    // console.log(Topic)
    // console.log(studentTopic)
    reply.code(200).send(studentTopic);
  } catch (e) {
    reply.code(500).send(e);
  }
};

//controller for submitted topic
exports.topicSubmisson = async (req, reply) => {
  try {
    const subtopic = new SubmittedTopic(req.body);
    await subtopic.save();
    reply.send({ subtopic, message: "Topic Submitted!" });
  } catch (error) {
    console.log(error);
    reply.send({ error: "Creation Failed" });
  }
};

// controller for verify submitted topics
exports.submitVerify = async (req, reply) => {
  try {
    const id = req.params.id;

    const submitted = await Topic.updateOne(
      { _id: id },
      { $push: { ifSubmitted: [req.body.studentemail] } }
    );
    if (submitted) {
      reply.send({ submitted, message: "Topic Submisson updated" });
    } else {
      reply.send({ error: "No Topic Found" });
    }
  } catch (e) {
    reply.code(500).send(e);
  }
};

// controller for geting submitted topic details
exports.submittedDetail = async (req, reply) => {
  try {
    const id = req.params.id;
    const submitdetails = await SubmittedTopic.find({ studentemail: id });
    reply.code(200).send(submitdetails);
  } catch (e) {
    reply.code(500).send(e);
  }
};
