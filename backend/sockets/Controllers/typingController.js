import BaseController from "./baseController.js";

export default class TypingController extends BaseController {
  
    typingStarted = ({ room }) => {

      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("typing-started-from-server");
    };
  
    typingStoped = ({ room }) => {
      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("typing-stoped-from-server");
    };
  }
  