import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Modal } from "react-bootstrap"
import { bdstr } from "../strings"
import {
  UserInfoUD,
  BusinessInfoUD,
  LocationUD,
  ServicesUD,
  SummaryUD,
  DataSelectUD,
} from "../userDashborad/components/modalAppointment"
import { Loader, ButtonShadow } from "../../components"

const ModalAppointment = ({
  showModal,
  handleCloseModal,
  userInfo,
  getBusinessInfo,
  appointmentInfo,
  reschAppHandler,
  cancelAppHandler,
  // updateAppt,
  // clickAccItemHandler,
}) => {
  // const [loading, setLoading] = useState(true)
  const [isEditApp, setIsEditApp] = useState(false)
  const [businessInfo, setBusinessInfo] = useState({
    name: getBusinessInfo.businessName,
    avatar: getBusinessInfo.avatar.path,
    rating: getBusinessInfo.rating,
    id: getBusinessInfo._id,
  })
  const [location, setLocation] = useState(getBusinessInfo.locations)
  const [apptLocation, setApptLocation] = useState(appointmentInfo.location)
  const [services, setServices] = useState(
    getBusinessInfo.services.map((s) => s)
  )
  const [apptServices, setApptServices] = useState(
    appointmentInfo.services.map((s) => s)
  )
  const [apptDateTime, setApptDateTime] = useState(appointmentInfo.datetime)
  const [apptSchedule, setApptSchedule] = useState()

  useEffect(() => {
    const temp = getBusinessInfo.schedule.find(
      (x) => x.location.address === appointmentInfo.location.address
    )
    setApptSchedule(temp)
    //     setLoading(false)
  }, [appointmentInfo.location.address, getBusinessInfo.schedule])


  const clickLocationHandler = (loc) => {
    setApptLocation(loc)
    if (loc) {
      const temp = getBusinessInfo.schedule.find(
        (x) => x.location.address === loc.address
      )
      setApptSchedule(temp)
    }
  }
  const clickServiceHandler = (ser) => {
    if (apptServices.findIndex((s) => s._id === ser._id) > -1) {
      const temp = apptServices.filter((s) => s._id !== ser._id)
      setApptServices(temp)
    } else {
      setApptServices((old) => [...old, ser])
    }
  }

  const clickDateHandler = (date) => {
    setApptDateTime(date)
  }

  const cancelUpdateAppHandler = () => {
    setApptLocation(appointmentInfo.location)
    setApptServices(appointmentInfo.services.map((s) => s))
    const temp = getBusinessInfo.schedule.find(
      (x) => x.location.address === appointmentInfo.location.address
    )
    clickDateHandler(appointmentInfo.datetime)
    setApptSchedule(temp)
    setIsEditApp(false)
  }

  const resAppt = () => {
    const tempAppt = appointmentInfo
    tempAppt.location = {
      address: apptLocation.address,
      latitude: apptLocation.latitude,
      longitude: apptLocation.longitude,
    }
    tempAppt.services = apptServices
    tempAppt.datetime = apptDateTime.toISOString()
    reschAppHandler(tempAppt, businessInfo)
    setIsEditApp(false)
  }

  const cnclAppt = () => {
    cancelAppHandler(appointmentInfo)
    setIsEditApp(false)
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
        {/* {loading ? (
          <Loader />
        ) : ( */}
        <>
          <UserInfoUD avatar={userInfo.avatar.path} name={userInfo.name} />
          <hr className='border' />
          <BusinessInfoUD
            avatar={businessInfo.avatar}
            name={businessInfo.name}
            rating={businessInfo.rating}
          />
          <hr className='border' />
          <div className={isEditApp ? "modal-inactive" : "modal-active"}>
            <LocationUD
              location={location}
              clickLocationHandler={clickLocationHandler}
              apptLocation={apptLocation}
            />
          </div>
          <hr className='border' />
          <div className={isEditApp ? "modal-inactive" : "modal-active"}>
            <ServicesUD
              services={services}
              clickServiceHandler={clickServiceHandler}
              apptServices={apptServices}
            />
          </div>
          <hr className='border' />
          <div className={isEditApp ? "modal-inactive" : "modal-active"}>
            {apptSchedule !== undefined && (
              <DataSelectUD
                clickDateHandler={clickDateHandler}
                apptDateTime={apptDateTime}
                locationDOF={apptSchedule}
              />
            )}
          </div>
          <hr className='border' />
          <SummaryUD
            name={businessInfo.name}
            location={apptLocation}
            services={apptServices}
            apptDateTime={apptDateTime}
          />
        </>
      </Modal.Body>

      {/* *******Footer****** */}
      <Modal.Footer
        as='div'
        className='mt-auto d-flex justify-content-start m-2'
      >
        {appointmentInfo.userstatus === "Pending" ? (
          !isEditApp ? (
            <ButtonShadow
              text='Manage Appointment'
              color='#0047AB'
              icon='bi bi-alarm-fill ms-2'
              handleOnClick={() => setIsEditApp(true)}
            />
          ) : (
            <div className='d-flex flex-row w-100'>
              <div className='w-100'>
                <ButtonShadow
                  text='Cancel Update'
                  color='#c72525'
                  icon='bi bi-x-lg ms-2'
                  handleOnClick={cancelUpdateAppHandler}
                />
              </div>
              <div className='d-flex justify-content-end w-100'>
                <div className='me-4'>
                  <ButtonShadow
                    text='Reschedule Appointment'
                    color='#008000'
                    icon='bi bi-alarm-fill ms-2'
                    handleOnClick={resAppt}
                  />
                </div>
                <div>
                  <ButtonShadow
                    text='Cancel Appointment'
                    color='#fff'
                    bgcolor='#c72525'
                    icon='bi bi-trash3-fill ms-2'
                    handleOnClick={cnclAppt}
                  />
                </div>
              </div>
            </div>
          )
        ) : (
          <div>
            <ButtonShadow
              text='Close'
              color='#fff'
              bgcolor='#c72525'
              icon='bi bi-trash3-fill ms-2'
              handleOnClick={handleCloseModal}
            />
          </div>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAppointment
