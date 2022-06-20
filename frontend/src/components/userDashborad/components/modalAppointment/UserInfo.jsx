import React from "react"
import { Col, Row } from "react-bootstrap"
import { Persona } from "../../../../components"

const UserInfo = ({ avatar, name }) => {
  return (
    <Row>
      <Col className='col-md-auto mb-2'>
        <Persona img={avatar} />
      </Col>
      <Col className='col-md-auto my-2'>
        <span>
          <strong className='my-2'>{name}</strong>
        </span>
      </Col>
    </Row>
  )
}

export default UserInfo
