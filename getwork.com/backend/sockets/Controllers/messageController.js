import BaseController from "./baseController.js";

export default class MEssageController extends BaseController {
  sendMessage = ({ message, roomId }) => {
    let skt = this.socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("message-from-server", { message });
  };
}
