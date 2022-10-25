import mongoose from "mongoose";
const { Schema } = mongoose;

const AdminRoomSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user: 
    {
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

export const AdminRoom = mongoose.model("AdminRoom", AdminRoomSchema);
