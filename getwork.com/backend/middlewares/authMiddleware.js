import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      // console.log(req.user + 2334443);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token fail");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Autherized");
  }
});



export const isOwner = asyncHandler(async (req, res, next) => {
  
  // console.log(req.user);
  if (req.user._id + "1" !== req.params.userId + "1") {
    // console.log(req.user._id);
    // console.log(req.params.userId);
    // console.log(req.user);
    console.log("not owner");
    throw new Error("Only the owner of this account can edit this");
  } else {
    next();
  }
});


export const isEmployee = asyncHandler(async (req, res, next) => {
  if (req.user.userType !== "employee") {
    console.log("You are not an employee");
    throw new Error("You are not an employee");
  } else {
    next();
  }
})

export const isEmployer = asyncHandler(async (req, res, next) => {
  if (req.user.userType !== "employer") {
    console.log("You are not an employer");
    throw new Error("You are not an employer");
  } else {
    next();
  }
})


export const isAdmin = asyncHandler(async (req, res, next) => {


  if (req.user.userType !== "admin") {
    console.log("You are not an Admin");
    throw new Error("You are not an Admin");
  } else {
    next();
  }
})