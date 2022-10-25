import { AdminRoom } from "../models/roomOwner.js";
import { Room } from "../models/rooms.js";
import BaseController from "./baseController.js";

export default class MEssageController extends BaseController {
  sendMessage = async ({ message, room, user, me }) => {

    console.log(me);
    console.log(room);
    console.log(user);
    console.log(message);
    if (me) {
      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("link-from-server", { me });
    }

    const Foundroom = await Room.findOne({ roomId: room });
    const adminRoom = await AdminRoom.findOne({roomId: room});

    const chatMessages = {
      message: message,
      user: user,
    };

    if (Foundroom && message !== '') {
      Foundroom.chats.push(chatMessages);

      if (user === 'employer') {
        Foundroom.employeeViewed = false
      }else {
        Foundroom.employerViewed = false
      }

      await Foundroom.save();

      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("message-from-server", { message });

      
    }

    if (adminRoom && message !== '') {
      adminRoom.chats.push({
        message: message,
        user: user,
      })

      await adminRoom.save()
      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("message-from-server", { message });
    }
  };
}
