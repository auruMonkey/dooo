import React, { useEffect } from "react"
import { Container, Col, Row } from "react-bootstrap"
import { Service, ServiceList } from "../../components"

const ShowCategory = ({ listView, services, setServiceLenght }) => {
  useEffect(() => {
    if (services !== undefined) {
      setServiceLenght(() => services.businesses.length)
    }
  }, [])
  return (
    <Container>
      {services !== undefined && services !== null ? (
        !listView ? (
          <Row>
            {services.businesses.map((service, index) => (
              <Col key={index} sm={12} md={6} lg={4} xlg={3}>
                <Service service={service} />
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <Col sm={12} md={12} lg={6} xlg={6}>
              {services.businesses !== undefined
                ? services.businesses.map((service) => (
                    <Col key={service._id} sm={12} md={12} lg={12} xlg={12}>
                      <ServiceList service={service} />
                    </Col>
                  ))
                : ""}
            </Col>

            <Col sm={12} md={12} lg={6} xlg={6}></Col>
          </Row>
        )
      ) : (
        ""
      )}
    </Container>
  )
}

export default ShowCategory
