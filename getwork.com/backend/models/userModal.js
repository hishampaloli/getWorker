import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a username for your account"],
    },
    email: {
      type: String,
      required: [true, "Please enter a proper email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter a strong password"],
    },
    userType: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    employeeData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    employerData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
    },
    adminData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    reported: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
