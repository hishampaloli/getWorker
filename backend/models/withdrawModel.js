import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending"
  }
});

const Withdraw = mongoose.model("Withdraw", WithdrawSchema);

export default Withdraw;
