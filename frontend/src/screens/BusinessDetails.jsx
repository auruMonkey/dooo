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
  Carousel,
} from "react-bootstrap"
import { ModalBD } from "../components/BusinessDetails"

// import GoogleMapReact from "google-map-react"

import { listServiceDetails } from "../actions/serviceActions"
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
  const dispatch = useDispatch()
  const [idLocation, setIdLocation] = useState(0)

  //state for location
  const [disableButton, setDisableButton] = useState({
    left: true,
    right: false,
  })

  const [location, setLocation] = useState([])
  const [imagesGlr, setImagesGlr] = useState([])
  const [servicesList, setServicesList] = useState([])
  const [services, setServices] = useState({})
  const [showModal, setShowModal] = useState(false)

  //load service
  useEffect(() => {
    dispatch(listServiceDetails(id, category))
  }, [])
  //slice service
  const { loading, error, service } = useSelector(
    (state) => state.serviceDetails
  )

  useEffect(() => {
    if (service !== undefined) {
      setServices(service)
      setLocation(service.locations.map((s) => s))
      setImagesGlr(service.gallery.map((s) => s))
      setServicesList(service.services.map((s) => s))
      if (service.locations.length < 2) {
        setDisableButton(() => ({ left: true, right: true }))
      }
    }
  }, [service])

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
  const handleCloseModal = () => {
    setShowModal(false)
  }

  // *******state for modal*******
  const [daysOff, setDaysOff] = useState([0, 1])
  const [dateText, setDateText] = useState("")
  const [selectedDate, setSelectedDate] = useState()

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

  //slice userinfo
  const {
    loading: ulLoading,
    error: ulError,
    userInfo,
  } = useSelector((state) => state.userLogin)

  //browser navigation
  const history = useNavigate()

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

  const scheduleHandler = () => {
    if (!userInfo) {
      history("/signin/user")
    } else {
      setShowModal(true)
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
                    hoursHelper(location[idLocation].address, services)}
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
      {/* *******Schedule an appointment modal****** */}
      <ModalBD showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  )
}

export default BusinessDetails
