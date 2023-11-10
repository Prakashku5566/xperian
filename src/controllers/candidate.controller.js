import canndidateModel from "../models/canndidate.model.js"

//==============================createUser=====================================//

const createCandidate = async (req, res) => {
  try {
    let {
      fname,
      lname,
      phone,
      email,
      img,
      experienceCallProcess,
      language,
      profile,
      status,
      dateOfSelection,
      dateOfjoining,
      completionOfCompanyLockIn,
      password,
    } = req.body;

    if (Object.keys(req.body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Candidate data is required" });
    }

    if (!fname) {
      return res.status(400).send({ status: false, msg: "Enter your  Name" });
    }
    if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(fname)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid Name" });
    }
    if (!lname) {
      return res.status(400).send({ status: false, msg: "Enter your  Name" });
    }
    if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(lname)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid Name" });
    }

    if (!phone) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter your phone Number. Its mandatory" });
    }
    if (!/^[\s]*[6-9]\d{9}[\s]*$/.test(phone)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter valid phone Number" });
    }

    let existphone = await canndidateModel.findOne({ phone: phone });
    if (existphone) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "User with this phone number is already exist",
        });
    }

    if (!email) {
      return res.status(400).send({ status: false, msg: "Enter your email " });
    }
    if (!/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter valid Email" });
    }

    let existEmail = await canndidateModel.findOne({ email: email });
    if (existEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "User with this email is already exist" });
    }

    if (!experienceCallProcess) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the experience of the candidate" });
    }

    if (!language) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the language candidate knows" });
    }

    if (!profile) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Enter the profile of candidate that he or she has experience or not",
        });
    }

    if (!status) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the status of the candidate" });
    }
    if (!dateOfSelection) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the date of selection" });
    }
    if (!dateOfjoining) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the date of joining" });
    }
    if (!completionOfCompanyLockIn) {
      return res
        .status(400)
        .send({ status: false, msg: "company lockin date" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter Password" });
    }

    if (!/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/.test(password)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "please Enter valid Password and it's length should be 8-15",
        });
    }

    let savedData = await canndidateModel.create(req.body);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

export {createCandidate} 
