import { json } from "express";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/jsonwebtoken.js";
import Employee from "../models/employeeModal.js";
import User from "../models/userModal.js";
import Education from "../models/educations.js";
import cloudinary from "cloudinary";
import BankDetails from "../models/bankDetailsModel.js";
import Kyc from "../models/kycModel.js";
import Portfolio from "../models/portfolioModel.js";
import Notification from "../models/messageModal.js";
import Withdraw from "../models/withdrawModel.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// @DESC Gets all the details of the employee
// @METHOD get
// @PATH /employee/profile/:id

export const employeeProfile = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await Employee.findOne({ owner: id })
      .populate("educations")
      .populate("portfolios")
      .populate("owner")
      .populate("activeContracts")
      .populate("notification")
      .populate("savedJobs")
      .populate("completedJobs");

    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404);
      throw new Error("No such profile found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can add there education
// @METHOD post
// @PATH /employee/education/:userId

export const postEducations = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { education } = req.body;

  try {
    const userData = await Employee.findOne({ owner: userId });

    if (education) {
      const educationData = new Education({
        owner: userId,
        school: education.school,
        title: education.title,
        period: education.period,
      });

      await educationData.save();

      userData.educations.push(educationData._id);
      await userData.save();
      res.status(200).json(educationData);
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can delete there education
// @METHOD delete
// @PATH /employee/education/:userId/:id

export const deleteEducation = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;

  try {
    const user = await Employee.findOneAndUpdate(
      { owner: userId },
      { $pull: { educations: id } }
    );

    const deletedData = await Education.findByIdAndDelete(id);
    res.status(201).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can add language or skill there education
// @METHOD post
// @PATH /employee/editProfile/:userId

export const addLanguageAndSkill = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { skill, language } = req.body;

  try {
    const userData = await Employee.findOne({ owner: userId });

    if (skill) {
      userData.skills.push({ skill });
      await userData.save();
    }

    if (language) {
      userData.languages.push({ language: language });
      await userData.save();
    }
    res.status(201).json(userData);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can edit there education
// @METHOD patch
// @PATH /employee/editInfo/:userId

export const editInfo = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { title, info } = req.body;

  try {
    if (title) {
      const userInfo = await Employee.findOneAndUpdate(
        { owner: userId },
        { userTitle: title }
      );
    }

    if (info) {
      const userInfo = await Employee.findOneAndUpdate(
        { owner: userId },
        { userInfo: info }
      );
    }

    res.status(201).json({
      message: "Successfully updated",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can delete language or skill there education
// @METHOD delete
// @PATH /employee/editProfile/:userId/:id

export const deleteLanguageOrSkill = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { skill, language } = req.query;

  try {
    if (language) {
      const userData = await Employee.findOneAndUpdate(
        { owner: userId },
        { $pull: { languages: { language: language } } }
      );
    }

    if (skill) {
      const userData = await Employee.findOneAndUpdate(
        { owner: userId },
        { $pull: { skills: { skill: skill } } }
      );
    }

    res.status(201).json({
      message: "Deleted succussfully",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can add profileImage there education
// @METHOD patch
// @PATH /employee/profileImg/:userId

export const addProfileImage = AsyncHandler(async (req, res) => {
  const { image } = req.body;

  try {
    const userData = await Employee.findOne({ owner: req.params.userId });

    if (userData) {
      userData.image = image;
      userData.save();
    }

    res.status(201).json(userData);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can add their kyc details
// @METHOD post
// @PATH /employee/kyc/:userId

export const addKyc = AsyncHandler(async (req, res) => {
  const { aathar, aatharSelfie, pan, gstNumber } = req.body;
  const { userId } = req.params;

  try {
    const userData = await Employee.findOne({ owner: userId });
    await Kyc.findOneAndDelete({ owner: userId });

    const kycData = new Kyc({
      owner: userId,
      aatharImage: aathar,
      aatharSelfie: aatharSelfie,
      panImage: pan,
      gstNumber: gstNumber,
    });

    await kycData.save();

    userData.kyc = kycData._id;
    userData.kycApproved = "pending";
    await userData.save();

    res.status(201).json(userData);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
  // }
});

// @DESC Employees can add their bank details for money withdraw
// @METHOD post
// @PATH /employee/addBank/:userId

export const addBankDetails = AsyncHandler(async (req, res) => {
  const { ifsc, acNumber, acName } = req.body;
  const { userId } = req.params;

  try {
    const bank = await BankDetails.findOne({ owner: userId });
    const userData = await Employee.findOne({ owner: userId });
    if (bank) {
      res.json({
        message: "Bank Details Exists",
      });
    } else {
      const AddBank = new BankDetails({
        owner: userId,
        accountName: acName,
        accountNumber: acNumber,
        ifsc: ifsc,
      });
      await AddBank.save();
      userData.bankDetails = AddBank._id;
      userData.save();
      res.status(201).json(AddBank);
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can add upto 4 portfolios
// @METHOD post
// @PATH /employee/addPortfolio/:userId

export const addPortfolio = AsyncHandler(async (req, res) => {
  const { image, title, description } = req.body;
  const { userId } = req.params;

  try {
    const userData = await Employee.findOne({ owner: userId });

    if (userData) {
      const portfolioData = new Portfolio({
        owner: userId,
        Image: image,
        title: title,
        description: description,
      });

      await portfolioData.save();

      userData.portfolios.push(portfolioData._id);
      await userData.save();
      res.status(201).json(portfolioData);
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can delete their kyc details
// @METHOD delete
// @PATH /employee/deletePortfolio/:userId

export const deletePortFolio = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;
  try {
    const userr = await Employee.findOne({ owner: userId });
    const user = await Employee.findOneAndUpdate(
      { owner: userId },
      { $pull: { portfolios: id } }
    );
    const deletedData = await Portfolio.findByIdAndDelete(id);
    res.status(201).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can save jobs
// @METHOD get
// @PATH /employee/saveJobs/:userId/:id

export const saveJobs = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;
  try {
    const emplyeeData = await Employee.findOne({ owner: userId });
    let a = 0;
    emplyeeData.savedJobs.forEach((el) => {
      if (el + "*" === id + "*") {
        a = 2;
      }
    });

    if (a == 0) {
      emplyeeData.savedJobs.push(id);
      await emplyeeData.save();
    }
    res.json(emplyeeData);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can unsave jobs
// @METHOD delete
// @PATH /employee/saveJobs/:userId/:id

export const removeSavedJobs = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;

  try {
    const emplyeeData = await Employee.findOne({ owner: userId })
      .populate("owner")
      .populate("savedJobs")
      .populate({
        path: "savedJobs",
      });
    const arr = emplyeeData.savedJobs.filter((el) => {
      return el._id + "." !== id + ".";
    });

    emplyeeData.savedJobs = arr;
    await emplyeeData.save();

    res.status(201).json(arr);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employees can deleteNotifications
// @METHOD delete
// @PATH /employee/deleteMessage/:userId/:id

export const deleteMessage = AsyncHandler(async (req, res) => {
  try {
    const { userId, id } = req.params;

    const user = await Employee.findOne({ owner: userId });
    const message = await Notification.findByIdAndDelete(id);

    const noti = user.notification.filter((el) => {
      
      return el._id + "*" !== id + "*";
    });

    user.notification = noti;
    await user.save();

    res.status(201).json(noti);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export const getBankDetails = AsyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const bankDetails = await BankDetails.findOne({ owner: userId });

    if (bankDetails) {
      res.json(bankDetails);
    } else {
      throw new Error("No bank details");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const withdrawBalance = AsyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await Employee.findOne({ owner: userId });
    const bankDetails = await BankDetails.findOne({ owner: userId });

    if (bankDetails) {
      if (user.pendingWithdraw > 0) {
        const withdraw = new Withdraw({
          owner: userId,
          amount: user.pendingWithdraw,
        });

        user.pendingWithdraw = 0;

        await user.save();
        await withdraw.save();
        res.json(user);
      }
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const getMyWithdrawals = AsyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Withdraw.count({ owner: userId });
    const withdrawHistory = await Withdraw.find({ owner: userId })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ status: -1 });

    res.json({
      withdraw: withdrawHistory,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    throw new Error(error);
  }
});
