import companyModel from "../models/company.model.js";
import mongoose from "mongoose";

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
        "bilingual"
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
    if (
      ![ "yes",
          "no",
          "included",
          "depends on route"
      ].includes(cab)
    ) {
      return res
        .status(400)
        .send({
          status: false,
          msg: " cab must be type of ['yes','no','included','depends on route']",
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
    if (
      ![ "yes",
          "no",
          "included"
      ].includes(meals)
    ) {
      return res
        .status(400)
        .send({
          status: false,
          msg: " meals must be type of ['yes','no','included']",
        });
    }
    if (!interviewProcess) {
      return res
        .status(400)
        .send({ status: false, msg: "Please mentioned the interviewProcess" });
    }
    if (
      ![ "face to face",
           "telephonic"
      ].includes(interviewProcess)
    ) {
      return res
        .status(400)
        .send({
          status: false,
          msg: " interviewProcess must be type of ['face to face' or'telephonic']",
        });
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
//=================================getByquery============================================//

const getCompanyByquery = async (req, res) => {
  try {
      const filter = { isDeleted: false }

      const queryParams = req.query
      {
          const {companyId, name,Address } = queryParams
          if (companyId) {
              if (!mongoose.Types.ObjectId.isValid(companyId)) {
                  return res.status(400).send({ status: false, msg: `please enter a valid companyId` })
              }
              filter["companyId"] = companyId
          }

          if (name) {
              filter['name'] = name
          }

          if (Address) {
              filter['Address'] =Address
         }
      }
      
      const company = await companyModel.find(filter)  //.select({  hrId: 1,name:1, username: 1, phone: 1}).collation({ locale: "en" }).sort({ name: 1 })

      if (Object.keys(company).length == 0)
      return res.status(404).send({ status: false, msg: "No Such company is found" })

     return res.status(200).send({ status: true, message: 'company list', data:company })

  }
  catch (err) {
      // console.log(err.message)
      res.status(500).send({ status: false, Error: err.message })
  }
}

//=========================================UPDATE Company========================================================//

const updateCompany = async (req, res) => {
  try {
      let companyId = req.params.companyId
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
      if (Object.keys(req.body).length == 0)
          return res.status(400).send({ status: false, msg: "Please Enter Details For Updating" })

      if (!companyId) {
          return res.status(400).send({ status: false, msg: "companyId must be present" })
      }

      if (!mongoose.Types.ObjectId.isValid(companyId)) {
          return res.status(400).send({ status: false, msg: `this  companyId is not a valid Id` })
      }
      let findcompanyId = await companyModel.findById(companyId)

      
      if (!findcompanyId) {
          return res.status(404).send({ status: false, msg: "no Company found with this company Id" })
      }
      if (name) {
        if(name.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid name" })
      if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(name)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please enter a valid Name" });
      }
     
  
      if (phone) {
        if(phone.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid Number" })
      if (!/^[\s]*[6-9]\d{9}[\s]*$/.test(phone)) 
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
  
      let existEmail = await companyModel.findOne({ email: email });
      if (existEmail) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "User with this email is already registered",
          });
      }
      if (hrNumber) {
        if(hrNumber.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid hrNumber" })
      }
      if (hrName) {
        if(hrName.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid hrName" })
      }
      if (HiringRequierments) {
        if(HiringRequierments.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid HiringRequierments" })
      }
      if (Address) {
        if(Address.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid Address" })
      }
      if (callProcess) {
        if(callProcess.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid callProcess" })
      
      if (
        ![
          "Meta/English",
          "PPC/English",
          "Meta/Spanish",
          "PPC/Spanish",
          "bilingual",
        ].includes(callProcess)
      ) 
        return res
          .status(400)
          .send({
            status: false,
            msg: " callProcess must be type of ['Meta/English','PPC/English','Meta/Spanish','PPC/Spanish','bilingual']",
          });
      }
      if (siftTiming) {
        if(siftTiming.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter  valid siftTiming" })
      } 
    if (workingDays) {
        if(workingDays.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter  valid workingDays" })
      }
      if (weeklyOff) {
        if(weeklyOff.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid weeklyOff" })
      }
      if (cab) {
        if(cab.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid detail" })
        if (
        ![ "yes",
          "no",
          "included",
          "depends on route"
      ].includes(cab)
        ) 
      return res
        .status(400)
        .send({
          status: false,
          msg: " cab must be type of ['yes','no','included','depends on route']",
        });
      }
      if (meals) {
        if(meals.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid detail" })
        if (
          ![ "yes",
              "no",
              "included",
          ].includes(cab)
        ) 
          return res
            .status(400)
            .send({
              status: false,
              msg: " meals must be type of ['yes','no','included']",
            });
        }
      
      if (interviewProcess) {
        if(interviewProcess.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid detail" })
      }
      if (interviewTiming) {
        if(interviewTiming.trim().length==0) return res.status(400).send({ status: false, msg: "Please enter a valid interviewTiming" })
      }
      if (findcompanyId.isDeleted == true) {
          return res.status(404).send({ status: false, msg: "Company is already deleted" })
      }
 
      let updatedCompany = await companyModel.findOneAndUpdate({ _id:companyId }, {
          $set: {
            name:name,
            phone:phone,
            email:email,
            hrName:hrName,
            hrNumber:hrNumber,
            HiringRequierments:HiringRequierments,
            Address:Address,
            callProcess:callProcess,
            siftTiming:siftTiming,
            workingDays:workingDays,
            weeklyOff:weeklyOff,
            cab:cab,
            meals:meals,
            interviewProcess:interviewProcess,
            interviewTiming:interviewTiming
          },
      }, { new: true })


      return res.status(200).send({ status: true, message: "Company", data: updatedCompany })
  }
  catch (err) {
      res.status(500).send({ status: false, msg: err.message })
  }
};


//========================================================deleteBook===================================//
const DeleteCompany = async function (req, res) {
  try {

      let companyId = req.params.companyId
      if (!mongoose.Types.ObjectId.isValid(companyId))
          return res.status(400).send({ status: false, msg: "please enter valid companyId" })
      const savedata = await companyModel.findById(companyId)
      if (savedata.isDeleted == true) {
          return res.status(404).send({ status: false, message: "company is already removed" })
      }

      const deleteHr = await companyModel.findByIdAndUpdate({ _id: companyId }, { $set: { isDeleted: true, deletedAt: Date.now() } });
      return res.status(200).send({ status: true, message: "Company has been deleted successfully" })


  } catch (error) {
      res.status(500).send({ status: false, msg: error.message });

  }
}

export {createCompany,getCompanyByquery,updateCompany,DeleteCompany};
