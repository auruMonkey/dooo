import React from "react"
import { Col, Row } from "react-bootstrap"
import { bamstr } from "../../../strings"

const Services = ({ services }) => {
  return (
    <>
      <h6 className='text-dark mx-3'>{bamstr[1]}</h6>
      <Row className='mx-3 mb-3'>
        <Col xl={1} md={1} xs={12}></Col>
        <Col xl={5} md={1} xs={12}>
          <h6 className='text-muted'>{bamstr[3]}</h6>
        </Col>
        <Col xl={3} md={1} xs={12}>
          <h6 className='text-muted'>{bamstr[4]}</h6>
        </Col>
        <Col xl={3} md={1} xs={12}>
          <h6 className='text-muted'>{bamstr[5]}</h6>
        </Col>
      </Row>
      {services.map((s) => (
        <Row
          key={s.name}
          className='schedule-listgroup mx-3 mb-3 p-3 border rounded'
        >
          <Col xl={1} md={1} xs={1}>
            <i
              className='bi bi-check-circle-fill me-3 '
              style={{ color: "orange" }}
            ></i>
          </Col>
          <Col xl={5} md={1} xs={10}>
            {s.name}
          </Col>
          <Col xl={3} md={1} xs={12}>
            {s.price}
          </Col>
          <Col xl={3} md={1} xs={12}>
            {s.duration}
          </Col>
        </Row>
      ))}
    </>
  )
}

export default Services
