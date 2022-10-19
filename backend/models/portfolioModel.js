import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const PortfolioSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  Image: {
    type: String,
    required: [true, "Please add a valid link"],
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema );

export default Portfolio;
