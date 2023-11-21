import candidateModel from "../models/canndidate.model.js"
import mongoose from "mongoose";

//==============================createUser=====================================//

const createCandidate = async (req, res) => {
  try {
    let {
      fname,
      lname,
      phone,
      email,
      // img,
      experienceCallProcess,
      language,
      profile,
      status,
      dateOfSelection,
      dateOfjoining,
      completionOfCompanyLockIn,
      
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

    let existphone = await candidateModel.findOne({ phone: phone });
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

    let existEmail = await candidateModel.findOne({ email: email });
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
    if (
      ![ 
      "Experience",
      "Fresher"
      ].includes(profile)
    ) {
      return res
        .status(400)
        .send({
          status: false,
          msg: " profile must be type of ['Experience'or'Fresher']",
        });
    }

    if (!status) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter the status of the candidate" });
    }
    if (
      ![ 
      "Active",
      "Rejected",
      "Terminated"
      ].includes(status)
    ) {
      return res
        .status(400)
        .send({
          status: false,
          msg: " status must be type of ['Active','Rejected'or'Terminated']",
        });
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
    if (
      ![ "yes",
          "no",
      ].includes(completionOfCompanyLockIn)
    ) {
      return res
        .status(400)
        .send({
          status: false,
          msg: " completionOfCompanyLockIn must be type of ['yes','no']",
        });
    }
    

    let savedData = await candidateModel.create(req.body);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
//=================================getByquery============================================//

const getCandidateByquery = async (req, res) => {
  try {
      const filter = { isDeleted: false }

      const queryParams = req.query
      {
          const {candidateId,fname,phone,profile,status ,language} = queryParams
          if (candidateId) {
              if (!mongoose.Types.ObjectId.isValid(candidateId)) {
                  return res.status(400).send({ status: false, msg: `please enter a valid companyId` })
              }
           filter["candidateId"] = candidateId
            }
          if (fname) {
              filter['fname'] = fname
          }

          if (phone) {
              filter['phone'] =phone
         }
         if (profile) {
          filter['profile'] =profile
      }
     if (status) {
      filter['status'] =status
    }
   if (language) {
    filter['language'] =language
  }
      }
      
      const candiadte = await candidateModel.find(filter)  //.select({  hrId: 1,name:1, username: 1, phone: 1}).collation({ locale: "en" }).sort({ name: 1 })

      if (Object.keys(candiadte).length == 0)
      return res.status(404).send({ status: false, msg: "No Such candiadte is found" })

     return res.status(200).send({ status: true, message: 'company list', data:candiadte })

  }
  catch (err) {
      // console.log(err.message)
      res.status(500).send({ status: false, Error: err.message })
  }
}
//=========================================UPDATE Company========================================================//

const updateCandidate = async (req, res) => {
  try {
      let candidateId = req.params.candidateId
      const { 
        fname,
        lname,
        phone,
        email,
        experienceCallProcess,
        language,
        profile,
        status,
        dateOfSelection,
        dateOfjoining,
        completionOfCompanyLockIn,
        
      } = req.body;
  

      if (Object.keys(req.body).length == 0)
          return res
        .status(400)
        .send({ 
          status: false, msg: "Please Enter Details For Updating"
         })

      if (!candidateId) {
          return res
          .status(400)
          .send({ 
            status: false, msg: "candidateId must be present" 
          })
      }

      if (!mongoose.Types.ObjectId.isValid(candidateId)) {
          return res
          .status(400)
          .send({
             status: false, msg: `this  candidateId is not a valid Id` 
            })
      }
      let findcandidateId = await candidateModel.findById(candidateId)

      
      if (!findcandidateId) {
          return res
          .status(404)
          .send({ 
            status: false, msg: "no candidate found with this Company Id"
           })
      }
      if (fname) {
        if(fname.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false, msg: "Please enter a valid First name"
       })
      if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(fname)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please enter a valid First Name" });
      }
      if (lname) {
        if(lname.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false, msg: "Please enter a valid lname" 
      })
      if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(lname)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please enter a valid lname" });
      }
  
      if (phone) {
        if(phone.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false, msg: "Please enter a valid Number"
       })
      if (!/^[\s]*[6-9]\d{9}[\s]*$/.test(phone)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter valid phone Number" });
      }
      let existphone = await candidateModel.findOne({ phone: phone });
      if (existphone) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "User with this phone number is already registered.",
          });
      }
  
      if (email) {
        if(email.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false, msg: "Please enter a valid email" 
      })
      if (!/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/.test(email)) 
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter valid Email" });
      }
  
      let existEmail = await candidateModel.findOne({ email: email });
      if (existEmail) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "User with this email is already registered",
          });
      }
      if (experienceCallProcess) {
        if(experienceCallProcess.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false, msg: "Please enter a valid experienceCallProcess"
       })
  
      }
      if (language) {
        if(language.trim().length==0)
         return res
        .status(400)
        .send({ 
          status: false, msg: "Please enter a valid language" 
        })
  
      }
      if (profile) {
        if(profile.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false,
         msg: "Please enter a valid profile"
         })
        if (
          [ 
          "Experience",
          "Fresher"
          ].includes(profile)
        ) 
          return res
            .status(400)
            .send({
              status: false,
              msg: " profile must be type of ['Experience'or'Fresher']",
            });
      }
      if (status) {
        if(status.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false, msg: "Please enter a valid status"
       })
       if (
        [ 
        "Active",
        "Rejected",
        "Terminated"
        ].includes(status)
      ) 
        return res
          .status(400)
          .send({
            status: false,
            msg: " status must be type of ['Active','Rejected'or'Terminated']",
          });
      }
      if (dateOfSelection) {
        if(dateOfSelection.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false, msg: "Please enter a valid dateOfSelection" 
      })
      }
      if (dateOfjoining) {
        if(dateOfjoining.trim().length==0) 
        return res
      .status(400)
      .send({
         status: false, msg: "Please enter a valid dateOfjoining"
         })
  
      }
      if (completionOfCompanyLockIn) {
        if(completionOfCompanyLockIn.trim().length==0) 
        return res
      .status(400)
      .send({ 
        status: false, msg: "Please enter a valid completionOfCompanyLockIn" 
      })
        if (
          [ "yes",
              "no",
          ].includes(completionOfCompanyLockIn)
        ) 
          return res
            .status(400)
            .send({
              status: false,
              msg: " completionOfCompanyLockIn must be type of ['yes','no']",
            });
      }
      
      if (candidateId.isDeleted == true) {
          return res.status(404).send({ status: false, msg: "Candidate is already deleted" })
      }
 
      let updatedCompany = await candidateModel.findOneAndUpdate({ _id: candidateId }, {
          $set: {
              fname:fname,
              lname:lname,
              phone:phone,
              email:email,
              experienceCallProcess:experienceCallProcess,
              language:language,
              profile:profile,
              status:status,
              dateOfSelection:dateOfSelection,
              dateOfjoining:dateOfjoining,
              completionOfCompanyLockIn:completionOfCompanyLockIn,
          },
      }, { new: true })

      return res.status(200).send({ status: true, message: "Company", data: updatedCompany })
  }
  catch (err) {
      res.status(500).send({ status: false, msg: err.message })
  }
};


//========================================================deleteCompany===================================//
const DeleteCandidate = async function (req, res) {
  try {

      let candidateId = req.params.candidateId
      if (!mongoose.Types.ObjectId.isValid(candidateId))
          return res.status(400).send({ status: false, msg: "please enter valid candidateId" })
      const savedata = await candidateModel.findById(candidateId)
      if (savedata.isDeleted == true) {
          return res.status(404).send({ status: false, message: "candidate is already removed" })
      }

      const deleteCompany = await candidateModel.findByIdAndUpdate({ _id: candidateId }, { $set: { isDeleted: true, deletedAt: Date.now() } });
      return res.status(200).send({ status: true, message: "Candidate has been deleted successfully" })


  } catch (error) {
      res.status(500).send({ status: false, msg: error.message });

  }
}

export {createCandidate,getCandidateByquery,updateCandidate,DeleteCandidate} 
