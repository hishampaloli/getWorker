// import Room from "../models/roomsModel.js";
import BaseController from "./baseController.js";
import { RoomOwner } from "../models/roomOwner.js";
import { Room } from "../models/rooms.js";

export default class RoomController extends BaseController {
  newRoomCreated = async ({ roomId, employer, employee }) => {
    const room = new Room({
      employer: employer,
      employee: employee,
      roomId: roomId,
    });

    const roomUser = await RoomOwner.findOne({ employee: employee });

    if (roomUser) {
      roomUser.availableRooms.push(room);
      await roomUser.save();
    } else {
      const newRoomUser = new RoomOwner({
        employee: employee,
        employer: employer,
      });

      newRoomUser.availableRooms.push(room._id);
      await newRoomUser.save();
    }

    await room.save();
    this.socket.broadcast.emit("new-room-created", { roomId });
  };

  joinRoom = ({ roomId }) => {
    this.socket.join(roomId);
    this.socket.broadcast.emit("new-room-created");
  };
}
