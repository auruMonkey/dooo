import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Col, Row, Button, Modal, Form, ListGroup } from "react-bootstrap"
import { Loader } from "../../components"
import { updateScheduleBusiness } from "../../actions/businessActions"
const BusinessSchedule = () => {
  // *********** work with modal window
  const [showModal, setShowModal] = useState(false)
  const [openSch, setOpenSch] = useState()
  const [scheduleId, setScheduleId] = useState()
  const [locationSch, setLocationSch] = useState({})
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  // *********** check days off
  const [daysOff, setDaysOff] = useState([])
  const defaultH = {
    starthour: "0",
    startmin: "00",
    starttd: "AM",
    endhour: "0",
    endmin: "00",
    endtd: "AM",
  }
  // *********** for select schedule
  const [shift, setShift] = useState({ defaultH })
  const [isLunch, setIsLunch] = useState(false)
  const [lunch, setLunch] = useState({ defaultH })
  const dispatch = useDispatch()
  const hours = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]
  const min = ["00", "15", "30", "45"]
  const td = ["AM", "PM"]
  const dw = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  // *********** slicer for business information
  const { businessInfo, loading } = useSelector((state) => state.businessLogin)
  // *********** set schedule handler
  const setScheduleHandler = () => {
    dispatch(
      updateScheduleBusiness(
        businessInfo._id,
        scheduleId,
        shift,
        lunch,
        daysOff,
        locationSch
      )
    )
    setShift(defaultH)
    setLunch(defaultH)
    setDaysOff([])
    setScheduleId()
    setOpenSch()
    setLocationSch()
    setIsLunch(false)
    handleClose()
  }

  const checkDaysOff = (day) => {
    if (daysOff) {
      return daysOff.includes(day)
    }
  }
  // *********** open modal schedule handler
  const openHandle = (id) => {
    const schedule = businessInfo.schedule.find((x) => x._id === id)
    if (schedule.daysoff) {
      schedule.daysoff.daysOff.map((s) =>
        setDaysOff((oldArray) => [...oldArray, s])
      )
    }
    if (schedule.start) {
      setShift((prev) => ({
        ...prev,
        starthour: schedule.start.hours,
        startmin: schedule.start.minutes,
        starttd: schedule.start.td,
      }))
    } else {
      setShift((prev) => ({
        ...prev,
        starthour: "0",
        startmin: "00",
        starttd: "AM",
      }))
    }
    if (schedule.end) {
      setShift((prev) => ({
        ...prev,
        endhour: schedule.end.hours,
        endmin: schedule.end.minutes,
        endtd: schedule.end.td,
      }))
    } else {
      setShift((prev) => ({
        ...prev,
        endhour: "0",
        endmin: "00",
        endtd: "AM",
      }))
    }
    if (schedule.lunch) {
      setIsLunch(true)
      if (schedule.lunch.end) {
        setLunch((prev) => ({
          ...prev,
          endhour: schedule.lunch.end.hours,
          endmin: schedule.lunch.end.minutes,
          endtd: schedule.lunch.end.td,
        }))
      } else {
        setLunch((prev) => ({
          ...prev,
          endhour: "0",
          endmin: "00",
          endtd: "AM",
        }))
      }
      if (schedule.lunch.start) {
        setLunch((prev) => ({
          ...prev,
          starthour: schedule.lunch.start.hours,
          startmin: schedule.lunch.start.minutes,
          starttd: schedule.lunch.start.td,
        }))
      } else {
        setLunch((prev) => ({
          ...prev,
          starthour: "0",
          startmin: "00",
          starttd: "AM",
        }))
      }
    }

    setScheduleId(id)
    setOpenSch(schedule)
    setLocationSch(schedule.location)

    handleShow()
  }

  // *********** add days off handler
  const daysOffHandler = (day) => {
    if (!daysOff.includes(day)) {
      // daysOff.push(day)
      setDaysOff((oldArray) => [...oldArray, day])
    } else {
      setDaysOff(daysOff.filter((item) => item !== day))
      // daysOff.splice(daysOff.indexOf(day), 1)
    }
  }
  const handlerClose = () => {
    setShift(defaultH)
    setLunch(defaultH)
    setDaysOff([])
    setScheduleId()
    setOpenSch()
    setLocationSch()
    setIsLunch(false)
    handleClose()
  }
  return (
    <>
      {/* *******Main Content******* */}
      <Row>
        <h6 className='text-dark mb-3'>My Schedule</h6>
      </Row>
      {businessInfo ? (
        <Row>
          {loading && <Loader />}
          {businessInfo.schedule.map((s, index) => (
            <Col
              lg={5}
              md={5}
              xs={12}
              className='border rounded mx-3 my-3'
              key={index}
            >
              <div className='py-3'>
                <i
                  className='bi bi-geo-alt-fill me-2'
                  style={{ color: "orange" }}
                ></i>
                <strong style={{ fontSize: "0.85rem" }}>
                  {s.location.address}
                </strong>
              </div>
              <hr />
              {s.start && (
                <div>
                  <span>{`Open: ${s.start.hours}:${s.start.minutes} ${s.start.td}`}</span>
                </div>
              )}
              {s.end && (
                <div>
                  <span>{`Close: ${s.end.hours}:${s.end.minutes} ${s.end.td}`}</span>
                </div>
              )}
              {s.lunch && (
                <div>
                  <span>{`Lunch: ${s.lunch.start.hours}:${
                    s.lunch.start.minutes ? s.lunch.start.minutes : "00"
                  } ${s.lunch.start.td} to ${s.lunch.end.hours}:${
                    s.lunch.end.minutes
                  } ${s.lunch.end.td}`}</span>
                </div>
              )}
              <hr />

              {s.daysoff && (
                <>
                  <div>
                    <p>
                      <strong>Days Off</strong>
                    </p>
                    {s.daysoff.daysOff.map((i) => (
                      <span className='border rounded p-2 me-2'>{`Off ${i} `}</span>
                    ))}
                  </div>
                  <hr />
                </>
              )}
              <div className='text-end'>
                <Button
                  type='button'
                  className='shadow p-2 rounded text-end my-2'
                  style={{
                    color: "#415da5",
                    fontWeight: "500",
                    backgroundColor: "white",
                    border: "none",
                    width: "auto",
                  }}
                  onClick={() => openHandle(s._id)}
                >
                  Manage Schedule
                  <i className='bi bi-three-dots-vertical ms-2'></i>
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        ""
      )}
      {/* *******Modal window ******* */}
      <Modal
        show={showModal}
        onHide={handlerClose}
        backdrop='static'
        keyboard={false}
        centered
        size='lg'
      >
        <div className='bg-white'>
          <Modal.Header closeButton>
            <Modal.Title>Set Schedule</Modal.Title>
          </Modal.Header>
          <hr />
          {openSch ? (
            <Modal.Body className='m-0 p-0'>
              <div className='px-3 py-2'>
                <i
                  className='bi bi-geo-alt-fill me-2'
                  style={{ color: "orange" }}
                ></i>
                {openSch.location.address}
              </div>
              <hr className='mb-0' />
              {/* *******Modal Start Shift ******* */}
              <Row className='w-100 m-0 '>
                <Col lg={6} md={5} xs={12} className='border-end m-0 p-3 '>
                  <Row>
                    <span>Shift Start</span>
                    <Col className='w-auto'>
                      <Form.Group className='mt-3'>
                        <Form.Select
                          value={shift.starthour}
                          onChange={(e) =>
                            setShift((prev) => ({
                              ...prev,
                              starthour: e.target.value,
                            }))
                          }
                        >
                          {hours.map((i, index) => (
                            <option key={index} value={i}>
                              {i}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className='w-auto'>
                      <Form.Group className='mt-3'>
                        <Form.Select
                          value={
                            shift.startmin !== "00" ? shift.startmin : "00"
                          }
                          onChange={(e) =>
                            setShift((prev) => ({
                              ...prev,
                              startmin: e.target.value,
                            }))
                          }
                        >
                          {min.map((i, index) => (
                            <option key={index} value={i}>
                              {i}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className='w-auto'>
                      <Form.Group className='mt-3'>
                        <Form.Select
                          value={shift.starttd ? shift.starttd : td[0]}
                          onChange={(e) =>
                            setShift((prev) => ({
                              ...prev,
                              starttd: e.target.value,
                            }))
                          }
                        >
                          {td.map((i, index) => (
                            <option key={index} value={i}>
                              {i}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={5} xs={12} className='border-start m-0  p-3'>
                  <Row>
                    <span>Shift End</span>
                    <Col className='w-auto'>
                      <Form.Group className='mt-3'>
                        <Form.Select
                          value={shift.endhour !== "0" ? shift.endhour : "0"}
                          onChange={(e) =>
                            setShift((prev) => ({
                              ...prev,
                              endhour: e.target.value,
                            }))
                          }
                        >
                          {hours.map((i, index) => (
                            <option key={index} value={i}>
                              {i}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className='w-auto'>
                      <Form.Group className='mt-3'>
                        <Form.Select
                          value={shift.endmin !== "00" ? shift.endmin : "00"}
                          onChange={(e) =>
                            setShift((prev) => ({
                              ...prev,
                              endmin: e.target.value,
                            }))
                          }
                        >
                          {min.map((i, index) => (
                            <option key={index} value={i}>
                              {i}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className='w-auto'>
                      <Form.Group className='mt-3'>
                        <Form.Select
                          value={shift.endtd ? shift.endtd : td[0]}
                          onChange={(e) =>
                            setShift((prev) => ({
                              ...prev,
                              endtd: e.target.value,
                            }))
                          }
                        >
                          {td.map((i, index) => (
                            <option key={index} value={i}>
                              {i}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr className='mt-0' />
              <Row>
                <div className='form-check p-2'>
                  <input
                    className='schedule-form-check-input form-check-input ms-4'
                    type='checkbox'
                    checked={isLunch}
                    name='flexRadioDefault'
                    id='addlunch'
                    onClick={() => setIsLunch(!isLunch)}
                  />
                  <label className='form-check-label ms-2' htmlFor='addlunch'>
                    Add Lunch?
                  </label>
                </div>
              </Row>
              <hr className='m-0' />
              {isLunch && (
                <>
                  <Row className='w-100 m-0'>
                    <Col lg={6} md={5} xs={12} className='border-end m-0 p-3 '>
                      <Row>
                        <span>Lunch Start</span>
                        <Col className='w-auto'>
                          <Form.Group className='mt-3'>
                            <Form.Select
                              value={lunch.starthour}
                              onChange={(e) =>
                                setLunch((prev) => ({
                                  ...prev,
                                  starthour: e.target.value,
                                }))
                              }
                            >
                              {hours.map((i, index) => (
                                <option key={index} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col className='w-auto'>
                          <Form.Group className='mt-3'>
                            <Form.Select
                              value={
                                lunch.startmin !== "00" ? lunch.startmin : "00"
                              }
                              onChange={(e) =>
                                setLunch((prev) => ({
                                  ...prev,
                                  startmin: e.target.value,
                                }))
                              }
                            >
                              {min.map((i, index) => (
                                <option key={index} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col className='w-auto'>
                          <Form.Group className='mt-3'>
                            <Form.Select
                              value={lunch.starttd ? lunch.starttd : td[0]}
                              onChange={(e) =>
                                setLunch((prev) => ({
                                  ...prev,
                                  starttd: e.target.value,
                                }))
                              }
                            >
                              {td.map((i, index) => (
                                <option key={index} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg={6}
                      md={5}
                      xs={12}
                      className='border-start m-0  p-3'
                    >
                      <Row>
                        <span>Lunch End</span>
                        <Col className='w-auto'>
                          <Form.Group className='mt-3'>
                            <Form.Select
                              value={
                                lunch.endhour !== "0" ? lunch.endhour : "0"
                              }
                              onChange={(e) =>
                                setLunch((prev) => ({
                                  ...prev,
                                  endhour: e.target.value,
                                }))
                              }
                            >
                              {hours.map((i, index) => (
                                <option key={index} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col className='w-auto'>
                          <Form.Group className='mt-3'>
                            <Form.Select
                              value={
                                lunch.endmin !== "00" ? lunch.endmin : "00"
                              }
                              onChange={(e) =>
                                setLunch((prev) => ({
                                  ...prev,
                                  endmin: e.target.value,
                                }))
                              }
                            >
                              {min.map((i, index) => (
                                <option key={index} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col className='w-auto'>
                          <Form.Group className='mt-3'>
                            <Form.Select
                              value={lunch.endtd ? lunch.endtd : td[0]}
                              onChange={(e) =>
                                setLunch((prev) => ({
                                  ...prev,
                                  endtd: e.target.value,
                                }))
                              }
                            >
                              {td.map((i, index) => (
                                <option key={index} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr className='mt-0' />
                </>
              )}
              <Row className='m-0  '>
                <ListGroup horizontal>
                  <Row className='m-0 p-0'>
                    {dw.map((d, index) => (
                      <Col lg={1} className='w-auto mx-0' key={index}>
                        <ListGroup.Item
                          as='li'
                          active={checkDaysOff(d)}
                          className='schedule-listgroup my-2 border  rounded p-2'
                          onClick={() => daysOffHandler(d)}
                        >
                          {checkDaysOff(d) && (
                            <i
                              className='bi bi-check-circle-fill me-1 '
                              style={{ color: "orange" }}
                            ></i>
                          )}
                          <span style={{ fontSize: "0.8rem" }}>{d}</span>
                        </ListGroup.Item>
                      </Col>
                    ))}
                  </Row>
                </ListGroup>
                {/* </div> */}
              </Row>
              <hr className='mt-0' />
            </Modal.Body>
          ) : (
            ""
          )}
          <Modal.Footer
            as='div'
            className='mt-auto d-flex justify-content-start'
          >
            <Button
              type='button'
              className='shadow p-2 rounded'
              style={{
                color: "#3b8543",
                fontWeight: "bold",
                backgroundColor: "white",
                border: "none",
                width: "auto",
              }}
              onClick={setScheduleHandler}
            >
              Save Schedule
              <i className='fa-solid fa-floppy-disk ms-2'></i>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default BusinessSchedule
