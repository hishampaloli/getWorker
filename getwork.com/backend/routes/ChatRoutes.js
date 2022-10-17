import express from "express";
import { getMyChats } from "../controllers/chatController.js";
import { isEmployer, isOwner, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/myChats/:userId").get(getMyChats);

export default router;
