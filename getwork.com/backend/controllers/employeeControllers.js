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

export const employeeProfile = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const userData = await Employee.findOne({ owner: id })
    .populate("educations")
    .populate("portfolios");

  if (userData) {
    res.json(userData);
  } else {
    res.status(404);
    throw new Error("No such profile found");
  }
});

export const postEducations = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { education } = req.body;

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
});

export const deleteEducation = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;
  const userr = await Employee.findOne({ owner: userId });
  const user = await Employee.findOneAndUpdate(
    { owner: userId },
    { $pull: { educations: id } }
  );
  const deletedData = await Education.findByIdAndDelete(id);
  res.json({
    message: "Deleted Successfully",
  });
});

export const addLanguageAndSkill = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { skill, language } = req.body;

  const userData = await Employee.findOne({ owner: userId });
  console.log(userData);

  if (skill) {
    userData.skills.push({ skill });
    await userData.save();
  }

  if (language) {
    userData.languages.push({ language: language });
    await userData.save();
  }
  res.json(userData);
});

export const editInfo = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { title, info } = req.body;

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
});

export const deleteLanguageOrSkill = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { skill, language } = req.query;

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
});

export const addProfileImage = AsyncHandler(async (req, res) => {
  const { image } = req.body;

  const userData = await Employee.findOne({ owner: req.params.userId });

  if (userData) {
    userData.image = image;
    userData.save();
  }

  res.json(userData);
});

export const addKyc = AsyncHandler(async (req, res) => {
  const { aathar, aatharSelfie, pan, gstNumber } = req.body;
  const { userId } = req.params;

  const userData = await Employee.findOne({ owner: userId });

  console.log(userData);

  // if (aathar && aatharSelfie && pan && gstNumber) {
  console.log(aathar);
  console.log(aatharSelfie);
  console.log(pan);
  console.log(gstNumber);
  try {
    const kycData = new Kyc({
      owner: userId,
      aatharImage: aathar,
      aatharSelfie: aatharSelfie,
      panImage: pan,
      gstNumber: gstNumber,
    });

    await kycData.save();

    console.log(kycData);
    userData.kyc = kycData._id;
    await userData.save();
    console.log(userData);
    res.json(userData);
  } catch (error) {
    // console.log(error);
  }
  // }
});

export const addBankDetails = AsyncHandler(async (req, res) => {
  const { ifsc, acNumber, acName } = req.body;
  const { userId } = req.params;

  try {
    const bank = await BankDetails.findOne({ owner: userId });
    if (bank) {
      console.log(7898);
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
      console.log(AddBank);
      await AddBank.save();
      res.json(AddBank);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

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
      res.json(userData);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


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