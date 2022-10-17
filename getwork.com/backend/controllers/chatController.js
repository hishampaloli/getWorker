import AsyncHandler from "express-async-handler";
import { RoomOwner } from "../sockets/models/roomOwner.js";
import { Room } from "../sockets/models/rooms.js";

export const getMyChats = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const chats = await Room.find({
      $or: [{ employee: userId }, { employer: userId }],
    })
      .populate("employer")
      .populate("employee");

    if (chats) {
      res.json(chats);
    } else {
      throw new Error("No chats");
    }
  } catch (error) {
    throw new Error(error);
  }
});
