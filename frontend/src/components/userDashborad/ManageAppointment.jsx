import React, { useEffect, useState } from "react"
import { Accordion } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { getAppointments } from "../../actions/userActions"
import { Loader, Message } from "../../components"
import ModalAppointment from "./ModalAppointment"
import { AccordionItems, formatDate } from "./components/modalAppointment"

const ManageAppointment = () => {
  const [openApn, setOpenApn] = useState([])
  const [showChangeApp, setShowChangeApp] = useState(false)
  const [cngAppId, setCngAppId] = useState("")

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const { succes } = useSelector((state) => state.cancelAppointment)

  useEffect(() => {
    dispatch(getAppointments(userInfo.appointments))
  }, [dispatch, userInfo.appointments])

  const { loading, apptsInfo, error } = useSelector(
    (state) => state.userAppointment
  )

  //close modal window
  const handleCloseModal = () => {
    setShowChangeApp(true)
  }
  const openModal = () => setShowChangeApp(true)

  const clickAccItemHandler = (str) => {
    if (openApn.length > 0) {
      setOpenApn([])
      return
    }
    const filteredApn = apptsInfo.aps.filter((x) => {
      return x.userstatus === str
    })

    for (let i of filteredApn) {
      const formatedDT = formatDate(i.datetime, "medium", "short")
      const avArr = apptsInfo.avatBus.filter((y) => {
        return y.id === i.business
      })
      setOpenApn((old) => [
        ...old,
        {
          idApp: i._id,
          idBsn: avArr[0].id,
          addr: i.location.address,
          avt: avArr[0].avat,
          datetime: formatedDT,
          status: str,
          rating: avArr[0].rating,
        },
      ])
    }
  }

  return (
    <Accordion>
      {error && <Message variant='danger'>{error}</Message>}
      {succes && (
        <Message variant='success'>"Appointment was canceled"</Message>
      )}
      {loading && <Loader />}
      <AccordionItems
        ek={0}
        act='Pending'
        apn={apptsInfo}
        clickAccItemHandler={clickAccItemHandler}
        openApn={openApn}
        openModal={openModal}
      />
      <AccordionItems
        ek={1}
        act='Accepted'
        apn={apptsInfo}
        clickAccItemHandler={clickAccItemHandler}
        openApn={openApn}
        openModal={openModal}
      />
      <AccordionItems
        ek={2}
        act='Completed'
        apn={apptsInfo}
        clickAccItemHandler={clickAccItemHandler}
        openApn={openApn}
        openModal={openModal}
      />
      <AccordionItems
        ek={3}
        act='Cancelled'
        apn={apptsInfo}
        clickAccItemHandler={clickAccItemHandler}
        openApn={openApn}
        openModal={openModal}
      />

      <ModalAppointment
        show={showChangeApp}
        handleCloseModal={() => setShowChangeApp(false)}
        appointment={cngAppId}
      />
    </Accordion>
  )
}

export default ManageAppointment
