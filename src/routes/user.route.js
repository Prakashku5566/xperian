import express from "express";
const router = express.Router();
const userController = require("../controllers/user.controller");
// const companyController = require("../controllers/company.controller")
// const midAuth = require ("../middleware/auth")

router.post("/api/admin", userController.createUser);

//  Login Api ------------------------------------------------
router.post("/api/login", userController.createUser);

module.exports = router;
