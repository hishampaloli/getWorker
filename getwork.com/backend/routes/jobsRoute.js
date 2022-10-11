import express from "express";
import {
  jobView,
  myJobs,
  postJobs,
  getAllJobs,
  endJob,
} from "../controllers/jobController.js";
import { isEmployer, isOwner, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/postJob/:userId").post(protect, isEmployer, postJobs);
router.route("/mypost/:userId").get(protect, isEmployer, myJobs);
router.route("/jobs/:id").get(protect, jobView);
router.route("/getAllJobs").get(protect, getAllJobs);
router.route("/jobsStatus/:userId/:id").get(endJob);

export default router;
