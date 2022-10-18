import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ChatWindow from '../../../components/ChatWindow/ChatWindow'

const EmployeeMessageRooms = ({socket}) => {

    
  const { roomId } = useParams();


  useEffect(() => {
    if (socket) {
        socket.emit("join-room", { roomId: roomId });
    }
  }, [socket]);

  return (
    <div><ChatWindow socket={socket} user={"employee"} /></div>
  )
}

export default EmployeeMessageRooms