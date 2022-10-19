import React, { useContext } from "react";
import { Button } from "@mui/material";
import { SocketContext } from "../../SocketContext";

const Notification = () => {
  const { answerCall, call, callAcccepted, leaveCall, callDeclined, setCallDeclined } =
    useContext(SocketContext);


  return (
    <div>
      {call.isReceivedCall && !callAcccepted && (
        <div>
          <Button onClick={answerCall}>Answer</Button>
          <Button
            onClick={() => {
              setCallDeclined(true);
              leaveCall();
            }}
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notification;
