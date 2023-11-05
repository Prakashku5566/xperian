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
    // img: {
    //   type: String,
    // },
    phone: {
      type: String,
      required: true,
    },
  
    password: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

const hrModel =  mongoose.model("Hr", HrSchema);
export default hrModel