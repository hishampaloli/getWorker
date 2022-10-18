import { Room } from "../models/rooms.js";
import BaseController from "./baseController.js";

export default class MEssageController extends BaseController {
  sendMessage = async ({ message, roomId, user }) => {

    const room = await Room.findOne({roomId: roomId});
    
    const chatMessages = {
      message: message,
      user: user,
    }

    room.chats.push(chatMessages);

    await room.save();
    
    let skt = this.socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("message-from-server", { message });
  };
}
