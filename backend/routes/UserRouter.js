import express from "express";
const router = express.Router();
import AsyncHandler from "express-async-handler";
import { isOwner, protect } from "../middlewares/authMiddleware.js";
import {
  userRegisterRegister,
  verifyEmail,
  userLogin,
  changePassword,
  forgotPassword,
  forgotPasswordVerify,
} from "../controllers/userController.js";

router.route("/register").post(userRegisterRegister);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(userLogin);
router.route("/resetPassword/:userId").patch(protect, isOwner, changePassword);

router.route("/forgotPassword").patch(forgotPassword);
router.route("/forgotPasswordVerify").patch(forgotPasswordVerify);
export default router;
