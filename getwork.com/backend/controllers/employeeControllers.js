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
      .populate("bankDetails")
      .populate("owner")
      .populate("savedJobs")
    if (userData) {
      res.json(userData);
    } else {
      res.status(404);
      throw new Error("No such profile found");
    }
  } catch (error) {
    res.json(error);
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
      res.json(educationData);
    }
  } catch (error) {
    res.json(error);
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
    res.json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.json(error);
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
    res.json(userData);
  } catch (error) {
    res.json(error);
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

    res.json({
      message: "Successfully updated",
    });
  } catch (error) {
    res.json(error);
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

    res.json({
      message: "Deleted succussfully",
    });
  } catch (error) {
    res.json(error);
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

    res.json(userData);
  } catch (error) {
    res.json(error);
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

    res.json(userData);
  } catch (error) {
    res.json(error);
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
      res.json(AddBank);
    }
  } catch (error) {
    res.json(error);
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
      res.json(portfolioData);
    }
  } catch (error) {
    res.json(error);
  }
});

// @DESC Employees can delete their kyc details
// @METHOD delete
// @PATH /employee/deletePortfolio/:userId

export const deletePortFolio = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;
  const userr = await Employee.findOne({ owner: userId });
  const user = await Employee.findOneAndUpdate(
    { owner: userId },
    { $pull: { portfolios: id } }
  );
  const deletedData = await Portfolio.findByIdAndDelete(id);
  res.json({
    message: "Deleted Successfully",
  });
});




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

      res.json(emplyeeData);
    }

  } catch (error) {
    res.json(error);
  }
});