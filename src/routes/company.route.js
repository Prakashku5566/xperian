import express from "express";
const comrouter = express.Router();
import {createCompany} from "../controllers/company.controller.js";
// const midAuth = require ("../middleware/auth")

comrouter.post("/api/company", createCompany);

export default comrouter;
