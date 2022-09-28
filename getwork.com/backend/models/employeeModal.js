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
      default: ["English"],
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
    portfolio: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
      },
    ],
    connects: {
      type: Number,
      default: 50,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userInfo",
    },
    workHistory: [],
    kyc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kyc",
    },
    kycApproved: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    reported: {
      type: Number,
      default: 0,
    },
    activeContracts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
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
      default: 0
    },
    availableForWithdraw: {
  
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
      }
    ],
    userType: String,
  })

  
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
