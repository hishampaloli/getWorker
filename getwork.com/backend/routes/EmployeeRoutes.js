import express from "express";
const router = express.Router();
import AsyncHandler from "express-async-handler";
import {
  employeeProfile,
  postEducations,
  deleteEducation,
} from "../controllers/employeeControllers.js";
import { protect, isOwner } from "../middlewares/authMiddleware.js";

router.route("/profile/:id").get(employeeProfile);
router.route("/education/:userId").post(protect, isOwner, postEducations);

router.route("/education/:userId/:id").delete(protect, isOwner, deleteEducation);

export default router;
