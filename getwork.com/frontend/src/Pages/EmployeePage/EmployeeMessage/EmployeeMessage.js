import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import './Chat.scss'
import { useDispatch, useSelector } from "react-redux";
import { getMyRooms } from "../../../actions/chatActions";
import ChatIcon from '@mui/icons-material/Chat';

const EmployeeMessage = ({ socket }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  const myRooms = useSelector(state => state.myRooms)

  const sdf =myRooms?.data?.map(room => {
    console.log(room);
  });

  useEffect(() => {
    async function fetchRooms() {
      const { data } = await axios.get("http://localhost:3001/rooms");
      const { rooms } = data;
      console.log(rooms);
      setRooms(rooms);
    }

    fetchRooms();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // socket.on("new-room-created", ({ roomId }) => {
    //   setRooms([...rooms, roomId]);
    // });

    dispatch(getMyRooms());
  }, [socket]);

  return (
    <div className="chat-list">
      <div
        className="chat-room-list"
      >
        {myRooms?.data?.map((room) => {
          return <Link to={`/user/message/${room?.roomId}`}>{room?.employer?.name} <ChatIcon /> </Link>;
        })}
      </div>
    </div>
  );
};

export default EmployeeMessage;
