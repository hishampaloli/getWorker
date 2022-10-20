import BaseController from "./baseController.js";

export default class VideoController extends BaseController {
  userCalling = ({ userToCall, signalData, from, name }) => {
    this.socket
      .to(userToCall)
      .emit("calluser", { signal: signalData, from, name });
  };

  answerCall = (data) => {
    this.socket
      .to(data.to)
      .emit("callaccepted", data.signal);
  };
}
