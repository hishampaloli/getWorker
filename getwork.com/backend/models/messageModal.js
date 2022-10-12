import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
