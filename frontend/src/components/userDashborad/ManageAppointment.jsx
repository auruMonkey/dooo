import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Accordion } from "react-bootstrap"
import {
  getBusinessById,
  getAppointments,
  getAppointmentById,
} from "../../actions"
import { Loader, Message } from "../../components"
import ModalAppointment from "./ModalAppointment"
import { AccordionItems, formatDate } from "./components/modalAppointment"

const ManageAppointment = ({
  appts,
  userInfo,
  cancelAppointment,
  updateAppointmentHandler,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [isCanceled, setIsCanceled] = useState(false)
  const [pendingAppts, setPendingAppts] = useState()
  const [acceptedAppts, setAcceptedAppts] = useState()
  const [completedAppts, setCompletedAppts] = useState()
  const [canceledAppts, setCanceledAppts] = useState()
  const [pendingInfoAppts, setPendingInfoAppts] = useState()
  const [acceptedInfoAppts, setAcceptedInfoAppts] = useState()
  const [completedInfoAppts, setCompletedInfoAppts] = useState()
  const [canceledInfoAppts, setCanceledinfoAppts] = useState()
  const dispatch = useDispatch()

  const { getBusinessInfo } = useSelector((state) => state.getBusinessById)
  const { appointmentInfo } = useSelector((state) => state.getAppointment)

  useEffect(() => {
    if (appts !== undefined) {
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
  }, [])

  const getArrAppts = (str) => {
    const filteredApn = appts.apptsInfo.newArr.filter((x) => {
      return x.userstatus === str
    })
    return filteredApn
  }

  const getBusInfo = (arr, str) => {
    let openApp = []
    for (let i of arr) {
      const formatedDT = formatDate(i.datetime, "medium", "short")
      const avArr = appts.apptsInfo.newArrBus.filter((y) => {
        return y._id === i.business
      })
      openApp.push({
        idApp: i._id,
        idBsn: avArr[0]._id,
        addr: i.location.address,
        avt: avArr[0].avatar.path,
        datetime: formatedDT,
        status: str,
        rating: avArr[0].rating,
      })
    }
    return openApp
  }

  useEffect(() => {
    if (!isCanceled) {
      if (pendingAppts !== undefined) {
        const tb = getBusInfo(pendingAppts, "Pending")
        setPendingInfoAppts(tb)
      }
      if (acceptedAppts !== undefined) {
        const tb = getBusInfo(acceptedAppts, "Accepted")
        setAcceptedInfoAppts(tb)
      }
      if (completedAppts !== undefined) {
        const tb = getBusInfo(completedAppts, "Completed")
        setCompletedInfoAppts(tb)
      }
      if (canceledAppts !== undefined) {
        const tb = getBusInfo(canceledAppts, "Cancelled")
        setCanceledinfoAppts(tb)
      }
    }
  }, [pendingAppts, acceptedAppts, completedAppts, canceledAppts])

  const openModal = (aid, bid) => {
    dispatch(getAppointmentById(aid))
    dispatch(getBusinessById(bid))
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  const reschAppHandler = (appt, bi) => {
    let tempappt = []
    const formatedDT = formatDate(appt.datetime, "medium", "short")
    const tapp = pendingInfoAppts.filter((x) => x.idApp !== appt._id)
    tempappt = tapp
    const ntappt = {
      addr: appt.location.address,
      avt: bi.avatar,
      datetime: formatedDT,
      idApp: appt._id,
      idBsn: bi.id,
      rating: bi.rating,
      rating: bi.rating,
      status: "Pending",
    }

    if (tempappt === []) {
      tempappt = ntappt
    } else {
      tempappt.push(ntappt)
    }
    setPendingInfoAppts(tempappt)
    updateAppointmentHandler(appt)
    handleCloseModal()
  }

  const cancelAppHandler = (apt) => {
    setIsCanceled(true)
    const formatedDT = formatDate(apt.datetime, "medium", "short")
    const tarr = pendingInfoAppts.filter((x) => x.datetime !== formatedDT)
    setPendingInfoAppts(tarr)
    if (canceledInfoAppts.length) {
      const trcanc = canceledInfoAppts
      const tarr = pendingInfoAppts.filter((x) => x.datetime === formatedDT)
      trcanc.push(tarr)
      setCanceledinfoAppts(trcanc)
    } else {
      const tarr = pendingInfoAppts.filter((x) => x.datetime === formatedDT)
      setCanceledinfoAppts(tarr)
    }
    cancelAppointment(apt._id)
    handleCloseModal()
  }

  return (
    <Accordion>
      {appts.loading && <Loader />}
      {appts.error && <Message variant='danger'>{appts.error}</Message>}
      {/*{/* {succes && (
        <Message variant='success'>"Appointment was canceled"</Message>
      )} */}
      <AccordionItems
        ek={0}
        act='Pending'
        openApn={pendingInfoAppts}
        openModal={openModal}
        color={"orange"}
        icon='bi bi-alarm'
      />
      <AccordionItems
        ek={1}
        act='Accepted'
        openApn={acceptedInfoAppts}
        color={"navy"}
        icon='bi bi-check2-circle'
        openModal={openModal}
      />
      <AccordionItems
        ek={2}
        act='Completed'
        openApn={completedInfoAppts}
        openModal={openModal}
        color={"#556B2F"}
        icon='bi bi-check-circle-fill'
      />
      <AccordionItems
        ek={3}
        act='Cancelled'
        // clickAccItemHandler={clickAccItemHandler}
        openApn={canceledInfoAppts}
        openModal={openModal}
        color={"red"}
        icon='bi bi-x-circle-fill'
      />

      {getBusinessInfo !== undefined && appointmentInfo !== undefined && (
        <ModalAppointment
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          reschAppHandler={reschAppHandler}
          cancelAppHandler={cancelAppHandler}
          // openApn={openApn}
          // clickAccItemHandler={clickAccItemHandler}
          userInfo={userInfo}
          getBusinessInfo={getBusinessInfo}
          appointmentInfo={appointmentInfo}
          // uApptState={uApptState}
        />
      )}
    </Accordion>
  )
}

export default ManageAppointment
