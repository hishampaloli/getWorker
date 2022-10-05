import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const KycSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  aatharImage: {
    type: String,
    required: [true, "Please add a aathar card"],
  },
  aatharSelfie: {
    type: String,
    required: [true, "Please add a aathar selfie"],
  },
  panImage: {
    type: String,
    required: [true, "Please add a pan card"],
  },
  gstNumber: {
    type: String,
    required: [true, "Please add your gst number"],
  },
  kycStatus: {
    type: String,
    default: "pending"
  }
});

const Kyc = mongoose.model("Kyc", KycSchema);

export default Kyc;
