import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import VideocamIcon from "@mui/icons-material/Videocam";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { SocketContext } from "../../SocketContext";
import CallMePage from "../../Pages/callMePage/CallMePage";
import AttachFile from "@mui/icons-material/AttachFile";

const ChatWindow = ({ socket, user, room }) => {
  const { me, call, callAcccepted } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [chat, setchat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [filest, setFile] = useState();
  const [videoLink, setVideoLink] = useState("");
  const userI = useSelector((state) => state.user);
  const userName = userI.userInfo?.name;

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      if (data.message) {
        setchat((prev) => [
          ...prev,
          { messages: data.message, received: true, type: "lgy" },
        ]);
      }
    });

    socket.on("link-from-server", (data) => {
      setVideoLink(data.me);
    });

    socket.on("typing-started-from-server", () => {
      setTyping(true);
    });

    socket.on("typing-stoped-from-server", () => {
      setTyping(false);
    });

    socket.on("uploaded", (data) => {
      setchat((prev) => [
        ...prev,
        { messages: data.buffer, received: false, type: "image" },
      ]);
    });
  }, [socket]);

  const handleFrom = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message, room, user });
    if (message !== "") {
      setchat((prev) => [
        ...prev,
        { messages: message, received: false, type: "dfg" },
      ]);
      setMessage("");
    }

    if (!filest) return;

    const reader = new FileReader();
    reader.readAsDataURL(filest);
    reader.onload = () => {
      const data = reader.result;
      socket.emit("upload", { data, room });
      setchat((prev) => [
        ...prev,
        { messages: data, received: false, type: "image" },
      ]);
      setFile("");
    };
  };

  const handleVideoLink = () => {
    socket.emit("send-message", { message, room, user, me });
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit("typing-started", { room });

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stoped", { room });
      }, 1000)
    );
  };

  return (
    <div>
      {videoLink && (
        <>
          {" "}
          <div>
            {" "}
            <div
              style={{
                position: "absolute",
                right: "60px",
                top: "130px",
                zIndex: "101",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                backgroundColor: "#FF5454",
                color: "white",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setVideoLink("")}
            >
              {" "}
              <CloseIcon />{" "}
            </div>{" "}
            <CallMePage callId={videoLink} />
          </div>
        </>
      )}

      {call.isReceivedCall && !callAcccepted && (
        <CallMePage callId={videoLink} name={userName} />
      )}
      <div
        className="chat-box"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {chat.map((el, idx) => {
          return (
            <div
              key={idx + el}
              className="blk mt-2"
              style={
                el.received
                  ? { textAlign: "left", color: "white" }
                  : { textAlign: "right" }
              }
            >
              {el.type === "image" ? (
                <img
                  style={{ width: "100%", height: "50px" }}
                  src={el.messages}
                  alt=""
                />
              ) : (
                <p
                  style={
                    !el.received
                      ? { textAlign: "right", backgroundColor: "white" }
                      : {
                          textAlign: "left",
                          backgroundColor: "#3ccf4d",
                          color: "white",
                        }
                  }
                  className={el.user === "employee" ? "al-left" : "al-right"}
                >
                  {el.messages}
                </p>
              )}
            </div>
          );
        })}

        <div>
          {typing && (
            <div className="chat-bubble">
              <div className="typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}

          <form onSubmit={handleFrom}>
            <TextField
              id="standard-basic"
              className="sdf"
              variant="standard"
              placeholder="Send message"
              value={message}
              onChange={handleInput}
            />
            <Button>
              <input type="file" onChange={fileSelected} ></input>
            </Button>

            <Button onClick={handleVideoLink}>
              {" "}
              <VideocamIcon />{" "}
            </Button>
            <Button type="submit">
              <SendIcon />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
