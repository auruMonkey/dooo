import { useEffect, useState } from "react"
import { Row, Col, ListGroup } from "react-bootstrap"
import { chappmstr } from "../../../strings"

const ChooseService = ({
  servicesB,
  servicesA,
  setNewAppointment,
  appointmentInfo,
}) => {
  //main state
  const [checkedServices, setCheckedServices] = useState(servicesA)

  const checkScheduleServicesId = (id) => {
    const dd = checkedServices.find((o) => o._id === id)
    return dd ? true : false
  }

  //click services handler
  const handlerScheduleServicesId = (ser) => {
    if (checkedServices.find((x) => x._id === ser._id)) {
      const newArr = checkedServices.filter((i) => {
        return i._id !== ser._id
      })
      setCheckedServices(newArr)
    } else {
      setCheckedServices((s) => [...s, ser])
    }
  }
  useEffect(() => {
    let nai = appointmentInfo
    nai.services = checkedServices
    setNewAppointment(nai)
  }, [checkedServices])

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
                active={checkScheduleServicesId(l._id)}
                className='schedule-listgroup mt-2 border'
                onClick={() => handlerScheduleServicesId(l)}
              >
                <Row>
                  <Col lg={4} md={4} sm={4}>
                    {checkScheduleServicesId(l._id) && (
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
