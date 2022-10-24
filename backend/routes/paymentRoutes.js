import express from "express";
import {
  checkout,
  paymentVerification,
  getkey,
  myParchaseHistory,
  payPalVerification,
} from "../controllers/paymentController.js";
import { isEmployer, isOwner, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/paymentVerification").post(paymentVerification);
router.route("/paypalVerification").post(payPalVerification);
router.route("/getkey").get(getkey);
router.route("/history/:userId").get(protect,isOwner, myParchaseHistory);

export default router;
