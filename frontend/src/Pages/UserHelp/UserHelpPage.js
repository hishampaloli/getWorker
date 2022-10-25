import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getMyChats, getMyHelpChats } from "../../actions/chatActions";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import "./UserHelpPage.scss";

const UserHelpPage = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { chatData } = useSelector((state) => state.helpChats);
  const [room, setRoom] = useState("");

  const myChats = useSelector((state) => state.myChats?.chat);

  console.log(myChats);

  useEffect(() => {
    dispatch(getMyHelpChats(userInfo?._id));

    if (!socket) return;
    socket.emit("new-room-created-admin", {
      user: userInfo?._id,
    });
  }, []);

  useEffect(() => {
    dispatch(getMyChats(room, "emplye"));
  }, [room]);

  useEffect(() => {
    if (!socket) return;
    socket.on("new-admin-room-created", () => {
      console.log("joined");
    });
  }, [socket]);

  return (
    <div className="help-page">
      <div className="top">
        <div>
          <h2>Having any troubles ?</h2>
          <h3>Find a solution fast.</h3>
        </div>

        <img
          src="https://img.freepik.com/premium-vector/account-login-line-icon-new-user-register-registration-concept-illustration_1948-2098.jpg"
          alt=""
        />
      </div>

      <div className="middle">
        <h3>Chat with us and share your concern.</h3>
        {chatData ? (
          <button
            onClick={() => {
              if (!socket) return;
              socket.emit("join-admin-room", chatData);
              setRoom(chatData?.roomId);
            }}
          >
            Start Messaging
          </button>
        ) : (
          <button
            onClick={() => {
              if (!socket) return;
              socket.emit("new-room-created-admin", {
                user: userInfo?._id,
              });
              window.location.reload()
            }}
          >
            Connect with admin
          </button>
        )}
      </div>

      {room ? (
        <div className="bottom">
          {myChats?.chats?.map((el, idx) => {
            return (
              <>
                <div
                  key={el.user}
                  className="blk mt-2"
                  style={
                    el.user === "user"
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
                        el.user === "admin"
                          ? {
                              textAlign: "right",
                              backgroundColor: "#3ccf4d",
                              color: "white",
                            }
                          : {
                              textAlign: "left",
                              backgroundColor: "white",
                            }
                      }
                      className={
                        el.user === "employee"
                          ? "al-left cht-p"
                          : "al-right cht-p"
                      }
                    >
                      {el.message}
                    </p>
                  )}
                </div>
              </>
            );
          })}

          <div className="chat-box">
            <div>
              {room ? (
                <ChatWindow
                  room={room}
                  socket={socket}
                  user={"user"}
                  help={true}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserHelpPage;
