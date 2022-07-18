import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  UserInfoBD,
  BusinessInfoBD,
  LocationBD,
  ServicesBD,
  DateTimeBD,
} from "./modal"

import { Modal, Button } from "react-bootstrap"
import { ButtonShadow } from "../../../components"
import { bdstr } from "../../strings"

import {
  ModalTitle,
  BusinessInfo,
  UserInfo,
  Location,
  Services,
  DateTime,
} from "../components/modal"
import { bamstr } from "../../strings"
import { acceptBusinessApn } from "../../../actions"

const ModalApn = ({
  showModal,
  appointmentInfo,
  handleCloseModal,
  userInfo,
  businessInfo,
  acceptAppointmentHandler,
}) => {
  const [content, setContent] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditApp, setIsEditApp] = useState(false)

  const dispatch = useDispatch()

  const [apptServices, setApptServices] = useState(
    appointmentInfo.services.map((s) => s)
  )
  const accAppt = () => {
    acceptAppointmentHandler(appointmentInfo._id)
  }

  return (
    <>
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
          <>
            <UserInfoBD
              avatar={userInfo.avatar.path}
              name={userInfo.name}
              member={userInfo.joined}
            />
            <hr className='border' />
            <BusinessInfoBD
              avatar={businessInfo.avatar.path}
              name={businessInfo.name}
              rating={businessInfo.rating}
            />
            <hr className='border' />
            <LocationBD location={appointmentInfo.location} />
            <hr className='border' />
            <ServicesBD services={appointmentInfo.services} />
            <hr className='border' />
            <DateTimeBD datetime={appointmentInfo.datetime} />

            <hr className='border' />
          </>
        </Modal.Body>

        {/* *******Footer****** */}
        <Modal.Footer as='div' className='d-flex justify-content-start m-2'>
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
                <div className='d-flex justify-content-end w-100'>
                  <ButtonShadow
                    text='Accept Appointment'
                    color='green'
                    icon='bi bi-check-circle-fill ms-2'
                    handleOnClick={accAppt}
                  />
                </div>
              </div>
            )
          ) : (
            <div>
              <ButtonShadow
                text='Close'
                color='#fff'
                bgcolor='#c72525'
                icon='bi bi-x-lg ms-2'
                handleOnClick={handleCloseModal}
              />
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalApn
