import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  level: {
    type: String,
    enum: ["easy", "intermediate", "advanced"],
    default: "easy",
  },
  budget: {
    type: Number,
    min: 5,
    max: 100000,
  },
  searchTag: {
    type: Array,
  },
  proposals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
  ],
  acceptedProposal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled", "running"],
    default: "active",
  },
  deadline: {
    type: Number,
    default: 1,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Jobs = mongoose.model("Job", JobsSchema);

export default Jobs;
