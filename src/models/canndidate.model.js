import mongoose from "mongoose";
const CandidateSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      unique: true,
    },
    lname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    experienceCallProcess: {
      type: String,
      required: true,
      unique: true,
    },
    language: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      enum: ["Experience", "Fresher"],
      required: true,
    },
    // ADD Enum in status Like Terminated,Active,Rejected etc
    status: {
      type: String,
      required: true,
    },
    dateOfAdd: {
      type: Date,
      required: true,
    },
    dateOfSelection: {
      type: Date,
      required: true,
    },
    dateOfjoining: {
      type: Date,
      required: true,
    },
    completionOfCompanyLockIn: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", CandidateSchema);
