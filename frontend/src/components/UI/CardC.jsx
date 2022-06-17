import React from "react"
import { Card } from "react-bootstrap"

const CardC = (props) => {
  return <Card className='card-main'>{props.children}</Card>
}

export default CardC
