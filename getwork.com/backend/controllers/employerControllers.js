import AsyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Employer from "../models/employerModel.js";

export const getEmployerProfile = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await Employer.findOne({ owner: userId }).populate(
      "owner"
    );
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
