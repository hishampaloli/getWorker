import AsyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Employee from "../models/employeeModal.js";
import Jobs from "../models/jobsModal.js";
import Employer from "../models/employerModel.js";
import Proposals from "../models/proposalModal.js";
import Notification from "../models/messageModal.js";
import Admin from "../models/adminModel.js";
import { mailTransport } from "../utils/mail.js";




// @DESC employees can post proposal to the job posts
// @METHOD post
// @PATH /proposal/:userId/:id


export const submitProposal = AsyncHandler(async (req, res) => {
  try {
    const { userId, id } = req.params;
    const { credit, cover, bid, deadline } = req.body;


    const emplyeeData = await Employee.findOne({ owner: userId });
    const jobs = await Jobs.findOne({ _id: id, status: "active" });
    const employer = await Employer.findOne({ owner: jobs.owner });

    if (emplyeeData && jobs) {
      const proposal = new Proposals({
        owner: userId,
        jobs: id,
        cover: cover,
        bid: bid,
        deadline: deadline,
      });

      const noti = new Notification({
        owner: employer._id,
        message: "You have a new Proposal in your job :- " + jobs.title,
      });

      await proposal.save();

      emplyeeData.connects = emplyeeData.connects - credit;
      employer.notification.push(noti._id);
      jobs.proposals.push(proposal._id);

      await emplyeeData.save();
      await employer.save();
      await jobs.save();
      await noti.save();

      res.status(200).json({
        proposal: proposal,
        job: jobs,
        emplyee: emplyeeData,
      });
    } else {
      throw new Error("No user or job found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error)
  }
});


// @DESC users can view the details in a proposal
// @METHOD get
// @PATH /viewProposal/:id

export const viewProposal = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await Proposals.findById(id).populate("owner");
    if (proposal) {
      res.status(200).json(proposal);
    } else {
      throw new Error("No such proposal found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error)
  }
});

// @DESC employers can reject or shortlist the  proposals in their job post
// @METHOD patch
// @PATH /updateProposal/:userId/:id

export const updateProposal = AsyncHandler(async (req, res) => {
  try {
    const { userId, id } = req.params;
    const { status } = req.body;

    const proposal = await Proposals.findById(id);

    const user = await Employee.findOne({ owner: proposal?.owner });

    if (proposal) {
      proposal.status = status;
      if (status === "shortlisted") {
        const noti = new Notification({
          owner: user._id,
          message:
            "You have earned 5 credits as your proposal have been shortlisted",
        });
        user.connects = user.connects + 5;
        user.notification.push(noti._id);
        await user.save();
        await noti.save();
      } else {
        const noti = new Notification({
          owner: user._id,
          message: "One of your Proposal have been rejected",
        });
        user.notification.push(noti._id);
        await user.save();
        await noti.save();
      }
      await proposal.save();
      res.status(201).json(proposal);
    } else {
      throw new Error("no such proposal found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error)
  }
});

// @DESC employees can see the proposal posted by them 
// @METHOD get
// @PATH /myProposal/:userId/:id

export const myProposals = AsyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const pageSize = 4;
    const page = Number(req.query.pageSize) || 1;

    const count = await Proposals.count({owner: userId});
    const proposals = await Proposals.find({ owner: userId }).limit(pageSize).skip(pageSize * page - 1)

    if (proposals) {
      res.status(200).json({proposals, page, pages: Math.ceil(count / pageSize)});
    } else {
      throw new Error("no proposals found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error)
  }
});

// @DESC employers can accept proposal and start the contract.
// @METHOD post
// @PATH /acceptProposal/:userId/:id

export const acceptProposal = AsyncHandler(async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { totalAmount } = req.body;

    const proposal = await Proposals.findById(id);
    const employer = await Employer.findOne({ owner: userId });
    const job = await Jobs.findById(proposal.jobs);
    const employee = await Employee.findOne({ owner: proposal.owner }).populate("owner");
    const admin = await Admin.findById("633be9b307ec8a154a57bc9e");

    
    if (proposal && employer && employee && admin && job) {
      if (employer.balance >= totalAmount) {
        const noti = new Notification({
          owner: employee._id,
          message:
            "Your Proposal was accepted, please start yout work as soon as possible",
        });

        employer.balance = employer.balance - totalAmount;
        admin.inEscrow.push({
          employer: employer.owner,
          employee: employee.owner._id,
          proposal: proposal._id,
          inEscrow: totalAmount,
        });

        employee.activeContracts.push(job);
        employer.activeJobs.push(job);
        job.status = "running";
        job.acceptedProposal = proposal._id;
        employee.notification.push(noti._id);

        await employer.save();
        await employee.save();
        await admin.save();
        await job.save();
        await noti.save();

        
      mailTransport().sendMail({
        from: "getworkverification@email.com",
        to: employee.owner.email,
        subject: "Verify your email account",
        html: `<div>
        <h1>OTP for reset password</h1>
        <p>Your Proposal was accepted, please start yout work as soon as possible</p>
        <strong>Do not share your otp</strong>
        </div>`,
      });

        res.status(200).json({
          message: "Success",
        });
      } else {
        throw new Error("No balance, please recharge");
      }
    }
  } catch (error) {
    res.status(404);
    console.log(error);
    throw new Error(error)
  }
});
