// import Room from "../models/roomsModel.js";
import BaseController from "./baseController.js";
import { AdminRoom } from "../models/roomOwner.js";
import { Room } from "../models/rooms.js";
import { v4 as uuidv4 } from "uuid";

export default class RoomController extends BaseController {
  newRoomCreated = async ({ employer, employee }) => {
    const roomId = uuidv4();
    const roomFound = await Room.find({
      $and: [{ employee: employee }, { employer: employer }],
    });

    if (roomFound.length === 0) {
      const room = new Room({
        employer: employer,
        employee: employee,
        roomId: roomId,
      });

      await room.save();
      this.socket.emit("new-room-created-server", { roomId });
    } else {
      this.socket.emit("new-room-created-server", roomFound[0].roomId);
    }
  };

  chatWithAdmin = async ({ user }) => {
    console.log(user);
    const roomFound = await AdminRoom.find({
      $and: [{ admin: "633beb1b9678e114623121bc" }, { user: user }],
    });

    const roomId = uuidv4();

    if (roomFound.length === 0) {
      const room = new AdminRoom({
        admin: "633beb1b9678e114623121bc",
        user: user,
        roomId: roomId,
      });
      await room.save();
      this.socket.emit("admin-new-room-created-server", { roomId });
    } else {
      this.socket.emit("admin-new-room-created-server", roomFound[0].roomId);
    }
  };
  joinRoom = ({ room }) => {
    this.socket.join(room.roomId);
    this.socket.broadcast.emit("new-room-created");
    // this.socket.to(room.roomId).emit("videoId-from-server", this.socket.id);
  };

  adminRoom = (room) => {
    this.socket.join(room.roomId);
    this.socket.broadcast.emit("new-admin-room-created")
  }
}
