import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a username for your account"],
  },
  email: {
    type: String,
    required: [true, "Please enter a proper email address"],
  },
  messages: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter a strong password"],
  },
  userType: {
    type: String,
    default: "admin",
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
