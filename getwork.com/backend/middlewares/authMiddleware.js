import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

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
  if (req.user._id + "1" !== req.params.userId + "1") {
    console.log("not owner");
    throw new Error("Only the owner of this account can edit this");
  } else {
    next();
  }
});
