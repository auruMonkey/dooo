import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "react-bootstrap"
import { chappmstr } from "../strings"
import { Loader, Message } from "../../components"
import {
  ChooseService,
  ChooseLocation,
  BusinessInfo,
  UserInfo,
  DataSelect,
} from "../userDashborad/components/modalAppointment"
import { getBusinessById, getAppointmentById } from "../../actions"

const ModalAppointment = ({ show, handleCloseModal, appointment }) => {
  //main state
  /*    business: "",
    businessstatus: "Pending",
    datetime: new Date(),
    location: {},
    services: [],
    user: "",
    userstatus: "Pending",*/
  const [newAppointment, setNewAppointment] = useState({})

  //def dispatch
  const dispatch = useDispatch()

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
    if (appointmentInfo !== undefined) {
      if (Object.keys(appointmentInfo).length !== 0) {
        setNewAppointment(appointmentInfo)
        
      }
    }
  }, [appointmentInfo])

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
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
          {!getBusinessInfo || !userInfo || !appointmentInfo ? (
            <Loader />
          ) : (
            <>
              {newAppointment !== {} && (
                <>
                  <UserInfo
                    avatar={userInfo.avatar.path}
                    name={userInfo.name}
                  />
                  <hr className='border' />
                  <BusinessInfo
                    avatar={getBusinessInfo.avatar.path}
                    rating={getBusinessInfo.rating}
                    address={newAppointment.location.address}
                  />
                  <hr className='border' />
                  <ChooseLocation
                    locationB={getBusinessInfo.locations}
                    locationA={newAppointment.location}
                    setNewAppointment={setNewAppointment}
                    appointmentInfo={appointmentInfo}
                  />
                  <ChooseService
                    servicesB={getBusinessInfo.services}
                    servicesA={newAppointment.services}
                    setNewAppointment={setNewAppointment}
                    appointmentInfo={appointmentInfo}
                  />
                  <DataSelect
                    datetime={newAppointment.datetime}
                    scheduleB={getBusinessInfo.schedule}
                    locationA={newAppointment.location}
                    setNewAppointment={setNewAppointment}
                    appointmentInfo={appointmentInfo}
                  />
                </>
              )}
            </>
          )}
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default ModalAppointment
