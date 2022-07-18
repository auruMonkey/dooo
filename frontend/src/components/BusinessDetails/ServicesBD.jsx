import React from "react"
import { ListGroup, Row, Col } from "react-bootstrap"
import { bdstr } from "../strings"

const ServicesBD = ({ services, clickServiceHandler, apptServices }) => {
  const checkService = (id) => {
    if (apptServices.findIndex((s) => s._id === id) > -1) {
      return true
    } else {
      return false
    }
  }

  return (
    <ListGroup as='ul'>
      <ListGroup.Item className='bg-white border-0'>
        <h6 className='text-dark'>{bdstr[6]}</h6>
      </ListGroup.Item>
      <ListGroup.Item className='bg-white border-0'>
        <Row>
          <Col lg={4} md={4} sm={4} className='text-muted'>
            {bdstr[7]}
          </Col>
          <Col lg={4} md={4} sm={4} className='text-muted'>
            {bdstr[8]}
          </Col>
          <Col lg={4} md={4} sm={4} className='text-muted'>
            {bdstr[9]}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item className='bg-white border-0'>
        <ListGroup as='ul'>
          {services.map((s) => (
            <ListGroup.Item
              key={s._id}
              as='li'
              active={checkService(s._id)}
              className='schedule-listgroup mt-2 border'
              onClick={() => clickServiceHandler(s)}
            >
              <Row>
                <Col lg={4} md={4} sm={4} className='text-muted'>
                  <Row>
                    <Col>
                      <span>
                        {checkService(s._id) ? (
                          <i
                            className={"bi bi-check-circle-fill me-3 "}
                            style={{ color: "orange" }}
                          ></i>
                        ) : (
                          ""
                        )}
                        {s.name}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col lg={4} md={4} sm={4} className='text-muted'>
                  {s.duration}
                </Col>
                <Col lg={4} md={4} sm={4} className='text-muted'>
                  {`$${s.price}`}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default ServicesBD
