import React from "react"
import { Row, Col } from "react-bootstrap"
import { Persona } from "../../../../components"

const UserInfo = ({ avatar, name, member }) => {
  const formatDate = (date) => {
    const td = new Date(date)
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(td)
    return formatedDate
  }
  const dateJoined = formatDate(member)
  return (
    <Row>
      <Col className='col-md-auto mb-2'>
        <Persona img={avatar} />
      </Col>
      <Col className='col-md-auto my-2'>
        <Row>
          <strong className='my-2'>{name}</strong>
        </Row>
        <Row>
          <div style={{ fontSize: "0.8rem" }}>
            <strong className='my-2'>{`Member since: ${dateJoined}`}</strong>
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default UserInfo
