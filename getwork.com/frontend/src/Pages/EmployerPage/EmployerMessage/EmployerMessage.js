import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMyChats, getMyRooms } from "../../../actions/chatActions";
import ChatIcon from "@mui/icons-material/Chat";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import axios from "axios";

const EmployerMessage = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [room, setRoom] = useState("");

  const myRooms = useSelector((state) => state.myRooms);
  const myChats = useSelector((state) => state.myChats);

  useEffect(() => {
    async function fetchRooms() {
      const { data } = await axios.get("http://localhost:3001/rooms");
      const { rooms } = data;
      console.log(rooms);
    }

    fetchRooms();
  }, []);

  useEffect(() => {
    if (!socket) return;

    dispatch(getMyRooms());
  }, [socket]);
  return (
    <div className="chat-list">
      <div className="chat-room-list">
        {myRooms?.data?.map((room) => {
          return (
            <Link
              onClick={() => {
                dispatch(getMyChats(room?.roomId));
                setRoom(room?.roomId);
                if (socket) {
                  socket.emit("join-room", { room });
                }
              }}
              // to={`/user/message/${room?.roomId}`}
            >
              {room?.employee?.name} <ChatIcon />{" "}
            </Link>
          );
        })}
      </div>

      <div className="show-chat">
        <h1>{room}</h1>
        {myChats.chat?.chats?.map((el) => {
          return (
            <p
              style={
                el.user === "employer"
                  ? { textAlign: "left" }
                  : { textAlign: "right" }
              }
            >
              {el.message}
            </p>
          );
        })}
        <div>
          {room ? (
            <ChatWindow room={room} socket={socket} user={"employee"} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerMessage;
