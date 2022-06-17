import React from "react"
import { Stack } from "react-bootstrap"

const MediaIcon = () => {
  return (
    <Stack className='media-icon my-4' direction='horizontal' gap={4}>
      <i className='fa-brands fa-facebook'></i>
      <i className='fa-brands fa-twitter'></i>
      <i className='fa-brands fa-instagram'></i>
      <i className='fa-solid fa-envelope'></i>
      <i className='fa-brands fa-whatsapp'></i>
    </Stack>
  )
}

export default MediaIcon
