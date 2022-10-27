import e, { json, Router } from "express";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/jsonwebtoken.js";
import Employee from "../models/employeeModal.js";
import User from "../models/userModal.js";
import BankDetails from "../models/bankDetailsModel.js";
import Kyc from "../models/kycModel.js";
import Admin from "../models/adminModel.js";
import Employer from "../models/employerModel.js";
import Jobs from "../models/jobsModal.js";
import Notification from "../models/messageModal.js";
import { mailTransport, sendMail } from "../utils/mail.js";
import Withdraw from "../models/withdrawModel.js";
import Purchase from "../models/purchaseModal.js";
import { AdminRoom } from "../sockets/models/roomOwner.js";

// @DESC gets the profile of the admin
// @METHOD get
// @PATH /admin/profile

export const adminProfile = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById("635a47d079cfa5259456107a")
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

    let employee = 0;
    let employer = 0;
    const jobs = await Jobs.find();

    const users = await User.find({});

    users.map((el) => {
      if (el.userType === "employer" && el.emailVerified) {
        employer++;
      } else if (el.userType === "employee" && el.emailVerified) {
        employee++;
      }
    });
    if (user) {
      res.status(200).json({
        adminData: user,
        emplyeeLength: employee,
        emplyerLength: employer,
        jobsLength: jobs.length,
      });
    }
  } catch (error) {
    res.status(403);
    throw new Error(error);
  }
});

// @DESC gets the profile of all the employees for the admin
// @METHOD get
// @PATH /admin/allEmployees
// @ QUERY keword(name of the user)

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
      emailVerified: true,
    }).populate("employeeData");
    res.status(200).json(allEmployees);
  } catch (error) {
    res.status(403);
    throw new Error(error);
  }
});

// @DESC gets the profile of all the employers for the admin
// @METHOD get
// @PATH /admin/allEmployers
// @ QUERY keword(name of the user)

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
    const allEmployers = await User.find({
      ...keyword,
      userType: "employer",
      emailVerified: true,
    }).populate("employerData");

    res.status(200).json(allEmployers);
  } catch (error) {
    res.status(403);
    throw new Error(error);
  }
});

// @DESC gets the profile of all the blocked users for the admin
// @METHOD get
// @PATH /admin/blockedUsers
// @ QUERY keword(name of the user)

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
      res.status(201).json(blockedUsers);
    } else {
      res.status(200).json({
        messaged: "no blocked users",
      });
    }
  } catch (error) {
    res.status(403);
    throw new Error(error);
  }
});

// @DESC admin can block the user.
// @METHOD patch
// @PATH /admin/block/:_id
// @PARAMS ID(id of the user)

export const blockUsers = AsyncHandler(async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (user.userType === "employee") {
      const employee = await Employee.findOne({ owner: _id });

      const noti = new Notification({
        owner: employee._id,
        message:
          "Your account have been blocked, please contact the admin to know more",
      });
      employee.notification.push(noti._id);
      await noti.save();
      await employee.save();
    } else if (user.userType === "employer") {
      const employer = await Employer.findOne({ owner: _id });
      const noti = new Notification({
        owner: employer._id,
        message: "Your accounts blocked, please contact the admin to know more",
      });
      employer.notification.push(noti._id);
      await noti.save();
      await employer.save();
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    sendMail({
      to: user.email,
      from: "adm.getworker@gmail.com",
      subject: "GETWORK UPDATE",
      html: `    
  <div>
  <h1>User Update</h1>
      <p>Your accounts blocked, please contact the admin to know more</p>
  </div>
</html>`,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(403);
    throw new Error(error);
  }
});

// @DESC Admin can blacklist user for blocking later
// @METHOD put
// @PATH /admin/blacklist
// @BODY id(id of the blacklisted user)

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
      res.status(201).json(adminData);
    } else {
      res.status(403).json("");
    }
  } catch (error) {
    res.status(403);
    throw new Error(error);
  }
});

// @DESC Admin can remove the blacklisted users from the list
// @METHOD put
// @PATH /admin/removeBlacklist
// @BODY id(id of the blacklisted user)

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

    res.status(201).json(adminData);
  } catch (error) {
    res.status(403);
    throw new Error(error);
  }
});

// @DESC gets all the kyc created by the employees
// @METHOD get
// @PATH /admin/allKyc

export const getAllKyc = AsyncHandler(async (req, res) => {
  try {
    const kycData = await Kyc.find({}).populate("owner");

    res.status(200).json(kycData);
  } catch (error) {
    res.status(403);
    throw new Error(error);
  }
});

// @DESC Admin can accept or reject kyc based on some contitions
// @METHOD post
// @PATH /admin/acceptKyc
// @BODY id(id of the kyc)  ,msg(reason for rejecting), status(status of the kyc(rejected,accepted))

export const acceptNrejectKyc = AsyncHandler(async (req, res) => {
  try {
    const { id, status, msg } = req.body;

    const kycDetail = await Kyc.findOne({ owner: id });
    const userDetail = await Employee.findOne({ owner: id }).populate("owner");

    if (status === "accept") {
      if (kycDetail && userDetail) {
        const noti = new Notification({
          owner: id,
          message: "Your kyc have been accepted",
        });

        kycDetail.kycStatus = "accepted";
        userDetail.kycApproved = "accepted";
        userDetail.notification.push(noti._id);

        await kycDetail.save();
        await noti.save();
        await userDetail.save();

        sendMail({
          to: userDetail.owner.email,
          from: "adm.getworker@gmail.com",
          subject: "GETWORK KYC UPDATE",
          html: `    
  <div>
  <h1>Kyc Status</h1>
          <p>Your kyc have been Accepted</p>
  </div>
</html>`,
        });
        
      }
    } else if (status === "reject") {
      if (kycDetail && userDetail) {
        const noti = new Notification({
          owner: id,
          message: "Your kyc have been Rejected :- " + msg,
        });

        kycDetail.kycStatus = "rejected";
        userDetail.kycApproved = "rejected";
        userDetail.notification.push(noti._id);

        await kycDetail.save();
        await userDetail.save();
        await noti.save();

        sendMail({
          to: userDetail.owner.email,
          from: "adm.getworker@gmail.com",
          subject: "GETWORK KYC UPDATE",
          html: `    
  <div>
  <h1>Kyc Status</h1>
          <p>Your kyc have been Rejected</p>
  </div>
</html>`,
        });

      }
    }

    res.status(200).json({
      kyc: kycDetail,
      user: userDetail,
    });
  } catch (error) {
    res.status(403);
  }
});

export const getAllWithdraw = AsyncHandler(async (req, res) => {
  try {
    const withdraw = await Withdraw.find().populate("owner");

    res.json(withdraw);
  } catch (error) {
    throw new Error(error);
  }
});

export const doWithdrawel = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const withdraw = await Withdraw.findById(id);

  if (withdraw) {
    withdraw.status = "finished";

    await withdraw.save();
    res.json(withdraw);
  } else {
    throw new Error("Not found");
  }
});

export const purchaseHistory = AsyncHandler(async (req, res) => {
  try {
    const pageSize = 2;
    const page = Number(req.query.pageSize) || 1;

    const history = await Purchase.find({});

    const allData = [];
    history.forEach((el) => {
      el.details.map((dt) => {
        allData.push(dt);
      });
    });

    res.status(200).json(allData.reverse());
  } catch (error) {
    throw new Error(error);
  }
});

export const myHelpChats = AsyncHandler(async (req, res) => {
  try {
    const rooms = await AdminRoom.find().populate("user");
    res.json(rooms);
  } catch (error) {
    throw new Error(error);
  }
});
