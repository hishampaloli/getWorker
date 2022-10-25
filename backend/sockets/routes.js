import TypingController from "./Controllers/typingController.js";
import RoomController from "./Controllers/roomController.js";
import MEssageController from "./Controllers/messageController.js";
import VideoController from "./Controllers/videoController.js";
import UploadController from "./Controllers/uploadController.js";
import fs from "fs";
import { Room } from "./models/rooms.js";

const sockets = (socket) => {
  const typingController = new TypingController(socket);
  const roomController = new RoomController(socket);
  const messageController = new MEssageController(socket);
  const videoController = new VideoController(socket);
  const uploadController = new UploadController(socket);

  socket.emit("me", socket.id);
  socket.on("send-message", messageController.sendMessage);
  socket.on("typing-started", typingController.typingStarted);
  socket.on("typing-stoped", typingController.typingStoped);
  socket.on("join-room", roomController.joinRoom);
  socket.on("join-admin-room", roomController.adminRoom);
  socket.on("new-room-created", roomController.newRoomCreated);
  socket.on("new-room-created-admin", roomController.chatWithAdmin);
  socket.on("upload", uploadController.uploader);
  socket.on("calluser", videoController.userCalling);
  socket.on("answercall", videoController.answerCall);

  socket.on("endCall", () => {
    socket.broadcast.emit("callended");
  })

  socket.on("disconnect", () => {
    console.log('userLeft');
  });
};

export default sockets;
