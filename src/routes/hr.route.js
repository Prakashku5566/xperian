import express from 'express';
 const hrRouter = express.Router();
const hrController = require("../controllers/hr.controller")
// const midAuth = require ("../middleware/auth")

hrRouter.post('/',hrController.createHr )

//  Login Api ------------------------------------------------
// router.post('/hr',hrController.createHr)


export default hrRouter;