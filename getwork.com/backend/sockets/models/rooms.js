import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  roomId: {
    type: String,
    required: true,
  },
  chats: {
    type: Array,
  },
});

export const Room = mongoose.model("Room", roomSchema);
