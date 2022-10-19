import express from "express";
const router = express.Router();
import AsyncHandler from "express-async-handler";
import {
  adminProfile,
  findAllEmployees,
  findAllEmployers,
  getAllBlockedUsers,
  blacklistUsers,
  removeBlacklist,
  blockUsers,
  getAllKyc,
  acceptNrejectKyc
} from "../controllers/adminController.js";
import { changePassword } from "../controllers/userController.js";
import { protect, isOwner, isAdmin } from "../middlewares/authMiddleware.js";

router.route("/profile").get(protect, isAdmin, adminProfile);
router.route("/changePassword/:userId").post(protect, isOwner, changePassword);
router.route("/allEmployees").get(protect, isAdmin, findAllEmployees);
router.route("/allEmployers").get(protect, isAdmin, findAllEmployers);
router.route("/blockedUsers").get(protect, isAdmin, getAllBlockedUsers);
router.route("/block/:_id").patch(blockUsers );
router.route("/blacklist").put(protect, isAdmin, blacklistUsers);
router.route("/removeBlacklist").put(protect, isAdmin, removeBlacklist)


router.route("/allKyc").get(protect, isAdmin, getAllKyc)
router.route("/acceptKyc").post(protect, isAdmin, acceptNrejectKyc);



export default router;
