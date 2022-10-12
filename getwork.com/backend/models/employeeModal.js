import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employeeSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  totalEarned: {
    type: Number,
    default: 0,
  },
  languages: {
    type: Array,
  },
  educations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Education",
    },
  ],
  skills: [],
  exprerience: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exprerience",
    },
  ],
  portfolios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
    },
  ],
  connects: {
    type: Number,
    default: 50,
  },
  userTitle: {
    type: String,
    default: "PLease add your Title",
  },
  userInfo: {
    type: String,
    default: "PLease add your Info",
  },
  completedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  kyc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kyc",
  },
  kycApproved: {
    type: String,
    default: "pending",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  reported: {
    type: Number,
    default: 0,
  },
  activeContracts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  myProposals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
  ],
  pendingWithdraw: {
    type: Number,
    default: 0,
  },
  availableForWithdraw: {},
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  userType: String,
  bankDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankDetail",
  },
  notification: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
