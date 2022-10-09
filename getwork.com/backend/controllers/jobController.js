import AsyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Employee from "../models/employeeModal.js";
import Jobs from "../models/jobsModal.js";
import Employer from "../models/employerModel.js";

export const postJobs = AsyncHandler(async (req, res) => {
  const { title, description, budget, deadline, level, searchTag } = req.body;
  const { userId } = req.params;

  try {
    const userData = await Employer.findOne({ owner: userId });
    if (userData) {
      const job = new Jobs({
        owner: userId,
        title: title,
        description: description,
        budget: budget,
        deadline: deadline,
        level: level,
        searchTag: searchTag,
      });

      await job.save();

      userData.contractsPosted.push(job._id);
      await userData.save();

      res.json({
        job: job,
        user: userData,
      });
    }
  } catch (error) {
    throw new Error("Oops something went wrong");
  }
});

export const myJobs = AsyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(userId);
    const keyword = req.query.keyword
      ? {
          owner: userId,
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : { owner: userId };


    const jobs = await Jobs.find(keyword);


    if (jobs) {
      res.json(jobs);
    }else {
      throw new Error("No jobs found")
    }
  } catch (error) {
    throw new Error("Oops something gone wrong");
  }
});

export const getAllJobs = AsyncHandler(async (req, res) => {
  try {
    const allJobs = await Jobs.find({ status: 'active'});
console.log(allJobs + "sfd");
    if (allJobs) {
      res.json(allJobs);
    }else {
      throw new Error("No jobs found")
    }
  } catch (error) {
    res.json(error);
    throw new Error("Something went wrong");
  }
});

export const jobView = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const jobs = await Jobs.findById(id).populate("proposals");

    if (jobs) {
      res.json(jobs);
    } else {
      res.json({
        message: "no jobs found",
      });
    }
  } catch (error) {
    throw new Error("No such jobs found");
  }
});
