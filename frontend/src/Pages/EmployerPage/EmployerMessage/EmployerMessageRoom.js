import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ChatWindow from '../../../components/ChatWindow/ChatWindow';

const EmployerMessageRoom = ({socket}) => {
  
    
    const { roomId } = useParams();


    useEffect(() => {
      if (socket) {
          socket.emit("join-room", { roomId: roomId });
      }
    }, [socket]);
  
    return (
      <div>
      <ChatWindow socket={socket} user={"employer"} /></div>
    )
  
}

export default EmployerMessageRoom