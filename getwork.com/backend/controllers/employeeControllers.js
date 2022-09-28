import { json } from "express";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/jsonwebtoken.js";
import Employee from "../models/employeeModal.js";
import User from "../models/userModal.js";

export const employeeProfile = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const userData = await Employee.findOne({ owner: id });

  if (userData) {
    res.json(userData);
  } else {
    res.status(404);
    throw new Error("No such profile found");
  }
});
