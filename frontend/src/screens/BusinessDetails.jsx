import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Stack,
  Table,
  Modal,
  Carousel,
  ListGroup,
} from "react-bootstrap"

import DatePicker from "react-datepicker"
// import GoogleMapReact from "google-map-react"

import { listServiceDetails, makeAppointment } from "../actions/serviceActions"
import {
  Raiting,
  Loader,
  Message,
  Persona,
  ServicesTable,
  MapContainer,
} from "../components"
import {
  hoursHelper,
  addDaysOffCalendar,
  pickHoursHelper,
} from "../components/Utils.js"

const BusinessDetails = () => {
  //const work with ident sertvice
  const { category } = useParams()
  const { id } = useParams()

  //state for location
  const [disableButton, setDisableButton] = useState({
    left: true,
    right: false,
  })

  const [idLocation, setIdLocation] = useState(0)
  // state for modal
  const [show, setShow] = useState(false)
  const [daysOff, setDaysOff] = useState([0, 1])
  const [dateText, setDateText] = useState("")

  //calendar
  const [startDate, setStartDate] = useState(new Date())
  const [serviceHFD, setServiceHFD] = useState(0)
  const [serviceHour, setServiceHour] = useState(0)
  const [serviceHour24, setServiceHour24] = useState(0)
  const [serviceMin, setServiceMin] = useState(0)
  // //schedule const
  const [schServices, setSchServices] = useState([])
  const [schLocation, setSchLocation] = useState({})

  //declaration of dispatch
  const dispatch = useDispatch()

  //slice service
  const { loading, error, service } = useSelector(
    (state) => state.serviceDetails
  )
  //slice userinfo
  const userLogin = useSelector((state) => state.userLogin)
  const { loading: ulLoading, error: ulError, userInfo } = userLogin

  //browser navigation
  const history = useNavigate()

  //load service
  useEffect(() => {
    dispatch(listServiceDetails(id, category))
  }, [])

  // work with modal
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // handler address change
  const handlAddr = (p) => {
    if (p === "right") {
      setIdLocation(idLocation + 1)
      if (idLocation + 1 === service.locations.length - 1) {
        setDisableButton({ left: false, right: true })
      }
    } else {
      setIdLocation(idLocation - 1)
      if (idLocation - 1 === 0) {
        setDisableButton({ left: true, right: false })
      }
    }
  }

  //handler get day
  const choseDayHandler = (date) => {
    setStartDate(date)
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    setDateText(new Intl.DateTimeFormat("en-US", options).format(date))
  }

  // //click location handler
  const locationIdHandler = (loc) => {
    setSchLocation(loc)
    setDaysOff([])
    const getDaysOff = service.schedule.find(
      (x) => x.location.address === loc.address
    )
    const arrDOFF = getDaysOff.daysoff.daysOff
    let fg = []
    for (let i = 0; i < arrDOFF.length; i++) {
      if (arrDOFF[i] === "Monday") {
        fg.push(1)
      } else if (arrDOFF[i] === "Tuesday") {
        fg.push(2)
      } else if (arrDOFF[i] === "Wednesday") {
        fg.push(3)
      } else if (arrDOFF[i] === "Thursday") {
        fg.push(4)
      } else if (arrDOFF[i] === "Friday") {
        fg.push(5)
      } else if (arrDOFF[i] === "Saturday") {
        fg.push(6)
      } else if (arrDOFF[i] === "Sunday") {
        fg.push(0)
      }
    }
    setDaysOff(fg)
  }
  let location = []
  let imagesGlr = []
  let servicesList = []
  //create location array
  if (service !== undefined) {
    if (Object.keys(service).length !== 0) {
      location = service.locations.map((s) => s)
      location = service.locations
      if (location.length < 2) {
        setDisableButton({ left: true, right: true })
      }
      servicesList = service.services
      imagesGlr = service.gallery.map((s) => s)
      servicesList = service.services.map((s) => s)
    }
  }
  //check services
  const checkScheduleServicesId = (id) => {
    return schServices.find((x) => x._id === id)
  }
  //click services handler
  const handlerScheduleServicesId = (ser) => {
    if (schServices.find((x) => x._id === ser._id)) {
      const newArr = schServices.filter((i) => {
        return i._id !== ser._id
      })
      setSchServices(newArr)
    } else {
      setSchServices((s) => [...s, ser])
    }
  }

  // pickhours
  const clickPickHoursHandler = (numH) => {
    setServiceHour24(numH)
    if (numH < 12) {
      setServiceHour(numH)
      setServiceHFD(1)
    } else if (numH === 12) {
      setServiceHour(12)
      setServiceHFD(2)
    } else {
      setServiceHour(numH - 12)
      setServiceHFD(2)
    }
  }

  // const defaultProps = {
  //   center: {
  //     lat: 34.87542563989993,
  //     lng: -88.56323787109157,
  //   },
  //   zoom: 11,
  // }

  //handle appointment function
  const handleAppointment = () => {
    startDate.setHours(serviceHour24)
    startDate.setMinutes(serviceMin)

    if (
      userInfo._id !== undefined &&
      service._id !== undefined &&
      schServices.length !== 0 &&
      Object.keys(schLocation).length !== 0
    ) {
      console.log("valid")
      dispatch(
        makeAppointment(
          userInfo._id,
          service._id,
          schServices,
          schLocation,
          startDate
        )
      )
      setShow(false)
    } else {
      return
    }
  }

  const scheduleHandler = () => {
    if (!userInfo) {
      history("/signin/user")
    } else {
      setShow(true)
    }
  }
  //main return
  return (
    <div style={{ background: "white", color: "black" }}>
      <Container>
        <Stack direction='vertical' className='px-3'>
          {error && <Message>{error}</Message>}
          {ulError && <Message>{error}</Message>}
          {loading && <Loader />}
          {ulLoading && <Loader />}
          <Row>
            <Col lg={6} md={5} sm={12} className='mt-5'>
              <Row>
                <Col lg={2} md={4} sm={12}>
                  <Persona
                    img={service !== undefined ? service.avatar.path : ""}
                    letter={service !== undefined ? service.businessName : ""}
                  />
                </Col>
                <Col lg={10} md={8} sm={12} className='float-start'>
                  <h4 className='font-weight-bold text-dark'>
                    {service !== undefined ? service.businessName : ""}
                  </h4>
                  <div className='d-flex flex-row gap-2'>
                    <i className='fa-solid fa-location-dot'></i>
                    <h6 className='font-weight-normal text-dark'>
                      {location.length > 0 && location[idLocation].address}
                    </h6>
                  </div>
                  <div>
                    <Raiting
                      value={service !== undefined ? service.rating : 0}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col lg={8} md={8} sm={12}>
              <Carousel>
                {imagesGlr.length > 0 &&
                  imagesGlr.map((i) => (
                    <Carousel.Item
                      key={i._id}
                      className='text-center '
                      style={{
                        maxHeight: "30rem",
                        background: "gray",
                      }}
                    >
                      <Image
                        className='d-block img-fluid w-100 rounded'
                        src={i.path}
                        alt='galery'
                        style={{
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </Col>
            <Col lg={4} md={4} sm={12} className='border my-2'>
              <Stack direction='vertical' className='h-100'>
                <Row className='my-2'>
                  <Col
                    as='button'
                    lg={1}
                    md={1}
                    sm={1}
                    disabled={disableButton.left}
                    className='text-center align-middle border-0 bg-white'
                    onClick={() => handlAddr("left")}
                  >
                    <i className='fa-solid fa-angle-left'></i>
                  </Col>
                  <Col lg={10} md={10} sm={10}>
                    {location.length > 0 && location[idLocation].address}
                  </Col>
                  <Col
                    as='button'
                    lg={1}
                    md={1}
                    sm={1}
                    className='text-center align-middle border-0 bg-white'
                    disabled={disableButton.right}
                    onClick={() => handlAddr("right")}
                  >
                    <i className='fa-solid fa-angle-right'></i>
                  </Col>
                </Row>
                <hr className='m-0' />
                <div className='h-100 d-flex flex-column my-1 gap-1'>
                  {location.length > 0 &&
                    hoursHelper(location[idLocation].address, service)}
                  {/*<div className='map-business-detail h-100 p-1'>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyDXSd1rUGhNijPa_Sbi1Qc5VqCBwsUyXWY",
                      }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                    >
                      <div
                        lat={34.87542563989993}
                        lng={-88.56323787109157}
                        className='d-flex flex-row'
                        style={{ color: "orange", fontSize: "1rem" }}
                      >
                        <i className='bi bi-geo-alt-fill '></i>
                        Business
                      </div>
                    </GoogleMapReact>
                  </div>*/}
                  <Button
                    variant='dark'
                    className='mt-auto'
                    onClick={scheduleHandler}
                  >
                    Schedule an Appointment
                    <i className='bi bi-alarm-fill ms-2'></i>
                  </Button>
                </div>
              </Stack>
            </Col>
          </Row>
          <div className='border p-3'>
            <h5>About Us</h5>
            {service !== undefined
              ? service.details
                  .split("/n")
                  .map((item, i) => <p key={i}>{item}</p>)
              : ""}
          </div>
          <div className='mb-5'>
            <h5>Services</h5>
            {service !== undefined ? <ServicesTable services={service} /> : ""}
          </div>
        </Stack>
      </Container>
      {/* *******Schedule an appointment modal****** */}?
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        centered
        size='xl'
        className='modal-dialog-scrollable text-dark'
      >
        {/* *******Header******* */}
        <Modal.Header closeButton className='btn-close-white border-0'>
          <Modal.Title as='h6' style={{ color: "#ffffff" }}>
            Schedule an Appointment
          </Modal.Title>
        </Modal.Header>
        {/* *******Body******* */}
        <Modal.Body className='text-dark d-flex flex-column min-vh-100'>
          {/* user info */}
          {userInfo && (
            <Row>
              <Col className='col-md-auto mb-2'>
                <Persona
                  img={userInfo.path}
                  letter={userInfo !== undefined ? userInfo.name : ""}
                />
              </Col>
              <Col className='col-md-auto my-2'>
                <span>
                  <strong className='my-2'>{userInfo.name}</strong>
                </span>
              </Col>
            </Row>
          )}
          {/* business info */}
          <Row className='border-top justify-content-start'>
            <Col className='col-md-auto'>
              <Persona
                img={service !== undefined ? service.avatar.path : ""}
                letter={service !== undefined ? service.businessName : ""}
              />
            </Col>
            <Col className='col-md-auto my-2'>
              <span>
                <strong className='my-2'>
                  {service !== undefined ? service.businessName : ""}
                </strong>
                <div className='my-2'>
                  <Raiting
                    value={service !== undefined ? service.rating : ""}
                  />
                </div>
              </span>
            </Col>
          </Row>
          {/* chose location */}
          <Row className='border-top m-3'>
            <h6 className='text-dark mt-3'>Choose location</h6>
            <ListGroup as='ul'>
              {location.map((l) => (
                <ListGroup.Item
                  as='li'
                  key={l._id}
                  active={l._id === schLocation._id}
                  className='schedule-listgroup mt-2 border'
                  onClick={() => locationIdHandler(l)}
                >
                  {l._id === schLocation._id && (
                    <i
                      className='bi bi-check-circle-fill me-3 '
                      style={{ color: "orange" }}
                    ></i>
                  )}
                  {l.address}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
          {/* chose service */}
          <Row className='border-top m-3'>
            <h6 className='text-dark'>Choose Your Services</h6>
            <Row>
              <Col lg={4} md={4} sm={4} className='text-muted'>
                Name of Service
              </Col>
              <Col lg={4} md={4} sm={4} className='text-muted'>
                Duration
              </Col>
              <Col lg={4} md={4} sm={4} className='text-muted'>
                Price
              </Col>
            </Row>

            <ListGroup as='ul'>
              {servicesList.map((l) => (
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
              ))}
            </ListGroup>
          </Row>
          {/* data select */}
          <Row>
            <DatePicker
              selected={startDate}
              onChange={(date) => choseDayHandler(date)}
              minDate={new Date()}
              filterDate={(day) => {
                const dd = addDaysOffCalendar(day, daysOff)
                return dd
              }}
              inline
            />
          </Row>
          <Row className='my-3 text-center'>
            <strong>{dateText}</strong>
          </Row>
          <Row className='m-0'>
            {location.length > 0 && (
              <Row className='m-1'>
                {pickHoursHelper(
                  location[idLocation].address,
                  service
                ).hoursArr.map((h, i) => (
                  <Col
                    xl={2}
                    md={2}
                    sm={6}
                    key={i}
                    className={
                      serviceHour24 !==
                      pickHoursHelper(location[idLocation].address, service)
                        .hoursArr24[i]
                        ? "border rounded bd-hours"
                        : "border rounded bd-hours active"
                    }
                    onClick={() =>
                      clickPickHoursHandler(
                        pickHoursHelper(location[idLocation].address, service)
                          .hoursArr24[i]
                      )
                    }
                  >
                    {h}
                  </Col>
                ))}
              </Row>
            )}
            <Row className='m-1'>
              <Col
                className={
                  serviceMin === 0
                    ? "border rounded bd-hours active"
                    : "border rounded bd-hours"
                }
                onClick={() => {
                  setServiceMin(0)
                }}
              >{`${serviceHour}:00${serviceHFD === 1 ? "AM" : "PM"}`}</Col>
              <Col
                className={
                  serviceMin === 15
                    ? "border rounded bd-hours active"
                    : "border rounded bd-hours"
                }
                onClick={() => {
                  setServiceMin(15)
                }}
              >{`${serviceHour}:15${serviceHFD === 1 ? "AM" : "PM"}`}</Col>
              <Col
                className={
                  serviceMin === 30
                    ? "border rounded bd-hours active"
                    : "border rounded bd-hours"
                }
                onClick={() => {
                  setServiceMin(30)
                }}
              >{`${serviceHour}:30${serviceHFD === 1 ? "AM" : "PM"}`}</Col>
              <Col
                className={
                  serviceMin === 45
                    ? "border rounded bd-hours active"
                    : "border rounded bd-hours"
                }
                onClick={() => {
                  setServiceMin(45)
                }}
              >{`${serviceHour}:45${serviceHFD === 1 ? "AM" : "PM"}`}</Col>
            </Row>
          </Row>
          {/* summury */}
          <Row className='m-0'>
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
          </Row>
        </Modal.Body>
        {/* *******Footer****** */}
        <Modal.Footer as='div' className='mt-auto d-flex justify-content-start'>
          <Button
            className='float-left shadow border-0'
            variant='secondary  '
            onClick={handleAppointment}
            style={{
              background: "transparent",
              color: "green",
              fontWeight: "600",
            }}
          >
            Schedule Appointment
            <i className='bi bi-alarm-fill ms-2' style={{ color: "green" }}></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default BusinessDetails
