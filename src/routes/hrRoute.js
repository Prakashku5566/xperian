import express from "express";
const hrrouter = express.Router();
import { createHr,login,getHrByquery,updateHr ,DeleteHr} from "../controllers/hrController.js";
// const midAuth = require ("../middleware/auth")

hrrouter.post("/api/hr", createHr);
//  Login Api ------------------------------------------------
hrrouter.post("/api/loginhr", login);

hrrouter.get("/api/getHr",getHrByquery);

hrrouter.put("/api/updateHr/:hrId",updateHr);

hrrouter.delete("/api/deleteHr/:hrId",DeleteHr)

export default hrrouter;
