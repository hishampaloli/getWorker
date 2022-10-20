import React, { useContext } from "react";
import { Button } from "@mui/material";
import { SocketContext } from "../../SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { CALL_SUCCESS } from "../../contants/chatConstants";

const Notification = () => {
  const {
    answerCall,
    call,
    callAcccepted,
    leaveCall,
    setCallDeclined,
  } = useContext(SocketContext);

  const dispatch = useDispatch();

  const videoCall = useSelector((state) => state.callVideo);

  return (
    <div className="call-notification">
      {call.isReceivedCall && !callAcccepted && <h1>{videoCall.onCall ? "" :"User is Calling"}</h1>}
      {call.isReceivedCall && !callAcccepted && (
        <div>
          {videoCall.onCall ? (
            ""
          ) : (
            <>
              <Button
                onClick={() => {
                  answerCall();
                  dispatch({
                    type: CALL_SUCCESS,
                  });
                }}
              >
                Answer
              </Button>
              <Button
                style={{ backgroundColor: " #FF5454" }}
                onClick={() => {
                  setCallDeclined(true);
                  leaveCall();
                }}
              >
                Decline
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
