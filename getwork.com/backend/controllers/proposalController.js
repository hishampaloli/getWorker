import AsyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Employee from "../models/employeeModal.js";
import Jobs from "../models/jobsModal.js";
import Employer from "../models/employerModel.js";
import Proposals from "../models/proposalModal.js";

export const submitProposal = AsyncHandler(async (req, res) => {
  try {
    const { userId, id } = req.params;
    const { credit, cover, bid, deadline } = req.body;
    
    console.log(userId);
    console.log(id);

    const emplyeeData = await Employee.findOne({ owner: userId });
    const jobs = await Jobs.findOne({ _id: id, status: "active" });



    if (emplyeeData && jobs) {
      const proposal = new Proposals({
        owner: userId,
        jobs: id,
        cover: cover,
        bid: bid,
        deadline: deadline,
      });

      await proposal.save();

      emplyeeData.connects = emplyeeData.connects - credit;
      emplyeeData.save();

      jobs.proposals.push(proposal._id);
      jobs.save();

      res.json({
        proposal: proposal,
        job: jobs,
        emplyee: emplyeeData,
      });
    } else {
      throw new Error("No user or job found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const viewProposal = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await Proposals.findById(id).populate("owner");
    if (proposal) {
      res.json(proposal);
    } else {
      throw new Error("No such proposal found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const updateProposal = AsyncHandler(async (req, res) => {
  try {
    const { userId, id } = req.params;
    const { status } = req.body;

    const proposal = await Proposals.findById(id);

    if (proposal) {
      proposal.status = status;
      await proposal.save();
      res.json(proposal);
    } else {
      throw new Error("no such proposal found");
    }
  } catch (error) {
    throw new Error(error);
  }
});


export const myProposals = AsyncHandler(async(req, res) => {
    try {
        const {userId} = req.params;

        const proposals = await Proposals.find({owner: userId})

        if (proposals) {
            res.json(proposals)
        }else {
            throw new Error('no proposals found')
        }
    } catch (error) {
        throw new Error(error)
    }
})