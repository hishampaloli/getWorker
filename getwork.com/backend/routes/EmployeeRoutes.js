import express from "express";
const router = express.Router();
import AsyncHandler from "express-async-handler";
import {
  employeeProfile,
  postEducations,
  deleteEducation,
  addLanguageAndSkill,
  deleteLanguageOrSkill
} from "../controllers/employeeControllers.js";
import { protect, isOwner } from "../middlewares/authMiddleware.js";

router.route("/profile/:id").get(employeeProfile);
router.route("/education/:userId").post(protect, isOwner, postEducations);

router.route("/education/:userId/:id").delete(protect, isOwner, deleteEducation);
router.route("/editProfile/:userId").post(addLanguageAndSkill);
router.route("/editProfile/:userId").delete(deleteLanguageOrSkill);

export default router;
