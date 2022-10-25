import AsyncHandler from "express-async-handler";
import { AdminRoom } from "../sockets/models/roomOwner.js";
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

  try {
    const chat = await Room.findOne({ roomId: roomId });

    if (chat) {
      if (user === "employer") {
        chat.employerViewed = true;
      } else if (user === "employee") {
        chat.employeeViewed = true;
      }
  
      await chat.save();
      res.json(chat);
    }else {
      const helpChat = await AdminRoom.findOne({roomId: roomId});
      if (helpChat) {
        res.json(helpChat);
      }else {
        throw new Error("No chats found");
      }
    }
   
  } catch (error) {
    throw new Error(error);
  }
});


export const myHelpChat = AsyncHandler(async(req, res) => {
  try {
    const {userId} = req.params;
    const room = await AdminRoom.findOne({user: userId})

    res.json(room);
  } catch (error) {
    throw new Error(error)
  }
})