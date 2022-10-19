import React from 'react'
import Notification from '../components/VideoComponents/Notification'
import Options from '../components/VideoComponents/Options'
import VideoPlayer from '../components/VideoComponents/VideoPlayer'

const CallMePage = ({callId}) => {
  return (
    <div style={{backgroundColor: '#aaa', position: 'absolute', top: '100px',width: '80%', height: '60vh'}}>
        <h1>Video Caller</h1>
        <VideoPlayer />
        <Options callId={callId} />
        <Notification />
    </div>
  )
}

export default CallMePage