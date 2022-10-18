import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

const ChatWindow = ({ socket, user }) => {

  const [message, setMessage] = useState("");
  const [chat, setchat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const {roomId} = useParams();

  useEffect(() => {
    if (!socket) return;
    socket.on("message-from-server", (data) => {
      setchat((prev) => [...prev, { messages: data.message, received: true }]);
    });

    socket.on("typing-started-from-server", () => {
      console.log(34);
      setTyping(true);
    });

    socket.on("typing-stoped-from-server", () => {
      setTyping(false);
    });
  }, [socket]);

  const handleFrom = (e) => {
    e.preventDefault();
       socket.emit("send-message", { message, roomId , user });
   
    setchat((prev) => [...prev, { messages: message, received: false }]);
    setMessage("");
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit("typing-started", {roomId});

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stoped", {roomId});
      }, 500)
    );
  };

  return (
    <div>
    {roomId && <h2>ROOM : {roomId}</h2> }
      <div
        className="chat-box"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {chat.map((el) => {
          return (
            <p
              style={
                el.received ? { textAlign: "left" } : { textAlign: "right" }
              }
            >
              {el.messages}
            </p>
          );
        })}

        <div>
          {typing && <a>Typing...</a>}
          <form onSubmit={handleFrom}>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={message}
              onChange={handleInput}
            />

            <Button variant="contained" type="submit">
              sent
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
