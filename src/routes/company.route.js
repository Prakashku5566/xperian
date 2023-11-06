import express from "express";
const router = express.Router();
const companyController = require("../controllers/company.controller");
// const midAuth = require ("../middleware/auth")

router.post("/api/company", companyController.createCompany);

module.exports = router;
