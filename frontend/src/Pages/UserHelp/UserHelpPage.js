import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getMyHelpChats } from "../../actions/chatActions";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

const UserHelpPage = ({ socket }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { chatData } = useSelector((state) => state.helpChats);
  const [room, setRoom] = useState("");

  useEffect(() => {
    dispatch(getMyHelpChats(userInfo?._id));

    if (!socket) return;
    socket.emit("new-room-created-admin", {
      user: userInfo?._id,
    });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("new-admin-room-created", () => {
        console.log("joined");
    })
  }, [socket]);



  return (
    <div>
      <div className="mt-5">
        {" "}
        <ChatWindow user={"user"} socket={socket} room={room} />
      </div>

      {chatData ? (
        <button
          onClick={() => {
            if (!socket) return;
            socket.emit("join-admin-room", chatData);
            setRoom(chatData?.roomId);
          }}
        >
          Start Messageing
        </button>
      ) : (
        <button onClick={() => {}}>start a conve</button>
      )}
    </div>
  );
};

export default UserHelpPage;
