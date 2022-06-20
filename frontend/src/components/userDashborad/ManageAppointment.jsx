import React, { useEffect, useState } from "react"
import { Accordion, Col, Row, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { getAppointments } from "../../actions/userActions"
import { Loader, Message, ButtonShadow } from "../../components"
import ModalAppointment from "./ModalAppointment"
import { usappstr } from "../strings"

const ManageAppointment = () => {
  const [pendApp, setPendApp] = useState([])
  const [showChangeApp, setShowChangeApp] = useState(false)
  const [cngAppId, setCngAppId] = useState("")

  //slicer for user info
  const { userInfo } = useSelector((state) => state.userLogin)
  //def dispatch
  const dispatch = useDispatch()
  //initial get appointments
  useEffect(() => {
    dispatch(getAppointments(userInfo.appointments))
  }, [])

  //slicer for appointments
  const { loading, apptsInfo, error } = useSelector(
    (state) => state.userAppointment
  )

  const showItem = (str) => {
    if (apptsInfo && pendApp.length === 0) {
      const hhh = apptsInfo.aps.filter((x) => {
        return x.userstatus === str
      })
      for (let i of hhh) {
        const avArr = apptsInfo.avatBus.filter((y) => {
          return y.id === i.business
        })
        const dt = new Date(i.datetime)
        const mdt = dt.toLocaleString("default", { month: "long" })
        const ddt = dt.toLocaleString("default", { day: "numeric" })
        const ydt = dt.toLocaleString("default", { year: "numeric" })
        const tdt = dt.toLocaleTimeString("default", {
          hour: "2-digit",
          minute: "2-digit",
        })
        const strddt = `${mdt} ${ddt}th, ${ydt} @ ${tdt}`
        setPendApp((old) => [
          ...old,
          {
            idApp: i._id,
            idBsn: avArr[0].id,
            addr: i.location.address,
            avt: avArr[0].avat,
            datetime: strddt,
            status: str,
            rating: avArr[0].rating,
          },
        ])
      }
    }
  }
  //close modal window
  const handleCloseModal = () => {
    setShowChangeApp(true)
  }
  return (
    <Accordion>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Accordion.Item
        eventKey='0'
        className='border-top'
        onClick={() => showItem("Pending")}
      >
        <Accordion.Header>{usappstr[0]}</Accordion.Header>
        <Accordion.Body>
          {pendApp.length > 0
            ? pendApp.map((pa) => (
                <Row key={pa.addr} className='mb-3'>
                  <Col lg={1} md={2} xs={12} className='text-start p-0 me-3'>
                    <Image
                      src={pa.avt}
                      className='avatar-user-manager me-3 shadow img-fluid'
                    />
                  </Col>
                  <Col lg={6} md={6} xs={12} className='text-start p-0'>
                    <h6 className='text-dark'>
                      <strong>{pa.addr}</strong>
                    </h6>
                    <p>{pa.datetime}</p>
                  </Col>
                  <Col lg={2} md={2} xs={12} className='border rounded '>
                    <div className='d-flex flex-row justify-content-center h-100 align-items-center'>
                      <i
                        className='bi bi-clock-fill me-2'
                        style={{ color: "orange" }}
                      ></i>
                      <strong>{pa.status}</strong>
                    </div>
                  </Col>
                  <Col
                    lg={2}
                    md={2}
                    xs={12}
                    className='d-flex align-items-center justify-content-end'
                  >
                    <ButtonShadow
                      icon='bi bi-three-dots-vertical'
                      handleOnClick={() => {
                        setCngAppId(pa)
                        setShowChangeApp(true)
                      }}
                    />
                  </Col>
                </Row>
              ))
            : ""}
        </Accordion.Body>
      </Accordion.Item>
      <ModalAppointment
        show={showChangeApp}
        handleCloseModal={() => setShowChangeApp(false)}
        appointment={cngAppId}
      />
      <Accordion.Item eventKey='1' className='border-top'>
        <Accordion.Header>{usappstr[1]}</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='2' className='border-top'>
        <Accordion.Header>{usappstr[2]}</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='3' className='border-top'>
        <Accordion.Header>{usappstr[3]}</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default ManageAppointment
