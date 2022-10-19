import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  roomId: {
    type: String,
    required: true,
  },
  chats: {
    type: Array,
  },
  employeeViewed: {
    type: Boolean,
    default: true 
  },
  employerViewed: {
    type: Boolean,
    default: true 
  },
});

export const Room = mongoose.model("Room", roomSchema);
