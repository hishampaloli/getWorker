import { json, Router } from "express";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/jsonwebtoken.js";
import Employee from "../models/employeeModal.js";
import User from "../models/userModal.js";
import BankDetails from "../models/bankDetailsModel.js";
import Kyc from "../models/kycModel.js";
import Admin from "../models/adminModel.js";
import Employer from "../models/employerModel.js";

// @DESC gets the profile of the admin
// @METHOD get
// @PATH /admin/profile

export const adminProfile = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById("633beb1b9678e114623121bc")
      .populate("adminData")
      .populate({
        path: "adminData",
        populate: [
          {
            path: "blacklistedUsers",
            select: " -_id",
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
    res.json(error)
  }
});


// @DESC gets the profile of all the employees for the admin
// @METHOD get
// @PATH /admin/allEmployees

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


// @DESC gets the profile of all the employers for the admin
// @METHOD get
// @PATH /admin/allEmployers

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


// @DESC gets the profile of all the blocked users for the admin
// @METHOD get
// @PATH /admin/blockedUsers

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

// @DESC admin can block the user.
// @METHOD patch
// @PATH /admin/block/:_id

export const blockUsers = AsyncHandler(async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);


    user.isBlocked = !user.isBlocked;

    await user.save();

    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// @DESC Admin can blacklist user for blocking later
// @METHOD put
// @PATH /admin/blacklist

export const blacklistUsers = AsyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    const adminData = await Admin.findOne({
      owner: "633beb1b9678e114623121bc",
    }).populate("blacklistedUsers");

    let a = 0;

    adminData.blacklistedUsers.forEach((el) => {
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


// @DESC Admin can remove the blacklisted users from the list
// @METHOD put
// @PATH /admin/removeBlacklist

export const removeBlacklist = AsyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    const adminData = await Admin.findOne({
      owner: "633beb1b9678e114623121bc",
    }).populate("blacklistedUsers");

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


// @DESC gets all the kyc created by the employees
// @METHOD get
// @PATH /admin/allKyc

export const getAllKyc = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const kycData = await Kyc.find({ }).populate("owner");

    res.json(kycData);
  } catch (error) {
    res.json(error);
  }
});

// @DESC Admin can accept or reject kyc based on some contitions
// @METHOD post
// @PATH /admin/acceptKyc

export const acceptNrejectKyc = AsyncHandler(async (req, res) => {
  try {
    const { id, status } = req.body;

    const kycDetail = await Kyc.findOne({ owner: id });
    const userDetail = await Employee.findOne({ owner: id });

    if (status === 'accept') {
      if (kycDetail && userDetail) {
        kycDetail.kycStatus = 'accepted'
        userDetail.kycApproved = 'accepted';

        await kycDetail.save();
        await userDetail.save();
      }
    }else if(status === 'reject') {
      if (kycDetail && userDetail) {
        kycDetail.kycStatus = 'rejected'
        userDetail.kycApproved = 'rejected';

        await kycDetail.save();
        await userDetail.save();
      }
    }


    res.json({
      kyc: kycDetail,
      user: userDetail,
    });

  } catch (error) {
    res.json(error)
  }
});
