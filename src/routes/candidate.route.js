import  express  from "express";
const candidateRouter = express.Router();
import {createCandidate,getCandidateByquery,updateCandidate,DeleteCandidate} from "../controllers/candidate.controller.js";


candidateRouter.post("/api/candidate",createCandidate)

candidateRouter.get("/api/getcandidate",getCandidateByquery);

candidateRouter.put("/api/updatecandidate/:candidateId",updateCandidate);

candidateRouter.delete("/api/deletecandidate/:candidateId",DeleteCandidate)

export default candidateRouter;