import express from "express";
const router = express.Router();
import AsyncHandler from "express-async-handler";
import {
  employeeProfile,
  postEducations,
  deleteEducation,
  addLanguageAndSkill,
  deleteLanguageOrSkill,
  editInfo,
  addProfileImage,
  addKyc,
  addBankDetails,
  addPortfolio,
  deletePortFolio,
} from "../controllers/employeeControllers.js";
import { protect, isOwner, isEmployee } from "../middlewares/authMiddleware.js";

router.route("/profile/:id").get(employeeProfile);
router.route("/education/:userId").post(protect, isOwner, postEducations);
router.route("/education/:userId/:id").delete(protect, isOwner, deleteEducation);
router.route("/editProfile/:userId").post(protect, isOwner, addLanguageAndSkill);
router.route("/editProfile/:userId").delete(protect, isOwner, deleteLanguageOrSkill);
router.route("/editInfo/:userId").patch(protect, isOwner, editInfo);
router.route("/profileImg/:userId").patch(protect, isOwner, addProfileImage);
router.route("/kyc/:userId").post(protect, isOwner, addKyc);

router.route("/addBank/:userId").post(protect, isEmployee, addBankDetails);
router.route("/addPortfolio/:userId").post(protect, isEmployee, addPortfolio);
router.route("/deletePortfolio/:userId/:id").delete(protect, isEmployee, deletePortFolio);

export default router;
