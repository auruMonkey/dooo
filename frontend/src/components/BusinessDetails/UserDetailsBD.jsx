import React from "react"
import { Row, Col } from "react-bootstrap"
import { Persona } from "../../components"

const UserDetailsBD = ({ avatar, name }) => {
  return (
    <Row>
      <Col className='col-md-auto mb-2'>
        <Persona img={avatar} />
      </Col>
      <Col className='col-md-auto my-auto'>
        <span>
          <strong className='my-2'>{name}</strong>
        </span>
      </Col>
    </Row>
  )
}

export default UserDetailsBD
