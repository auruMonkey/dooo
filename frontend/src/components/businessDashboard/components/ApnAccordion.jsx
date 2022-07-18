import React from "react"
import { useEffect, useState } from "react"
import { Accordion, Modal, Button } from "react-bootstrap"
import ApnAccordionItem from "../components/ApnAccordionItem"
import ModalApn from "./ModalApn"
import { useDispatch, useSelector } from "react-redux"
import {
  getAppointmentById,
  getUserById,
  acceptBusinessApn,
} from "../../../actions"
import { formatDate } from "../../userDashborad/components/modalAppointment"

const ApnAccordion = ({ businessApnInfo, businessInfo }) => {
  const [showModal, setShowModal] = useState(false)
  const [pendingAppts, setPendingAppts] = useState()
  const [acceptedAppts, setAcceptedAppts] = useState()
  const [completedAppts, setCompletedAppts] = useState()
  const [canceledAppts, setCanceledAppts] = useState()
  const [canceledInfoAppts, setCanceledinfoAppts] = useState()
  const [pendingInfoAppts, setPendingInfoAppts] = useState()
  const [acceptedInfoAppts, setAcceptedInfoAppts] = useState()
  const [completedInfoAppts, setCompletedInfoAppts] = useState()
  const dispatch = useDispatch()
  const [inApn, setInApn] = useState([])
  const { appointmentInfo } = useSelector((state) => state.getAppointment)
  const { getUserBIDInfo } = useSelector((state) => state.getUserById)

  useEffect(() => {
    if (businessApnInfo !== undefined) {
      setPendingAppts()
      setAcceptedAppts()
      setCompletedAppts()
      setCanceledAppts()
      const pendArr = getArrAppts("Pending")
      const acceArr = getArrAppts("Accepted")
      const compArr = getArrAppts("Completed")
      const cancArr = getArrAppts("Cancelled")
      if (pendingAppts === undefined) {
        setPendingAppts(pendArr)
      }
      if (acceptedAppts === undefined) {
        setAcceptedAppts(acceArr)
      }
      if (completedAppts === undefined) {
        setCompletedAppts(compArr)
      }
      if (canceledAppts === undefined) {
        setCanceledAppts(cancArr)
      }
    }
  }, [businessApnInfo, setInApn])

  useEffect(() => {
    if (pendingAppts !== undefined) {
      const tb = getUserInfo(pendingAppts, "Pending")
      setPendingInfoAppts(tb)
    }
    if (acceptedAppts !== undefined) {
      const tb = getUserInfo(acceptedAppts, "Accepted")
      setAcceptedInfoAppts(tb)
    }
    if (completedAppts !== undefined) {
      const tb = getUserInfo(completedAppts, "Completed")
      setCompletedInfoAppts(tb)
    }
    if (canceledAppts !== undefined) {
      const tb = getUserInfo(canceledAppts, "Cancelled")
      setCanceledinfoAppts(tb)
    }
  }, [pendingAppts, acceptedAppts, completedAppts, canceledAppts])

  const getArrAppts = (str) => {
    const filteredApn = businessApnInfo.newArr.filter((x) => {
      return x.businessstatus === str
    })
    return filteredApn
  }

  const getUserInfo = (arr, str) => {
    let openApp = []
    for (let i of arr) {
      const formatedDT = formatDate(i.datetime, "medium", "short")
      const avArr = businessApnInfo.newArrUser.filter((y) => {
        return y._id === i.user
      })
      openApp.push({
        idApp: i._id,
        idBsn: avArr[0]._id,
        phone: i.location.address,
        avt: avArr[0].avatar.path,
        datetime: formatedDT,
        status: str,
        name: avArr[0].name,
        phone: avArr[0].phone,
      })
    }
    return openApp
  }

  const openModal = (pa) => {
    dispatch(getAppointmentById(pa.idApp))
    dispatch(getUserById(pa.idBsn))
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const acceptAppointmentHandler = (id) => {
    const newPendingAppt = pendingInfoAppts.filter((f) => f.idApp !== id)
    setPendingInfoAppts(newPendingAppt)
    const newAcceptAppt = pendingInfoAppts.filter((f) => f.idApp === id)
    setAcceptedInfoAppts(newAcceptAppt)

    dispatch(acceptBusinessApn(appointmentInfo._id))
    setShowModal(false)
  }

  return (
    <>
      <h5 style={{ color: "black" }}>My Appointments</h5>

      <Accordion>
        <ApnAccordionItem
          ek={0}
          act='Pending'
          openApn={pendingInfoAppts}
          openModal={openModal}
          color={"orange"}
          icon='bi bi-alarm'
        />
        <ApnAccordionItem
          ek={1}
          act='Accepted'
          openApn={acceptedInfoAppts}
          color={"navy"}
          icon='bi bi-check2-circle'
          openModal={openModal}
        />
        <ApnAccordionItem
          ek={2}
          act='Completed'
          openApn={completedInfoAppts}
          openModal={openModal}
          color={"#556B2F"}
          icon='bi bi-check-circle-fill'
        />
        <ApnAccordionItem
          ek={3}
          act='Cancelled'
          openApn={canceledInfoAppts}
          openModal={openModal}
          color={"red"}
          icon='bi bi-x-circle-fill'
        />
      </Accordion>
      {appointmentInfo && getUserBIDInfo !== undefined && (
        <ModalApn
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          userInfo={getUserBIDInfo}
          businessInfo={businessInfo}
          acceptAppointmentHandler={acceptAppointmentHandler}
          appointmentInfo={appointmentInfo}
        />
      )}
    </>
  )
}

export default ApnAccordion
