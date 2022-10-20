import AsyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Employee from "../models/employeeModal.js";
import Jobs from "../models/jobsModal.js";
import Employer from "../models/employerModel.js";
import Proposals from "../models/proposalModal.js";
import Admin from "../models/adminModel.js";
import Notification from "../models/messageModal.js";

// @DESC employers can post jobs
// @METHOD post
// @PATH employer/postJob/:userId

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

      res.status(201).json({
        job: job,
        user: userData,
      });
    }
  } catch (error) {
    throw new Error("Oops something went wrong");
  }
});

// @DESC employers can see the jobs posted by them
// @METHOD get
// @PATH employer/mypost/:userId

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
    } else {
      throw new Error("No jobs found");
    }
  } catch (error) {
    throw new Error("Oops something gone wrong");
  }
});

// @DESC get the data of all the jobs in the data base
// @METHOD get
// @PATH employer/getAllJobs

export const getAllJobs = AsyncHandler(async (req, res) => {
  try {
    const allJobs = await Jobs.find({ status: "active" });
    console.log(allJobs + "sfd");
    if (allJobs) {
      res.status(200).json(allJobs);
    } else {
      throw new Error("No jobs found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error)
  }
});

// @DESC employers can change the status of the job to cancel
// @METHOD get
// @PATH employer/jobsStatus/:userId/:id

export const endJob = AsyncHandler(async (req, res) => {
  try {
    const { userId, id } = req.params;

    const jobs = await Jobs.findById(id);

    jobs.status = "cancelled";
    await jobs.save();
    res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error)
  }
});

// @DESC gets the data of a particular job post
// @METHOD get
// @PATH employer/jobs/:id

export const jobView = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const jobs = await Jobs.findById(id).populate("proposals");

    if (jobs) {
      res.status(200).json(jobs);
    } else {
      res.json({
        message: "no jobs found",
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error)
  }
});

// @DESC employers can approve the job once it is finished by the employee
// @METHOD get
// @PATH employer/jobs/:id

export const approveJob = AsyncHandler(async (req, res) => {
  try {
    const { userId, id } = req.params;
    console.log(userId);

    const job = await Jobs.findById(id);

    const proposal = await Proposals.findById(job.acceptedProposal);

    const employer = await Employer.findOne({ owner: userId });
    const employee = await Employee.findOne({ owner: proposal.owner });
    const admin = await Admin.findById("633be9b307ec8a154a57bc9e");

    const activeContract = employee.activeContracts.filter((el) => {
      return el + "*" !== job._id + "*";
    });

    const activeJob = employer.activeJobs.filter((el) => {
      return el + "*" !== job._id + "*";
    });

    const escrow = admin.inEscrow.filter((el) => {
      console.log(el);
      console.log(proposal._id);
      return el.proposal + "*" !== proposal._id + "*";
    });

    const noti = new Notification({
      owner: employee.owner,
      message: `Congratulations for compliting your job, RS.${
        proposal.bid - (proposal.bid * 20) / 100
      } have been added to your balance`,
    });

    employee.totalEarned =
      employee.totalEarned + (proposal.bid - (proposal.bid * 20) / 100);

    employee.notification.push(noti._id);

    employee.pendingWithdraw =
      employee.pendingWithdraw + (proposal.bid - (proposal.bid * 20) / 100);

    employee.completedJobs.push(job._id);
    employee.activeContracts = activeContract;

    employer.activeJobs = activeJob;
    employer.completedJobs.push(job._id);
    employer.hires = employer.hires + 1;
    employer.totalSpend = employer.totalSpend + proposal.bid;

    admin.balance = admin.balance + (proposal.bid - (proposal.bid * 20) / 100);
    admin.inEscrow = escrow;

    job.status = "completed";
    await admin.save();
    await employee.save();
    await employer.save();
    await job.save();
    await noti.save();

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error)
  }
});
