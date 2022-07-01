import React from "react"
import { Button } from "react-bootstrap"

const ButtonShadow = ({
  text = "",
  handleOnClick,
  color = "darkgray",
  icon,
  bgcolor = "transparent",
}) => {
  return (
    <Button
      className=' shadow border-0 text-center'
      variant='secondary  '
      onClick={handleOnClick}
      style={{
        background: bgcolor,
        color: color,
        fontWeight: "600",
      }}
    >
      {text}
      <i className={icon} style={{ color: color }}></i>
    </Button>
  )
}

export default ButtonShadow
