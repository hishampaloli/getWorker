import express from "express";
import { editEmployerProfile, getEmployerProfile } from "../controllers/employerControllers.js";
const router = express.Router();  

import { isOwner, protect } from "../middlewares/authMiddleware.js";


router.route("/profile/:userId").get(getEmployerProfile);
router.route("/profile/:userId").patch(protect, isOwner, editEmployerProfile);

export default router