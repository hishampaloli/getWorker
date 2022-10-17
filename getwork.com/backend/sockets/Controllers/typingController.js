import BaseController from "./baseController.js";

export default class TypingController extends BaseController {
  
    typingStarted = ({ roomId }) => {
      let skt = this.socket.broadcast;
      skt = roomId ? skt.to(roomId) : skt;
      skt.emit("typing-started-from-server");
    };
  
    typingStoped = ({ roomId }) => {
      let skt = this.socket.broadcast;
      skt = roomId ? skt.to(roomId) : skt;
      skt.emit("typing-stoped-from-server");
    };
  }
  