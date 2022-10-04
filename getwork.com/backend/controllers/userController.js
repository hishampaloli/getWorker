import { json } from "express";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/jsonwebtoken.js";
import Employee from "../models/employeeModal.js";
import Employer from "../models/employerModel.js";
import User from "../models/userModal.js";
import Admin from "../models/adminModel.js";
import VerificationToken from "../models/UserVerification.js";
import { generateOtp } from "../utils/getOtp.js";
import { mailTransport } from "../utils/mail.js";
import { isValidObjectId } from "mongoose";

export const userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (user.userType === "employee") {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        employeeData: user.employeeData,
        token: generateToken(user._id),
      });
    } else if (user.userType === "employer") {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        employerData: user.employerData,
        token: generateToken(user._id),
      });
    } else if (user.userType === "admin") {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        adminData: user.employerData,
        token: generateToken(user._id),
      });
    } 
  } else {
    res.status(404);
    throw new Error("Email or Password incorrect.");
  }
});

export const userRegisterRegister = AsyncHandler(async (req, res) => {
  const { name, email, password, userType } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (user.emailVerified === false) {
      user.name = name;
      user.password = password;
      user.userType = userType;

      const token = await VerificationToken.findOneAndDelete({
        owner: user._id,
      });

      const OTP = generateOtp();

      console.log(user._id + ">>>>>>>>>>>>>>>>>");
      const verificationToken = new VerificationToken({
        owner: user._id,
        token: OTP,
      });

      await verificationToken.save();
      await user.save();

      mailTransport().sendMail({
        from: "getworkverification@email.com",
        to: user.email,
        subject: "Verify your email account",
        html: `<h1>${OTP}</h1>`,
      });
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Email already in use !");
    }
  } else {
    const newUser = new User({
      name,
      email,
      password,
      userType,
    });

    const OTP = generateOtp();
    console.log(OTP);
    const verificationToken = new VerificationToken({
      owner: newUser._id,
      token: OTP,
    });
    console.log(verificationToken);

    await verificationToken.save();
    await newUser.save();

    mailTransport().sendMail({
      from: "getworkverification@email.com",
      to: newUser.email,
      subject: "Verify your email account",
      html: `<h1>${OTP}</h1>`,
    });
    res.json(newUser);
  }
});

export const verifyEmail = AsyncHandler(async (req, res, next) => {
  const { userId, otp, userType } = req.body;
  console.log(userId, userType);

  if (!userId || !otp.trim()) {
    throw new Error("Invalid request, missing paramaters");
  }

  if (!isValidObjectId(userId)) {
    throw new Error("Invalid userId");
  } else {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("This account is verified");
    }

    if (user.emailVerified) {
      throw new Error("This account is verified");
    }
    const token = await VerificationToken.findOne({ owner: userId });
    if (!token) {
      throw new Error("No tokon");
    } else {
      console.log("ds");
    }
    console.log(user.userType);
    const isMatch = await token.matchPassword(otp);
    if (!isMatch) {
      throw new Error("Invalid otp");
      console.log(isMatch);
    } else {
      user.emailVerified = true;
      await VerificationToken.findOne({ owner: userId });

      if (user.userType === "employee") {
        const userData = new Employee({
          owner: user._id,
        });

        user.employeeData = userData._id;
        await userData.save();
        await user.save();

        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          employeeData: user.employeeData,
          emailVerified: user.emailVerified,
          token: generateToken(user._id),
        });
      }

      if (user.userType === "employer") {
        const userData = new Employer({
          owner: user._id,
        });

        user.employerData = userData._id;
        await userData.save();

        await user.save();

        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          userType: user.userType,
          employerData: user.employerData,
          token: generateToken(user._id),
        });
      }
    }
  }
});


export const changePassword = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { oldPass, newPass } = req.body;

  try {
    const user = await User.findById(userId);

    if (user && (await user.matchPassword(oldPass))) {
      user.password = newPass;
      await user.save();
      res.json(user);
    } else {
      res.json("Incorrect Old Password!");
    }
  } catch (error) {
    res.json(error);
  }
});

