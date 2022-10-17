import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMyRooms } from '../../../actions/chatActions';
import ChatIcon from '@mui/icons-material/Chat';

const EmployerMessage = ({socket}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
  
    const myRooms = useSelector(state => state.myRooms)
  
    
  useEffect(() => {
    if (!socket) return;

    socket.on("new-room-created", ({ roomId }) => {
      setRooms([...rooms, roomId]);
    });

    dispatch(getMyRooms());
  }, [socket]);
  return (
    <div className="chat-list">
      <div
        className="chat-room-list"
      >
        {myRooms?.data?.map((room) => {
          return <Link to={`/user/message/${room?.roomId}`}>{room?.employee?.name} <ChatIcon /> </Link>;
        })}
      </div>
    </div>
  )
}

export default EmployerMessage