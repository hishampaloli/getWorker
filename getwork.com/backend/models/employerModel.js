import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employerSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
  },
  totalSpend: {
    type: Number,
    default: 0,
  },
  userType: {
    type: String,
  },
  balance: {
    type: Number,
  },
  contractsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },
  ],
  activeJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  completedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  hires: {
    type: Number,
    default: 0,
  },
  reported: {
    type: Number,
    default: 0,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  savedTalents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Employer = mongoose.model("Employer", employerSchema);
export default Employer;
