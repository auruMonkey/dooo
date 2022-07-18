import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { listServiceDetails } from "../actions/serviceActions"
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Stack,
  Carousel,
} from "react-bootstrap"
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
import GoogleMapReact from "google-map-react"

const BusinessPreview = ({ googleKey }) => {
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
  const [defaultMap, setDefaultMap] = useState()

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

  useEffect(() => {
    if (location !== undefined) {
      if (location.length > 0) {
        setDefaultMap({
          center: {
            lat: location[0].latitude,
            lng: location[0].longitude,
          },
          zoom: 11,
        })
      }
    }
  }, [location])
  // handler address change
  const handlAddr = (p) => {
    if (p === "right") {
      setIdLocation(idLocation + 1)
      setDefaultMap({
        center: {
          lat: location[idLocation + 1].latitude,
          lng: location[idLocation + 1].longitude,
        },
        zoom: 11,
      })
      if (idLocation + 1 === service.locations.length - 1) {
        setDisableButton({ left: false, right: true })
      }
    } else {
      setDefaultMap({
        center: {
          lat: location[idLocation - 1].latitude,
          lng: location[idLocation - 1].longitude,
        },
        zoom: 11,
      })
      setIdLocation(idLocation - 1)
      if (idLocation - 1 === 0) {
        setDisableButton({ left: true, right: false })
      }
    }
  }

  return (
    <div style={{ background: "white", color: "black" }}>
      <Container>
        <Stack direction='vertical' className='px-3'>
          {error && <Message>{error}</Message>}

          {loading && <Loader />}

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
                  <div className='map-business-detail h-100 p-1'>
                    {defaultMap !== undefined && (
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: googleKey,
                        }}
                        center={defaultMap.center}
                        defaultZoom={defaultMap.zoom}
                      >
                        <div
                          lat={defaultMap.lat}
                          lng={defaultMap.lng}
                          className='d-flex flex-row'
                          style={{ color: "orange", fontSize: "1rem" }}
                        >
                          <i className='bi bi-geo-alt-fill '></i>
                          Business
                        </div>
                      </GoogleMapReact>
                    )}
                  </div>
                  <Button variant='dark' className='mt-auto'>
                    This is just a preview
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
    </div>
  )
}

export default BusinessPreview
