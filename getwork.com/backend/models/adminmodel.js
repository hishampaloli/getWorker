import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blacklistedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pendingWithdrawals: {
    type: Number,
    default: 0,
  },
  soldConnect: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  inEscrow: [
    {
      employer: {
        type: mongoose.Schema.Types.ObjectId,
      },
      employee: {
        type: mongoose.Schema.Types.ObjectId,
      },
      inEscrow: {
        type: Number
      },
       proposal: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
