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

export const getChats = AsyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { user } = req.query;

  console.log(user);

  try {
    const chat = await Room.findOne({ roomId: roomId });

    if (user === "employer") {
      chat.employerViewed = true;
    } else if (user === "employee") {
      chat.employeeViewed = true;
    }

    await chat.save();

    res.json(chat);
  } catch (error) {
    throw new Error(error);
  }
});
