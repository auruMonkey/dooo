import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Row, Col } from "react-bootstrap"
import { Raiting, Persona } from "../../../../components"

const BusinessInfo = ({ avatar, rating, address }) => {
  const [addressBus, setAddressBus] = useState("")
  useEffect(() => {
    setAddressBus(address)
  }, [address])
  return (
    <Row>
      <Col className='col-md-auto mb-2'>
        <Persona img={avatar} />
      </Col>
      <Col className='col-md-auto my-2'>
        <span>
          <strong className='my-2'>{addressBus ? addressBus : ""}</strong>
        </span>
        <div className='mt-2'>
          <Raiting value={rating} />
        </div>
      </Col>
    </Row>
  )
}

export default BusinessInfo
