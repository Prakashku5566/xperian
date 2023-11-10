import companyModel from "../models/company.model.js";

//==============================createUser=====================================//

const createCompany = async (req, res) => {
  try {
    let {
      name,
      phone,
      email,
      hrName,
      hrNumber,
      HiringRequierments,
      Address,
      callProcess,
      siftTiming,
      workingDays,
      weeklyOff,
      cab,
      meals,
      interviewProcess,
      interviewTiming,
    } = req.body;

    if (Object.keys(req.body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "for registration user data is required" });
    }

    if (!name) {
      return res.status(400).send({ status: false, msg: "Enter your  Name" });
    }

    if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid Name" });
    }

    if (!phone) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Enter company contact Number. Its mandatory",
        });
    }
    if (!/^[\s]*[6-9]\d{9}[\s]*$/.test(phone)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter valid phone Number" });
    }

    let existphone = await companyModel.findOne({ phone: phone });
    if (existphone) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Company with this phone number is already registered.",
        });
    }

    if (!email) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Enter your email .Its mandatory for registration!!!",
        });
    }
    if (!/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter valid Email" });
    }

    let existEmail = await companyModel.findOne({ email: email });
    if (existEmail) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Company with this email is already registered",
        });
    }
    if (!hrName) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter the Hr name" });
    }

    if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(hrName)) {
      return res
        .status(400)
        .send({ status: false, msg: "please Enter valid Name" });
    }
    if (!hrNumber) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter hr phone Number. Its mandatory" });
    }
    if (!/^[\s]*[6-9]\d{9}[\s]*$/.test(hrNumber)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter valid phone Number" });
    }
    if (!HiringRequierments) {
      return res
        .status(400)
        .send({ status: false, msg: "Add the HiringRequierments" });
    }

    //  if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(HiringRequierments)) {
    //     return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
    // }
    if (!Address) {
      return res.status(400).send({ status: false, msg: "Add the Address" });
    }
    if (!callProcess) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the callProcess" });
    }
    if (
      ![
        "Meta/English",
        "PPC/English",
        "Meta/Spanish",
        "PPC/Spanish",
        "bilingual",
      ].includes(callProcess)
    ) {
      return res
        .status(400)
        .send({
          status: false,
          msg: " callProcess must be type of ['Meta/English','PPC/English','Meta/Spanish','PPC/Spanish','bilingual']",
        });
    }

    // if (!siftTiming) {
    //   return res
    //     .status(400)
    //     .send({ status: false, msg: "Please mentioned the siftTiming" });
    // }
    if (!workingDays) {
      return res
        .status(400)
        .send({ status: false, msg: "Please mentioned the workingDays" });
    }
    if (!weeklyOff) {
      return res
        .status(400)
        .send({ status: false, msg: "Please mentioned the weekOFFs" });
    }
    if (!cab) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "please mentioned there is cab available or not",
        });
    }
    if (!meals) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "please mentioned there is meals available or not",
        });
    }
    if (!interviewProcess) {
      return res
        .status(400)
        .send({ status: false, msg: "Please mentioned the interviewProcess" });
    }
    if (!interviewTiming) {
      return res
        .status(400)
        .send({ status: false, msg: "Please mentioned the interviewTiming" });
    }
    let savedData = await companyModel.create(req.body);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

export {createCompany};
