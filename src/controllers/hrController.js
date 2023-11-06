import hrModel from "../models/hrModel.js";
// import { createHr } from './hr.controller';
// const jwt = require('jsonwebtoken');

//==============================createUser=====================================//

const createHr = async (req, res) => {
  try {
    let { name, username, phone, email, img, hrId, password } = req.body;

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

    if (!username) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the  username" });
    }

    if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(username)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid username" });
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
    let existphone = await userModel.findOne({ phone: phone });
    if (existphone) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "User with this phone number is already registered.",
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

    let existEmail = await userModel.findOne({ email: email });
    if (existEmail) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "User with this email is already registered",
        });
    }

    if (!img) {
      return res
        .status(400)
        .send({ status: false, msg: "please add the profile picture" });
    }

    if (!hrId) {
      return res.status(400).send({ status: false, msg: "Enter the hrId" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter Password for registartion" });
    }

    if (!/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/.test(password)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "please Enter valid Password and it's length should be 8-15",
        });
    }

    let savedData = await hrModel.create(req.body);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//==========================================UserLOgin========================//

// const login = async (req, res) => {
//     try {

//         const { email, password } = req.body
//         if (!email) {
//             return res.status(400).send({ status: false, msg: "Email is mandatory for logging In" })
//         }

//         if (!password) {
//             return res.status(400).send({ status: false, msg: "Please enter password. It is Mandatory" })
//         }
//         let data = await userModel.findOne({ email: email, password: password })

//         if (!data) {
//             return res.status(400).send({ status: false, msg: "Email or Password is incorrect.Please recheck it" })
//         }
//     //    console.log(data)
//         let token = await jwt.sign({ id: data._id.toString() }, "XPERION REQRUIMENT SERVICE", { expiresIn: '24hr' })
//          res.header({ "x-api-key": token })
//        return res.status(200).send({ status: true, message: "Login Successful", data: token })
//     }
//     catch (err) {
//        return res.status(500).send({ error: err.message });
//     }

// }
// module.exports.login = login
// module.exports.createHr = createHr
export { createHr };
