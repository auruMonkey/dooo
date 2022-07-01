import { useEffect, useState } from "react"
import { Row, Col, ListGroup } from "react-bootstrap"
import { chappmstr } from "../../../strings"

const ChooseService = ({
  servicesB,
  servicesA,
  newServicesHandle,
  isEditApp,
}) => {
  //main state
  const [checkedServices, setCheckedServices] = useState()

  useEffect(() => {
    newServicesHandle(servicesA)
    setCheckedServices(servicesA)
  }, [])

  const checkScheduleServicesId = (name) => {
    if (checkedServices !== undefined) {
      const dd = checkedServices.find((o) => o.name === name)
      return dd ? true : false
    }
  }

  //click services handler
  const handlerScheduleServicesId = (ser) => {
    if (checkedServices.find((x) => x.name === ser.name)) {
      const newArr = checkedServices.filter((i) => {
        return i.name !== ser.name
      })
      setCheckedServices(newArr)
      newServicesHandle(newArr)
    } else {
      setCheckedServices((s) => [...s, ser])
      newServicesHandle((s) => [...s, ser])
    }
  }

  return (
    <Row className=' mt-3 p-0'>
      <h6 className='text-dark'>{chappmstr[2]}</h6>
      <Row>
        <Col lg={4} md={4} sm={4} className='text-muted'>
          {chappmstr[3]}
        </Col>
        <Col lg={4} md={4} sm={4} className='text-muted'>
          {chappmstr[4]}
        </Col>
        <Col lg={4} md={4} sm={4} className='text-muted'>
          {chappmstr[5]}
        </Col>
      </Row>

      <ListGroup as='ul'>
        {servicesB.length > 0
          ? servicesB.map((l) => (
              <ListGroup.Item
                as='li'
                key={l._id}
                active={checkScheduleServicesId(l.name)}
                className={
                  isEditApp
                    ? "schedule-listgroup mt-2 border"
                    : "schedule-listgroup mt-2 border disabled"
                }
                onClick={() => handlerScheduleServicesId(l)}
              >
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    {checkScheduleServicesId(l.name) && (
                      <i
                        className='bi bi-check-circle-fill me-3 '
                        style={{ color: "orange" }}
                      ></i>
                    )}
                    {l.name}
                  </Col>
                  <Col lg={4} md={4} sm={4} className='text-muted'>
                    {l.duration}
                  </Col>
                  <Col lg={4} md={4} sm={4} className='text-muted'>
                    {l.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          : ""}
      </ListGroup>
    </Row>
  )
}

export default ChooseService
