import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMyChats, getMyRooms } from "../../../actions/chatActions";
import ChatIcon from "@mui/icons-material/Chat";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CustomSpinner from "../../../components/customSpinner/CustomSpinner";

const EmployerMessage = ({ socket }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [room, setRoom] = useState("");

  const myRooms = useSelector((state) => state.myRooms);
  const myChats = useSelector((state) => state.myChats);

  useEffect(() => {
    if (!socket) return;

    dispatch(getMyRooms());
  }, [socket, dispatch]);

  
  useEffect(() => {
    if (!user?.userInfo) {
      navigate("/login");
    }
    if (user?.userInfo?.userType === "employee") {
      navigate("/user/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  }, [user, navigate]);

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
                key={room?.roomId}
                style={
                  room?.employerViewed === false
                    ? { backgroundColor: "#aaaa" }
                    : {}
                }
                onClick={() => {
                  dispatch(getMyChats(room?.roomId, "employer"));
                  setRoom(room?.roomId);
                  if (socket) {
                    socket.emit("join-room", { room });
                  }
                }}
                // to={`/user/message/${room?.roomId}`}
              >
                {room?.employee?.name}{" "}
                <div>
                  {room?.employerViewed === false ? (
                    <NotificationsActiveIcon />
                  ) : (
                    ""
                  )}
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
          {myChats.loading && room ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <CustomSpinner />
            </div>
          ) : (
            ""
          )}
          {myChats.chat?.chats?.map((el, idx) => {
            return (
              <>
                <div
                  key={idx}
                  className="blk mt-2"
                  style={
                    el.user === "employee"
                      ? { textAlign: "left" }
                      : { textAlign: "right" }
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
                        el.user === "employer"
                          ? { textAlign: "left", backgroundColor: "white" }
                          : {
                              textAlign: "right",
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
            {room ? (
              <ChatWindow room={room} socket={socket} user={"employer"} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerMessage;
