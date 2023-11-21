import mongoose from "mongoose";
const HrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
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

    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type:Boolean, 
      default: false
    },
    deletedAt: {
      type:Date
    }, 

  },
  { timestamps: true }
);

const hrModel = mongoose.model("Hr", HrSchema);
export default hrModel;
