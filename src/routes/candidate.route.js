import  express  from "express";
const candidateRouter = express.Router();
import {createCandidate} from "../controllers/candidate.controller.js";


candidateRouter.post("/api/candidate",createCandidate)

export default candidateRouter;