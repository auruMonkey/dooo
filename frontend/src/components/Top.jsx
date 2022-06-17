import React from "react"
import { Container, Stack } from "react-bootstrap"

const Top = (props) => {
  return (
    <div className='top-main'>
      <Container>
        <Stack direction='vertical'>
          {props.text && <span className='top-label '>{props.text}</span>}
          {props.children}
        </Stack>
      </Container>
    </div>
  )
}

export default Top
