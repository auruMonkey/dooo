import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { bdstr } from "../strings"
import {
  UserDetailsBD,
  BusinessInfoBD,
  LocationBD,
  ServicesBD,
  SummaryBD,
  DataSelectBD,
} from "../BusinessDetails"
import { Loader } from "../../components"
import { makeAppointment, sendEmail } from "../../actions"

const ModalBD = ({ showModal, handleCloseModal }) => {
  const [loading, setLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    avatar: "",
    rating: 0,
  })

  const [location, setLocation] = useState([])
  const [services, setServices] = useState([])
  const [apptLocation, setApptLocation] = useState()
  const [apptServices, setApptServices] = useState([])
  const [apptDateTime, setApptDateTime] = useState()
  const [apptSchedule, setApptSchedule] = useState()
  const dispatch = useDispatch()
  const history = useNavigate()

  const { userInfo } = useSelector((state) => state.userLogin)
  const { service } = useSelector((state) => state.serviceDetails)

  useEffect(() => {
    console.log(service)
    console.log(userInfo)
    if (userInfo && service !== undefined) {
      setBusinessInfo({
        name: service.businessName,
        avatar: service.avatar.path,
        rating: service.rating,
      })

      setLocation(service.locations.map((s) => s))
      setServices(service.services.map((s) => s))
      setLoading(false)
    }
  }, [userInfo, service])

  const clickLocationHandler = (loc) => {
    setApptLocation(loc)
    if (loc) {
      const temp = service.schedule.find(
        (x) => x.location.address === loc.address
      )
      setApptSchedule(temp)
    }
  }
  const clickServiceHandler = (ser) => {
    if (apptServices !== []) {
      if (apptServices.findIndex((s) => s._id === ser._id) > -1) {
        const temp = apptServices.filter((s) => s._id !== ser._id)
        setApptServices(temp)
      } else {
        setApptServices((old) => [...old, ser])
      }
    } else {
      setApptServices((old) => [...old, ser])
    }
  }

  const clickDateHandler = (date) => {
    if (apptLocation === undefined) {
      setShowMessage(false)
    } else {
      setShowMessage(true)
      setApptDateTime(date)
    }
  }

  //handle appointment function
  const handleAppointment = () => {
    const dateString = apptDateTime.toISOString()
    if (
      apptLocation !== undefined &&
      apptServices.length > 0 &&
      apptDateTime !== undefined
    ) {
      dispatch(
        makeAppointment(
          userInfo._id,
          service._id,
          apptServices,
          apptLocation,
          dateString
        )
      )
      dispatch(
        sendEmail({
          name: service.name,
          phnub: service.phonenumber,
          email: service.email,
          message: `Hi ${service.businessName}, Congratulations ${userInfo.name} has booked your services. Please login to your dashboard to confirm the scheduled appointment. Go to Dashboard (a button that is hyperlinked)`,
          to: service.email,
          subject: `DooMoble`,
        })
      )
      history(0)
    } else {
      return
    }
  }

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop='static'
      centered
      size='xl'
      className='modal-dialog-scrollable text-dark'
    >
      {/* *******Header******* */}
      <Modal.Header closeButton className='btn-close-white border-0'>
        <Modal.Title as='h6' style={{ color: "#ffffff" }}>
          {bdstr[0]}
        </Modal.Title>
      </Modal.Header>
      {/* *******Body******* */}
      <Modal.Body className='text-dark d-flex flex-column min-vh-100'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <UserDetailsBD avatar={userInfo.avatar.path} name={userInfo.name} />
            <hr className='border' />
            <BusinessInfoBD
              avatar={businessInfo.avatar}
              name={businessInfo.name}
              rating={businessInfo.rating}
            />
            <hr className='border' />
            <LocationBD
              location={location}
              clickLocationHandler={clickLocationHandler}
              apptLocation={apptLocation}
            />
            <hr className='border' />
            <ServicesBD
              services={services}
              clickServiceHandler={clickServiceHandler}
              apptServices={apptServices}
            />
            <hr className='border' />

            <DataSelectBD
              clickDateHandler={clickDateHandler}
              apptDateTime={apptDateTime}
              locationDOF={apptSchedule}
              showMessage={showMessage}
            />

            <hr className='border' />
            <SummaryBD
              name={businessInfo.name}
              location={apptLocation}
              services={apptServices}
              apptDateTime={apptDateTime}
            />
          </>
        )}
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
  )
}

export default ModalBD
