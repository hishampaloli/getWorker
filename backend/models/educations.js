import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const EducationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  school: {
    type: String,
  },
  title: {
    type: String,
  },
  period: {
    type: String,
  },
});

const Education = mongoose.model("Education", EducationSchema);

export default Education;
