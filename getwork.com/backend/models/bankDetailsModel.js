import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const BankDetailsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ifsc: {
    type: String,
    required: true
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accountName: {
    type: String,
    required: true
  },
});

const BankDetails = mongoose.model("BankDetails", BankDetailsSchema);

export default BankDetails;
