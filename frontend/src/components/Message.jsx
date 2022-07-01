import React from "react"
import { useState, useEffect } from "react"
import { Alert } from "react-bootstrap"

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <Alert show={show} variant={variant}>
      {children}
    </Alert>
  )
}
Message.defaultProps = {
  variant: "danger",
}

export default Message
