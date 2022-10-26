import React, { useEffect, useState } from "react";
import CustomSpinner from "../../../components/customSpinner/CustomSpinner";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDispatch, useSelector } from "react-redux";
import { getMyChats, getMyRooms } from "../../../actions/chatActions";
import { Link, useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { v4 as uuidv4 } from "uuid";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import { myUserChats } from "../../../actions/adminActions";

const AdminMessage = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [roomId, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setchat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [filest, setFile] = useState();
  const [videoLink, setVideoLink] = useState("");

  const myRooms = useSelector((state) => state.adminUserChats);
  const user = useSelector((state) => state.user);

  let myChats = null;

  myRooms?.data?.forEach((el) => {
    if (el?.roomId === roomId) {
      myChats = el;
    }
  });

  useEffect(() => {
    dispatch(myUserChats());
    dispatch(getMyChats(roomId, "employee"));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (!socket) return;

    dispatch(getMyRooms());

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

    socket.on("new-admin-room-created", () => {
      console.log("joined");
    });
  }, [socket, dispatch]);

  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/employee/profile");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="chat-list">
      <div className="chat-room-list">
        <div className="top">
          <h2>Your Chats</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {myRooms?.data?.map((room) => {
            return (
              <Link
                key={room.roomId}
                onClick={() => {
                  dispatch(getMyChats(room?.roomId, "employee"));
                  if (socket) {
                    socket.emit("join-admin-room", room);
                    setRoom(room?.roomId);
                  }
                }}
                // to={`/user/message/${room?.roomId}`}
              >
                {room?.user?.name}
                <div>
                  <ChatIcon />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="show-chat">
        <div className="top">
          <h6>This is a private chat between 2 people</h6>
        </div>

        <div className="bottom">
          {myChats?.chats?.map((el, idx) => {
            return (
              <>
                <div
                  key={uuidv4()}
                  className="blk mt-2"
                  style={
                    el.user === "employee"
                      ? { textAlign: "right" }
                      : { textAlign: "left" }
                  }
                >
                  {el.image ? (
                    <img
                      style={{ width: "100%", height: "50px" }}
                      src={el.message}
                      alt=""
                    />
                  ) : (
                    <p
                      style={
                        el.user === "employee"
                          ? { textAlign: "right", backgroundColor: "white" }
                          : {
                              textAlign: "left",
                              backgroundColor: "#3ccf4d",
                              color: "white",
                            }
                      }
                      className={
                        el.user === "employee" ? "al-left" : "al-right"
                      }
                    >
                      {el.message}
                    </p>
                  )}
                </div>
              </>
            );
          })}

          <div>
            {roomId ? (
              <ChatWindow room={roomId} socket={socket} user={"admin"} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessage;
