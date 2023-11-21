import express from "express";
const adminrouter = express.Router();
import {createUser,login} from "../controllers/user.controller.js";

// const companyController = require("../controllers/company.controller")
// const midAuth = require ("../middleware/auth")

adminrouter.post("/api/admin", createUser);

//  Login Api ------------------------------------------------
adminrouter.post("/api/login", login);


export default adminrouter;
// export default login;

// export default login;