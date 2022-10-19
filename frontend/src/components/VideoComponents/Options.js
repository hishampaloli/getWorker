import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";

import { SocketContext } from "../../SocketContext";

const Options = ({ children, callId }) => {
  const {
    callAccepted,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);

  const [dec, setDec] = useState(false);
  const [cling, setCling] = useState(false);

 

  const [idToCall, setIdToCall] = useState("");
  return (
    <div>
      <form
        style={{
          backgroundColor: "yellow",
          position: "absolute",
          top: "40vh",
          left: "20px",
          height: "70px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <div>
            <p></p>
            <h6>Make a Call</h6>
            <h1>{dec ? "Call decline" : "Calling"}</h1>
           
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall}>Hang Up </button>
            ) : (
              <button
                onClick={() => {
                  callUser(callId);
                  setCling(true);
                }}
              >
                Call
              </button>
            )}
          </div>
        </div>
      </form>
      {children}
    </div>
  );
};

export default Options;
