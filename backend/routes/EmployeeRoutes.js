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
  saveJobs,
  removeSavedJobs,
  deleteMessage,
  withdrawBalance,
  getMyWithdrawals,
} from "../controllers/employeeControllers.js";
import {
  protect,
  isOwner,
  isEmployee,
  isAdmin,
} from "../middlewares/authMiddleware.js";

router.route("/profile/:id").get(employeeProfile);
router.route("/education/:userId").post(protect, isOwner, postEducations);
router
  .route("/education/:userId/:id")
  .delete(protect, isOwner, deleteEducation);
router
  .route("/editProfile/:userId")
  .post(protect, isOwner, addLanguageAndSkill);
router
  .route("/editProfile/:userId")
  .delete(protect, isOwner, deleteLanguageOrSkill);
router.route("/editInfo/:userId").patch(protect, isOwner, editInfo);
router.route("/profileImg/:userId").patch(protect, isOwner, addProfileImage);
router.route("/kyc/:userId").post(protect, isOwner, addKyc);

router.route("/addBank/:userId").post(protect, isEmployee, addBankDetails);
router.route("/addPortfolio/:userId").post(protect, isEmployee, addPortfolio);
router
  .route("/deletePortfolio/:userId/:id")
  .delete(protect, isEmployee, deletePortFolio);

router
  .route("/saveJobs/:userId/:id")
  .get(protect, isOwner, isEmployee, saveJobs);
router
  .route("/saveJobs/:userId/:id")
  .delete(protect, isOwner, isEmployee, removeSavedJobs);

router
  .route("/deleteMessage/:userId/:id")
  .delete(protect, isOwner, isEmployee, deleteMessage);

router.route("/withdraw/:userId").post(withdrawBalance);

router.route("/withdrawHistory/:userId").get(getMyWithdrawals);

export default router;
