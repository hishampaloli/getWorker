import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, call, stream } =
    useContext(SocketContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
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
            style={{width: '200px', height: '200px'}}
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
