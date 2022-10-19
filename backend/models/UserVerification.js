import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const VerificationTokenSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

VerificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const salt = await bcrypt.genSalt(10);
    this.token = await bcrypt.hash(this.token, salt);
  }
});


VerificationTokenSchema.methods.matchPassword = async function (token) {
    return await bcrypt.compare(token, this.token);
  };

const UserVerification = mongoose.model(
  "VerificationToken",
  VerificationTokenSchema
);

export default UserVerification;
