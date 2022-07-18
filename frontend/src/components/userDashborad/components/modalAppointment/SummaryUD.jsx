import React from "react"
import { useEffect, useState } from "react"
import { Row, ListGroup, Col } from "react-bootstrap"
import { bdstr } from "../../../strings"

const SummaryUD = ({ name, location, services, apptDateTime }) => {
  const [appt, setAppt] = useState()

  useEffect(() => {
    setAppt(apptDateTime)
  }, [apptDateTime])

  const formatDate = (date) => {
    const td = new Date(date)
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(td)
    return formatedDate
  }
  return (
    <Row className='m-0'>
      <h6 className='text-black'>{bdstr[2]}</h6>
      <ListGroup className='border-0'>
        {/* ******Bussiness Name****** */}
        <ListGroup.Item className='bg-white border-0'>
          <span className='text-muted m-2'>{bdstr[3]}</span>
          <Row>
            <Col>
              <i
                className='bi bi-person-fill me-2'
                style={{ color: "orange" }}
              ></i>
              <strong className='text-dark'>{name}</strong>
            </Col>
          </Row>
        </ListGroup.Item>
        {/* ******Location****** */}
        <ListGroup.Item className='bg-white border-0'>
          <span className='text-muted m-2'>{bdstr[4]}</span>
          <Row>
            {location !== undefined ? (
              <strong className='text-dark'>{location.address}</strong>
            ) : (
              <strong className='text-warning'>{bdstr[5]}</strong>
            )}
          </Row>
        </ListGroup.Item>
        {/* ******Services****** */}
        <ListGroup.Item className='bg-white border-0'>
          <span className='text-muted m-2'>{bdstr[10]}</span>
          <Row>
            {services.length > 0 ? (
              <ListGroup>
                {services.map((s) => (
                  <ListGroup.Item key={s.name} className='bg-white border-0'>
                    {
                      <>
                        <i
                          className='bi  bi-circle-fill me-2'
                          style={{ color: "orange" }}
                        ></i>
                        <strong className='text-dark'>{s.name}</strong>
                      </>
                    }
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <strong className='text-warning'>{bdstr[11]}</strong>
            )}
          </Row>
        </ListGroup.Item>
        {/* ******Date Time****** */}
        <ListGroup.Item className='bg-white border-0'>
          <span className='text-muted m-2'>{bdstr[12]}</span>
          <Row>
            {appt !== undefined ? (
              <strong className='text-dark'>{formatDate(appt)}</strong>
            ) : (
              <strong className='text-warning'>{bdstr[13]}</strong>
            )}
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Row>
  )
}

export default SummaryUD
