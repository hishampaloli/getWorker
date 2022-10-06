import AsyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Employer from "../models/employerModel.js";
import Employee from "../models/employeeModal.js";

// @DESC Gets all the employer data
// @METHOD get
// @PATH /employer/profile/:userId

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
    return new Error("no such user found");
  }
});

// @DESC Employers can edit their profile
// @METHOD patch
// @PATH /employer/profile/:userId

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
        userData.image = image;
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

// @DESC Employers can search all the employees
// @METHOD get
// @PATH /employer/allEmployees

export const getAllEmplyees = AsyncHandler(async (req, res) => {
  const { keyword, earnings, language, jobsDone } = req.query;

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
    res.json(error);
  }
});

// @DESC Employers can save good employees for later use
// @METHOD put
// @PATH /employer/saveTalents/:userId

export const saveJobs = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  const { userId } = req.params;

  try {
    const emplyerData = await Employer.findOne({ owner: userId });

    let a = 0;

    emplyerData.savedTalents.forEach((el) => {
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

// @DESC Employers can remove good employees from saved list
// @METHOD delete
// @PATH /employer/saveTalents/:userId

export const removeSavedTalent = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  const { userId } = req.params;

  try {
    const emplyerData = await Employer.findOne({ owner: userId })
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
