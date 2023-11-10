import express from "express";
const hrrouter = express.Router();
import { createHr } from "../controllers/hrController.js";
// const midAuth = require ("../middleware/auth")

hrrouter.post("/api/hr", createHr);

//  Login Api ------------------------------------------------
// router.post('/hr',hrController.createHr)

export default hrrouter;
