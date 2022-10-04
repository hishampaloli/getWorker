import AsyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Employer from "../models/employerModel.js";
import Employee from "../models/employeeModal.js";

export const getEmployerProfile = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await Employer.findOne({ owner: userId })
      .populate("owner")
      .populate("savedTalents")
      .populate({
        path: "savedTalents",
        populate: [
          {
            path: "employeeData",
            select: "image userTitle totalEarned _id",
          },
        ],
      });
    if (userData) {
      res.json(userData);
    } else {
      res.json({
        message: "No such user",
      });
    }
  } catch (error) {
    console.log(error);
    return new Error("no such user found");
  }
});

export const editEmployerProfile = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { name, oldPass, newPass, image } = req.body;

  try {
    const user = await User.findById(userId);
    const userData = await Employer.findOne({ owner: userId });

    if (user) {
      if (name) {
        user.name = name;
      }

      if (newPass && oldPass) {
        if (await user.matchPassword(oldPass)) {
          user.password = newPass;
        } else {
          res.json({
            message: "incorrect old passowrd",
          });
        }
      }

      if (image) {
        console.log(image + "323332");
        userData.image = image;
        console.log(userData);
        await userData.save();
      }

      await user.save();
      res.json(user);
    } else {
      res.json({
        message: "No such user",
      });
    }
  } catch (error) {
    res.json(error);
  }
});

export const getAllEmplyees = AsyncHandler(async (req, res) => {
  const { keyword, earnings, language, jobsDone } = req.query;

  console.log(keyword);
  console.log(language);
  console.log(earnings + "3");
  console.log(jobsDone);

  try {
    if (keyword || language || earnings || jobsDone) {
      const allEmplyees = await Employee.find({
        $or: [
          {
            "languages.language": {
              $regex: language ? language : "null",
              $options: "i",
            },
          },
          {
            "skills.skill": {
              $regex: keyword ? keyword : "null",
              $options: "i",
            },
          },
          {
            totalEarned: { $lt: earnings ? earnings : "-20" },
          },
          
        ],
      }).populate("owner");

      res.json(allEmplyees);
    } else {
      const allEmplyees = await Employee.find({}).populate("owner");
      res.json(allEmplyees);
    }
  } catch (error) {
    console.log(error);
  }
});

export const saveJobs = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  const { userId } = req.params;

  try {
    const emplyerData = await Employer.findOne({ owner: userId });

    let a = 0;

    emplyerData.savedTalents.forEach((el) => {
      console.log(el + "2");
      if (el + "*" === id + "*") {
        a = 2;
      }
    });

    if (a == 0) {
      emplyerData.savedTalents.push(id);
      await emplyerData.save();
      res.json(emplyerData);
    }
  } catch (error) {
    res.json(error);
  }
});

export const removeSavedTalent = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  const { userId } = req.params;

  try {
    const emplyerData = await Employer.findOne({ owner: userId })
      .populate("owner").populate("savedTalents")
      .populate({
        path: "savedTalents",
        populate: [
          {
            path: "employeeData",
            select: "image userTitle totalEarned _id",
          },
        ],
      });
      console.log(id);

    const arr = emplyerData.savedTalents.filter((el) => {
      return el._id + "." !== id + ".";
    });

    emplyerData.savedTalents = arr;
    await emplyerData.save();

    res.json(emplyerData);
  } catch (error) {
    res.json(error);
  }
});
