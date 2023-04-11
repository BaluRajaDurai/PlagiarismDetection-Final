const Admin = require("../models/admin");
const Faculty = require("../models/faculty");

// controller for admin login
exports.adminLogin = async (req, reply) => {
  try {
    if (
      req.body.adminemail == "admin123@gmail.com" &&
      req.body.adminpassword == "admin2021"
    ) {
      reply.send({ message: "Login Successfull!" });
    } else {
      reply.send({ fail: "Invalid email or password!" });
    }
  } catch (error) {
    console.log(error);
    reply.send({ error: "Login Failed" });
  }
};

//controller for adding report
exports.sendReport = async (req, reply) => {
  try {
    const sendreport = new Admin(req.body);
    await sendreport.save();
    reply.send({ sendreport, message: "Report Sended!" });
  } catch (error) {
    console.log(error);
    reply.send({ error: "Creation Failed" });
  }
};

exports.viewReport = async (req, reply) => {
  try {
    const viewreports = await Admin.find({});
    reply.code(200).send(viewreports);
  } catch (e) {
    reply.code(500).send(e);
  }
};

//controller for deleting report
exports.reportDelete = async (req, reply) => {
  try {
    const id = req.params.id;
    const reportdelete = await Admin.findOneAndDelete({ _id: id });
    if (reportdelete) {
      reply.send({ reportdelete, message: "Report Deleted Successfully" });
    } else {
      reply.send({ error: "No Topic Found" });
    }
    reply.code(200).send(reportdelete);
  } catch (e) {
    reply.code(500).send(e);
  }
};

// controller for admin review
exports.adminReport = async (req, reply) => {
  try {
    const id = req.params.id;
    const comment = await Admin.findByIdAndUpdate(
      { _id: id },
      { $set: { comment: req.body.comment } }
    );
    if (comment) {
      reply.send({ comment, message: "Review Added Successfully" });
    } else {
      reply.send({ error: "No Faculty Found" });
    }
  } catch (e) {
    console.log(e);
    reply.send({ error: "Update Failed" });
  }
};
