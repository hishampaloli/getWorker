import { json } from "express";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/jsonwebtoken.js";
import Employee from "../models/employeeModal.js";
import User from "../models/userModal.js";
import BankDetails from "../models/bankDetailsModel.js";
import Kyc from "../models/kycModel.js";
import Admin from "../models/adminModel.js";
import Employer from "../models/employerModel.js";

export const adminProfile = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById("633beb1b9678e114623121bc")
      .populate("adminData")
      .populate({
        path: "adminData",
        populate: [
          {
            path: "blacklistedUsers",
            select: "name image -_id",
          },
        ],
      });

    const employee = await Employee.find({});
    const employer = await Employer.find({});

    if (user) {
      res.json({
        adminData: user,
        emplyeeLength: employee.length,
        emplyerLength: employer.length,
        jobsLength: 23,
      });
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});

export const findAllEmployees = AsyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  try {
    const allEmployees = await User.find({
      ...keyword,
      userType: "employee",
    }).populate("employeeData");
    res.json(allEmployees);
  } catch (error) {
    res.json(error);
  }
});

export const findAllEmployers = AsyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  try {
    const allEmployees = await User.find({
      ...keyword,
      userType: "employer",
    }).populate("employerData");
    res.json(allEmployees);
  } catch (error) {
    res.json(error);
  }
});

export const getAllBlockedUsers = AsyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  try {
    const blockedUsers = await User.find({ ...keyword, isBlocked: true })
      .populate("adminData")
      .populate("employerData")
      .populate("employeeData");
    if (blockedUsers) {
      res.json(blockedUsers);
    } else {
      res.json({
        messaged: "no blocked users",
      });
    }
  } catch (error) {
    res.json(error);
  }
});

export const blockUsers = AsyncHandler(async (req, res) => {
  const { _id } = req.params;

  console.log(_id + 34);
  try {
    const user = await User.findById(_id);

    // console.log(user);

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

export const blacklistUsers = AsyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    const adminData = await Admin.findOne({
      owner: "633beb1b9678e114623121bc",
    });

    console.log(adminData.blacklistedUsers);

    let a = 0;

    adminData.blacklistedUsers.forEach((el) => {
      console.log(el + "2");
      if (el + "*" === id + "*") {
        a = 2;
      }
    });

    if (a == 0) {
      adminData.blacklistedUsers.push(id);
      await adminData.save();
      res.json(adminData);
    } else {
      res.json("");
    }
  } catch (error) {
    res.json(error);
  }
});

export const removeBlacklist = AsyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    const adminData = await Admin.findOne({
      owner: "633beb1b9678e114623121bc",
    });
    console.log(id);

    const arr = adminData.blacklistedUsers.filter((el) => {
      return el + "." !== id + ".";
    });

    adminData.blacklistedUsers = arr;
    await adminData.save();

    res.json(adminData);
  } catch (error) {
    res.json(error);
  }
});
