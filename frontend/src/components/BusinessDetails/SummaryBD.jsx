import React from "react"
import { Row, ListGroup, Col } from "react-bootstrap"
import { bdstr } from "../strings"

const SummaryBD = ({ name, location, services, apptDateTime }) => {
  const formatDate = (date) => {
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
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
            {apptDateTime !== undefined ? (
              <strong className='text-dark'>{formatDate(apptDateTime)}</strong>
            ) : (
              <strong className='text-warning'>{bdstr[13]}</strong>
            )}
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Row>
  )
}

export default SummaryBD

/* <Row className='m-0'>
          <h6 className='text-black'>Summary</h6>
          <div className='d-flex flex-column'>
            <p className='text-muted mt-2'>Business</p>
            <div>
              <i
                className='bi bi-person-fill me-2'
                style={{ color: "orange" }}
              ></i>
              <strong>
                {service !== undefined ? service.businessName : ""}
              </strong>
            </div>
          </div>
          <Row>
            <p className='text-muted mt-2'>Location</p>
            <div>
              {schLocation._id !== 0 ? (
                <>
                  <i
                    className='bi bi-geo-alt-fill me-2'
                    style={{ color: "orange" }}
                  ></i>
                  <strong>{schLocation.address}</strong>
                </>
              ) : (
                <strong style={{ color: "pink" }}>
                  Please choose location
                </strong>
              )}
            </div>
          </Row>
          <Row>
            <p className='text-muted mt-2'>Date & Time</p>
            <div>
              {serviceHFD > 0 && serviceHour > 0 && dateText ? (
                <>
                  <i
                    className='bi bi-alarm-fill me-2'
                    style={{ color: "orange" }}
                  ></i>
                  <strong>{`${dateText} @ ${serviceHour}:${
                    serviceMin === 0 ? "00" : serviceMin
                  }${serviceHFD === 1 ? "AM" : "PM"}`}</strong>
                </>
              ) : (
                <strong style={{ color: "pink" }}>
                  Please choose Date & Time
                </strong>
              )}
            </div>
          </Row>
          <Row>
            <p className='text-muted mt-2'>Serivces</p>
            <div>
              {schServices.length > 0 ? (
                <>
                  <div className='list-group'>
                    {schServices.map((id, i) => (
                      <div
                        key={i}
                        className='list-group-item'
                        style={{
                          background: "white",
                          border: "none",
                          color: "black",
                        }}
                      >
                        <i
                          className='bi  bi-circle-fill me-2'
                          style={{ color: "orange" }}
                        ></i>
                        <strong>{id.name}</strong>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <strong style={{ color: "pink" }}>
                  Please choose services
                </strong>
              )}
            </div>
          </Row>
        </Row> */
