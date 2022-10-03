import express from "express";
import { editEmployerProfile, getAllEmplyees, getEmployerProfile } from "../controllers/employerControllers.js";
const router = express.Router();  

import { isOwner, protect } from "../middlewares/authMiddleware.js";


router.route("/profile/:userId").get(getEmployerProfile);
router.route("/profile/:userId").patch(protect, isOwner, editEmployerProfile);

router.route("/allEmployees").get(protect, getAllEmplyees);

export default router