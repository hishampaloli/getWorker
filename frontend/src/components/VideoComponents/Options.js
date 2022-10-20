import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";

import { SocketContext } from "../../SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { CALL_REQUEST } from "../../contants/chatConstants";

const Options = ({ children, callId}) => {
  const {
    callAccepted,
    callEnded,
    callAcccepted,
    leaveCall,
    callUser,
    call,
  } = useContext(SocketContext);


  console.log(call);

  const dispatch = useDispatch();

  const videoCall = useSelector((state) => state.callVideo);
  console.log(videoCall);

  const [dec, setDec] = useState(false);
  const [cling, setCling] = useState(false);

  const [idToCall, setIdToCall] = useState("");
  return (
    <div className="call-options">
      {videoCall.loading && !videoCall.onCall ? (
        "Calling . . ."
      ) : videoCall.onCall ? (
        <h5>On Call</h5>
      ) : (
        <h6>Make a Call</h6>
      )}

      {callAccepted && !callEnded ? (
        <button className="hang-btn" onClick={leaveCall}>
          Hang Up{" "}
        </button>
      ) : (
        <>
          {call.isReceivedCall && !callAcccepted ? (
            ""
          ) : (
            <button
              className="call-btn"
              onClick={() => {
                callUser(callId);
                setCling(true);
                dispatch({
                  type: CALL_REQUEST,
                });
              }}
            >
              Call
            </button>
          )}
        </>
      )}
      {children}
    </div>
  );
};

export default Options;
