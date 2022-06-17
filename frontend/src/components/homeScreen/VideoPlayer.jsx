import React, { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import ReactPlayer from "react-player/lazy"

import video from "../../assets/video/HomePageDoomobleVideo.mp4"

const VideoPlayer = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const popupModalValue = localStorage.getItem("popupModal")
    if (!popupModalValue) {
      setShow(() => true)
    }
  }, [])

  const hClose = () => {
    setShow(() => false)
    localStorage.setItem("popupModal", "1")
  }

  return (
    <Modal
      show={show}
      onHide={hClose}
      style={{ width: "90vw", height: "90vh", background: "Transparency" }}
      centered
      size='lg'
    >
      <ReactPlayer
        playing={true}
        muted={true}
        url={video}
        controls={true}
        width='60vw'
        height='auto'
      />
    </Modal>
  )
}

export default VideoPlayer
