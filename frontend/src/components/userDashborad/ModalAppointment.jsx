import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "react-bootstrap"
import { chappmstr } from "../strings"
import { Loader, Message, ButtonShadow } from "../../components"
import { useNavigate } from "react-router-dom"

import {
  ChooseService,
  ChooseLocation,
  BusinessInfo,
  UserInfo,
  DataSelect,
  Summury,
} from "../userDashborad/components/modalAppointment"
import {
  getBusinessById,
  getAppointmentById,
  cancelAppointmentById,
} from "../../actions"

const ModalAppointment = ({
  show,
  handleCloseModal,
  appointment,
  setCancelled,
  setCanceled,
  updateApp,
}) => {
  const [isEditApp, setIsEditApp] = useState(false)
  const [newAppointment, setNewAppointment] = useState({})
  const [newLocationAddr, setNewLocationAddr] = useState("")
  const [newServices, setNewServices] = useState([])
  const [newDateTime, setNewDateTime] = useState("")
  //def dispatch
  const dispatch = useDispatch()
  const history = useNavigate()

  useEffect(() => {
    dispatch(getAppointmentById(appointment.idApp))
    dispatch(getBusinessById(appointment.idBsn))
  }, [appointment, dispatch])

  //appointment selector
  const {
    loading: loadApt,
    error: errApt,
    appointmentInfo,
  } = useSelector((state) => state.getAppointment)

  //   //slice userinfo
  const {
    loading: loadUsr,
    error: errUsr,
    userInfo,
  } = useSelector((state) => state.userLogin)
  //   //slice business
  const {
    loading: loadBsn,
    error: errBsn,
    getBusinessInfo,
  } = useSelector((state) => state.getBusinessById)

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewAppointment(appointmentInfo)
      setNewLocationAddr(appointmentInfo.location.address)
    }, 1000)
    return () => clearTimeout(timer)
  }, [appointmentInfo])

  const newLocation = (loc) => {
    setNewLocationAddr(loc.address)
  }
  const newServicesHandle = (ser) => {
    setNewServices(ser)
  }
  const setNewDateHandler = (date) => {
    const nd = date.toISOString()
    setNewDateTime(nd)
  }

  const closeModalHandle = () => {
    handleCloseModal()
  }
  const manageAppClickHandler = () => {
    setIsEditApp(true)
    setNewAppointment(appointmentInfo)
  }
  const cancelUpdateAppHandler = () => {
    setNewAppointment(appointmentInfo)
    setNewLocationAddr(appointmentInfo.location.address)
    setNewServices(appointmentInfo.services)
    setNewDateTime(appointmentInfo.datetime)
    setIsEditApp(false)
    handleCloseModal()
  }
  //Cancel appointment
  const cancelAppHandler = () => {
    dispatch(cancelAppointmentById(appointment.idApp))
    handleCloseModal()
    setIsEditApp(false)
    history("/dashboard/manage")
    updateApp()
  }
  const reschAppHandler = () => {
    newAppointment.location.address = newLocationAddr
    newAppointment.services = newServices
    // newAppointment.datetime = newDateTime
    console.log("new appointment", newAppointment)
    //SEND TO SERVER UPDATE
    setIsEditApp(false)
  }

  return (
    <Modal
      show={show}
      onHide={closeModalHandle}
      backdrop='static'
      centered
      size='xl'
      className='modal-dialog-scrollable text-dark'
    >
      {errApt && <Message variant='danger'>{errApt}</Message>}
      {errUsr && <Message variant='danger'>{errUsr}</Message>}
      {errBsn && <Message variant='danger'>{errBsn}</Message>}
      {loadApt || loadUsr || loadBsn || <Loader />}
      <div className='bg-white'>
        {/* *******Header******* */}
        <Modal.Header closeButton className='btn-close-white border-0'>
          <Modal.Title as='h6' style={{ color: "#ffffff" }}>
            {chappmstr[0]}
          </Modal.Title>
        </Modal.Header>
        {/* *******Body******* */}
        <Modal.Body className='text-dark d-flex flex-column min-vh-100'>
          {!getBusinessInfo ||
          !userInfo ||
          !appointmentInfo ||
          newAppointment === undefined ? (
            <Loader />
          ) : (
            <>
              <UserInfo avatar={userInfo.avatar.path} name={userInfo.name} />
              <hr className='border' />
              <BusinessInfo
                avatar={getBusinessInfo.avatar.path}
                rating={getBusinessInfo.rating}
                address={newLocationAddr}
              />

              <hr className='border' />
              <ChooseLocation
                locationB={getBusinessInfo.locations}
                locationA={newLocationAddr}
                newLocation={newLocation}
                isEditApp={isEditApp}
              />
              <hr className='border' />
              <ChooseService
                servicesB={getBusinessInfo.services}
                servicesA={newAppointment.services}
                newServicesHandle={newServicesHandle}
                isEditApp={isEditApp}
              />
              <hr className='border' />
              <DataSelect
                appointment={newAppointment}
                scheduleB={getBusinessInfo.schedule}
                setNewDateHandler={setNewDateHandler}
                isEditApp={isEditApp}
              />

              <hr className='border' />
              <Summury
                newAppointment={newAppointment}
                businessName={getBusinessInfo.businessName}
                newLocationAddr={newLocationAddr}
                newServices={newServices}
                // newDateText={newDateText}
                isEditApp={isEditApp}
              />
              <hr className='border' />
            </>
          )}
        </Modal.Body>
        {/* *******Footer****** */}
        <Modal.Footer
          as='div'
          className='mt-auto d-flex justify-content-start m-2'
        >
          {!isEditApp ? (
            <ButtonShadow
              text='Manage Appointment'
              color='#0047AB'
              icon='bi bi-alarm-fill ms-2'
              handleOnClick={manageAppClickHandler}
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
                    handleOnClick={reschAppHandler}
                  />
                </div>
                <div>
                  <ButtonShadow
                    text='Cancel Appointment'
                    color='#fff'
                    bgcolor='#c72525'
                    icon='bi bi-trash3-fill ms-2'
                    handleOnClick={cancelAppHandler}
                  />
                </div>
              </div>
            </div>
          )}
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default ModalAppointment
