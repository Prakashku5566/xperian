import express from 'express';
 const router = express.Router();
import { createHr } from '../controllers/hrController.js';
// const midAuth = require ("../middleware/auth")

router.post('/',createHr )

//  Login Api ------------------------------------------------
// router.post('/hr',hrController.createHr)


export default router