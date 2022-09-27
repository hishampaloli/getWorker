import express from "express";
const router = express.Router();
import AsyncHandler from "express-async-handler";
import {userRegisterRegister,verifyEmail, userLogin} from '../controllers/userController.js'


router.route("/register").post(userRegisterRegister);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(userLogin);



export default router;
