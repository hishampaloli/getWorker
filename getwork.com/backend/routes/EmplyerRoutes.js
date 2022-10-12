import express from "express";
import {
  deleteMessageEmployer,
  editEmployerProfile,
  getAllEmplyees,
  getEmployerProfile,
  getEmployerProfileData,
  removeSavedTalent,
  saveJobs,
} from "../controllers/employerControllers.js";
const router = express.Router();

import { isEmployer, isOwner, protect } from "../middlewares/authMiddleware.js";

router.route("/profile/:userId").get(protect, getEmployerProfile);
router.route("/profile/:userId/:id").get(protect, getEmployerProfileData);
router.route("/profile/:userId").patch(protect, isOwner, editEmployerProfile);

router.route("/allEmployees").get(protect, getAllEmplyees);
router.route("/saveTalents/:userId").put(protect, isOwner, saveJobs);
router.route("/saveTalents/:userId").patch(protect, isOwner, removeSavedTalent);
router.route("/deleteMessage/:userId/:id").delete(protect, isOwner, isEmployer,deleteMessageEmployer);



export default router;
