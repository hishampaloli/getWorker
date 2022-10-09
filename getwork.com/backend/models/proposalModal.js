import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  bid: {
    type: Number,
    min: 0,
  },
  status: {
    type: String,
    enum: ["active", "shortlisted", "rejected"],
    default: "active",
  },
  deadline: {
    type: Number,
    default: 1,
  },
});

const Proposals = mongoose.model("Proposal", ProposalSchema);

export default Proposals;
