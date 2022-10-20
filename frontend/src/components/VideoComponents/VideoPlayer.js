import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";

const VideoPlayer = () => {
  const {  callAccepted, myVideo, userVideo, callEnded,  stream } =
    useContext(SocketContext);
  return (
    <div className="vid-box">
      {stream && (
        <div className="myVideo">
          <div>
            <h5>You</h5>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="videoplaye"
            />
          </div>
        </div>
      )}

      {callAccepted && !callEnded && (
        <div className="userVideo">
          <div>
            <h5>User</h5>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="videoplaye"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
