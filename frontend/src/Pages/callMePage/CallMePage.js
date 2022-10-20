import React from 'react'
import  './CallMePage.scss'
import Notification from '../../components/VideoComponents/Notification'
import Options from '../../components/VideoComponents/Options'
import VideoPlayer from '../../components/VideoComponents/VideoPlayer'

const CallMePage = ({callId, name}) => {
  return (
    <div className='call-main-div'>
        <h1>Video Caller</h1>
        <VideoPlayer />
        <Options callId={callId}  />
        <Notification />
    </div>
  )
}

export default CallMePage