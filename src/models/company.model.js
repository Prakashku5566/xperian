import mongoose from "mongoose";
const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hrName: {
      type: String,
      required: true,
    },
    hrNumber: {
      type: String,
      required: true,
    },

    HiringRequierments: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    callProcess: {
      type: String,
      enum:[ 
        "Meta/English",
        "PPC/English",
        "Meta/Spanish",
        "PPC/Spanish",
        "bilingual",
      ],
      required: true,
    },
    // shiftTiming: {
    //   type: String,
    //   required: true,
    // },
    workingDays: {
      type: String,
      required: true,
    },
    // TODO :ADD Boolean here
    weeklyOff: {
      type: String,
      required: true,
    },
  
    cab: {
      type: String,
      enum: [
       "yes",
       "no",
       "included",
       "depends on route"
      ],
      required: true,
    },
  
    meals: {
      type: String,
      enum: [
       "yes",
       "no",
       "included"
      ],
      required: true,
    },
    
    interviewProcess: {
      type: String,
      enum: [
       "face to face",
       "telephonic"
      ],
      required: true,
    },
    interviewTiming: {
      type:String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
