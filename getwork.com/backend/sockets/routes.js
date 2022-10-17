import TypingController from "./Controllers/typingController.js";
import RoomController from "./Controllers/roomController.js";
import MEssageController from "./Controllers/messageController.js";

const sockets = (socket) => {
  const typingController = new TypingController(socket);
  const roomController = new RoomController(socket);
  const messageController = new MEssageController(socket);

  socket.on("send-message", messageController.sendMessage);

  socket.on("typing-started", typingController.typingStarted);

  socket.on("typing-stoped", typingController.typingStoped);

  socket.on("join-room", roomController.joinRoom);
  socket.on("new-room-created", roomController.newRoomCreated);

  socket.on("disconnect", (socket) => {
    console.log("user left");
  });
};

export default sockets;
