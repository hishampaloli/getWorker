import TypingController from "./Controllers/typingController.js";
import RoomController from "./Controllers/roomController.js";
import MEssageController from "./Controllers/messageController.js";
import fs from "fs";
import { Room } from "./models/rooms.js";

const sockets = (socket) => {
  const typingController = new TypingController(socket);
  const roomController = new RoomController(socket);
  const messageController = new MEssageController(socket);

  socket.on("send-message", messageController.sendMessage);

  socket.on("typing-started", typingController.typingStarted);

  socket.on("typing-stoped", typingController.typingStoped);

  socket.on("join-room", roomController.joinRoom);
  socket.on("new-room-created", roomController.newRoomCreated);

  socket.on("upload", async ({ data, room }) => {
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
    socket.to(room).emit("uploaded", { buffer: data.toString("base64") });
  });

  socket.emit("me", socket.id);

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });

  socket.on("disconnect", (socket) => {
    socket.broadcast.emit("callended");
  });
};

export default sockets;
