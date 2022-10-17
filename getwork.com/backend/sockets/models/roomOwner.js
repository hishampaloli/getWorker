import mongoose from "mongoose";
const { Schema } = mongoose;

const roomOwnerSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  availableRooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

export const RoomOwner = mongoose.model("RoomOwner", roomOwnerSchema);
