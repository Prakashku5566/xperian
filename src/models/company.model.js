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
        enum: ["Meta/Enlish", "PPC/English","Meta/Spanish","PPC/Spanish", "bilingual"],
        required: true,
    },
    siftTiming: {
        type: String,
        required: true,
      },
    workingDays: {
        type: String,
        required: true,
    },
    weeklyOff: {
        type: String,
        required: true,
    },
    cab: {
        type: String,
        required: true,
    },
    meals: {
        type: String,
        required: true,
    },
    interviewProcess: {
        type: String,
        required: true,
    },
    interviewTiming: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);