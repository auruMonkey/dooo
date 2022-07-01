import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Modal, Button } from "react-bootstrap"
import { ButtonShadow } from "../../../components"

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

const ModalApn = ({ showModal, setAptModal, icon, color, pa }) => {
  const [content, setContent] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  useEffect(() => {
    if (pa !== undefined) {
      if (pa !== []) {
        setContent(pa)
        setIsLoading(false)
      }
    }
  }, [pa])

  const acceptAppointmentHandler = () => {
    dispatch(acceptBusinessApn(pa.apps._id))
    setAptModal()
  }

  return (
    <>
      {!isLoading ? (
        <Modal
          show={showModal}
          onHide={setAptModal}
          backdrop='static'
          centered
          size='xl'
          className='modal-dialog-scrollable h-auto'
        >
          {/* *******Header******* */}
          <ModalTitle
            icon={icon}
            color={color}
            status={content.apps.userstatus}
            setAptModal={setAptModal}
          />

          <hr className='border' />
          <UserInfo
            avatar={content.avatar}
            name={content.name}
            member={content.member}
          />
          <hr className='border' />
          {/* <BusinessInfo />*/}
          <Location location={content.apps.location} />
          <hr className='border' />
          <Services services={content.apps.services} />
          <hr className='border' />
          <DateTime datetime={content.apps.datetime} />
          <hr className='border' />
          {/* *******Footer****** */}
          <Modal.Footer
            as='div'
            className='mt-auto d-flex justify-content-start m-2'
          >
            {pa.apps.userstatus === "Pending" ? (
              <ButtonShadow
                text={bamstr[7]}
                color='green'
                icon='bi bi-check-circle-fill ms-2'
                handleOnClick={acceptAppointmentHandler}
              />
            ) : (
              <ButtonShadow
                text={bamstr[8]}
                color='red'
                icon='bi bi-x-circle-fill ms-2'
                handleOnClick={setAptModal}
              />
            )}
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  )
}

export default ModalApn
