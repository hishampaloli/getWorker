import mongoose from "mongoose";

const PusrchaseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  details: {
    type: Array
  },
});

const Purchase = mongoose.model("Purchase", PusrchaseSchema);

export default Purchase;
