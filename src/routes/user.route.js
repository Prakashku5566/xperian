import express from "express";
const userrouter = express.Router();
import {createUser,login} from "../controllers/user.controller.js";

// const companyController = require("../controllers/company.controller")
// const midAuth = require ("../middleware/auth")

userrouter.post("/api/admin", createUser);

//  Login Api ------------------------------------------------
// userrouter.post("/api/login", login);


export default {userrouter};
// export default login;