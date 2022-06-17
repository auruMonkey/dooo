import React from "react"
import { Image } from "react-bootstrap"
import Logoimg from "../assets/Logo.png"

const Logo = (props) => {
  return (
    <Image
      src={Logoimg}
      alt='DooMoble'
      fluid
      style={{ width: props.width, height: props.height }}
    />
  )
}
export default Logo
