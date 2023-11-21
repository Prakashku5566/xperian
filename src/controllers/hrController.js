import hrModel from "../models/hrModel.js";
// import { createHr } from './hr.controller';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";


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
    let existphone = await hrModel.findOne({ phone: phone });
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

    let existEmail = await hrModel.findOne({ email: email });
    if (existEmail) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "User with this email is already registered",
        });
    }

    // if (!img) {
    //   return res
    //     .status(400)
    //     .send({ status: false, msg: "please add the profile picture" });
    // }

    // if (!hrId) {
    //   return res.status(400).send({ status: false, msg: "Enter the hrId" });
    // }
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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res
        .status(400)
        .send({ status: false, msg: "username is mandatory for logging In" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter password. It is Mandatory" }); 
    }
    let data = await hrModel.findOne({ username: username, password: password });

    if (!data) {
      return res.status(400).send({
        status: false,
        msg: "Email or Password is incorrect.Please recheck it",
      });
    }
    //    console.log(data)
    let token = await jwt.sign(
      { id: data._id.toString() },
      "XPERION HR",
      { expiresIn: "24hr" }
    );
    res.header({ "x-api-key": token });
    return res
      .status(200)
      .send({ status: true, message: "Login Successful", data: token });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};


//=================================getByquery============================================//

const getHrByquery = async (req, res) => {
  try {
      const filter = { isDeleted: false }

      const queryParams = req.query
      {
          const { hrId,username,phone } = queryParams
          if (hrId) {
              if (!mongoose.Types.ObjectId.isValid(hrId)) {
                  return res.status(400).send({ status: false, msg: `please enter a valid hrId` })
              }
              filter["hrId"] = hrId
          }

          if (username) {
              filter['username'] = username
          }

          if (phone) {
              filter['phone'] =phone
         }
      }
      
      const hrs = await hrModel.find(filter)  //.select({  hrId: 1,name:1, username: 1, phone: 1}).collation({ locale: "en" }).sort({ name: 1 })

      if (Object.keys(hrs).length == 0)
      return res.status(404).send({ status: false, msg: "No Such Hr is found" })

     return res.status(200).send({ status: true, message: 'hr list', data:hrs })

  }
  catch (err) {
      // console.log(err.message)
      res.status(500).send({ status: false, Error: err.message })
  }
}


//=========================================UPDATE HR========================================================//

const updateHr = async (req, res) => {
  try {
      let hrId = req.params.hrId
      const { name,username, phone,email,password} = req.body

      if (Object.keys(req.body).length == 0)
          return res.status(400).send({ status: false, msg: "Please Enter Hr Details For Updating" })

      if (!hrId) {
          return res.status(400).send({ status: false, msg: "hrId must be present" })
      }

      if (!mongoose.Types.ObjectId.isValid(hrId)) {
          return res.status(400).send({ status: false, msg: `this  hrId is not a valid Id` })
      }
      let findhrId = await hrModel.findById(hrId)

      
      if (!findhrId) {
          return res.status(404).send({ status: false, msg: "no Hr found with this hr Id" })
      }
      if (name) {
        if(name.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid name" })
      if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(name)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please enter a valid Name" });
      }
      if (username) {
        if(username.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid username" })
      if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(username)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please enter a valid username" });
      }
  
      if (phone) {
        if(phone.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid Number" })
      if (!/^[\s]*[6-9]\d{9}[\s]*$/.test(phone)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter valid phone Number" });
      }
      let existphone = await hrModel.findOne({ phone: phone });
      if (existphone) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "User with this phone number is already registered.",
          });
      }
  
      if (email) {
        if(email.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid email" })
      if (!/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/.test(email)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter valid Email" });
      }
  
      let existEmail = await hrModel.findOne({ email: email });
      if (existEmail) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "User with this email is already registered",
          });
      }
      if (password) {
        if(password.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid password" })
      if (!/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/.test(password)) 
        return res
          .status(400)
          .send({
            status: false,
            msg: "please Enter valid Password and it's length should be 8-15",
          });
      }
      if (findhrId.isDeleted == true) {
          return res.status(404).send({ status: false, msg: "hr is already deleted" })
      }
 
      let updatedHr = await hrModel.findOneAndUpdate({ _id: hrId }, {
          $set: {
              name:name,
              username:username,
              email:email,
              phone: phone,
              password:password
          },
      }, { new: true })


      return res.status(200).send({ status: true, message: "hr", data: updatedHr })
  }
  catch (err) {
      res.status(500).send({ status: false, msg: err.message })
  }
};


//========================================================deleteBook===================================//
const DeleteHr = async function (req, res) {
  try {

      let hrId = req.params.hrId
      if (!mongoose.Types.ObjectId.isValid(hrId))
          return res.status(400).send({ status: false, msg: "please enter valid username" })
      const savedata = await hrModel.findById(hrId)
      if (savedata.isDeleted == true) {
          return res.status(404).send({ status: false, message: "hr is already removed" })
      }

      const deleteHr = await hrModel.findByIdAndUpdate({ _id: hrId }, { $set: { isDeleted: true, deletedAt: Date.now() } });
      return res.status(200).send({ status: true, message: "Hr has been deleted successfully" })


  } catch (error) {
      res.status(500).send({ status: false, msg: error.message });

  }
}
 export { createHr,login,getHrByquery ,updateHr,DeleteHr};
