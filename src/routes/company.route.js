import express from "express";
const comrouter = express.Router();
import {createCompany,getCompanyByquery,updateCompany,DeleteCompany} from "../controllers/company.controller.js";
// const midAuth = require ("../middleware/auth")

comrouter.post("/api/company", createCompany);

comrouter.get("/api/getCompany",getCompanyByquery);

comrouter.put("/api/updateCompany/:companyId",updateCompany);

comrouter.delete("/api/deletecompany/:companyId",DeleteCompany)

export default comrouter;
