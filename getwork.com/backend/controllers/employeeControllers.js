import { json } from "express";
import AsyncHandler from "express-async-handler";
import generateToken from "../utils/jsonwebtoken.js";
import Employee from "../models/employeeModal.js";
import User from "../models/userModal.js";
import Education from "../models/educations.js";

export const employeeProfile = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const userData = await Employee.findOne({ owner: id }).populate("educations");

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

  const userData = await Employee.findOne({ owner: userId  });





  if (education) {
    const educationData = new Education({
      owner: userId ,
      school: education.school,
      title: education.title,
      period: education.period,
    });

    await educationData.save();

    userData.educations.push(educationData._id);
    await userData.save();
    res.json(userData);
  }
});


export const deleteEducation = AsyncHandler(async (req, res) => {
    const {id} = req.params;
    const {userId} = req.params;
    const userr = await Employee.findOne({owner : userId});
    const user = await Employee.findOneAndUpdate({owner: userId}, {$pull: {educations: id}});
    const deletedData = await Education.findByIdAndDelete(id);
    res.json({
        "message": "Deleted Successfully"
    })

})