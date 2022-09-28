import express from "express";
const router = express.Router();
import AsyncHandler from "express-async-handler";
import {employeeProfile} from '../controllers/employeeControllers.js'


router.route("/profile/:id").get(employeeProfile);



export default router;
