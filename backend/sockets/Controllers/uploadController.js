import BaseController from "./baseController.js";
import fs from 'fs'
import { Room } from "../models/rooms.js";

export default class UploadController extends BaseController {
  uploader = async ({ data, room }) => {
    fs.writeFile(
      "upload/" + "test.png",
      data,
      { encoding: "base64" },
      () => {}
    );

    const Foundroom = await Room.findOne({ roomId: room });

    const chatMessages = {
      message: data.toString("base64"),
      user: "employer",
      image: true,
    };

    if (Foundroom) {
      Foundroom.chats.push(chatMessages);

      await Foundroom.save();
    }
    this.socket.to(room).emit("uploaded", { buffer: data.toString("base64") });
  };
}
