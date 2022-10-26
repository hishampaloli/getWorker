import AsyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Employer from "../models/employerModel.js";
import Employee from "../models/employeeModal.js";
import Notification from "../models/messageModal.js";

// @DESC Gets all the employer data
// @METHOD get
// @PATH /employer/profile/:userId

export const getEmployerProfile = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await Employer.findOne({ owner: userId })
      // .populate("contractsPosted")
      .populate("owner")
      .populate("savedTalents")
      .populate("notification")
      .populate("completedJobs")
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

// @DESC Gets all the employer data
// @METHOD get
// @PATH /employer/profile/:userId/:id

export const getEmployerProfileData = AsyncHandler(async (req, res) => {
  const { userId, id } = req.params;
  try {
    const userData = await Employer.findOne({ owner: id })
      // .populate("contractsPosted")
      .populate("owner")
      .populate("savedTalents")
      .populate("completedJobs")
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
          res.status(404).json({
            message: "incorrect old passowrd",
          });
        }
      }

      if (image) {
        userData.image = image;
        await userData.save();
      }

      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "No such user",
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Employers can search all the employees
// @METHOD get
// @PATH /employer/allEmployees

export const getAllEmplyees = AsyncHandler(async (req, res) => {
  const { keyword, earnings, language, jobsDone, pageNumber } = req.query;

  try {
    const pageSize = 2;
    const page = Number(pageNumber) || 1;

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
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate("owner");

      res.json({
        allEmplyees,
        page,
        pages: Math.ceil(allEmplyees.length / pageSize),
      });
    } else {
      const count = await Employee.find({}).count({});
      const allEmplyees = await Employee.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate("owner");
      res
        .status(200)
        .json({ allEmplyees, page, pages: Math.ceil(count / pageSize) });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
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
      res.status(201).json(emplyerData);
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
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

    res.status(201).json(emplyerData);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @DESC Delete employer notification
// @METHOD delete
// @PATH employer/deleteMessage/:userId/:id

export const deleteMessageEmployer = AsyncHandler(async (req, res) => {
  try {
    const { userId, id } = req.params;

    const user = await Employer.findOne({ owner: userId });
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
