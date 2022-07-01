import React, { useEffect, useState } from "react"
import { Accordion, Col, Row, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { getAppointments } from "../../actions/userActions"
import { Loader, Message, ButtonShadow } from "../../components"
import ModalAppointment from "./ModalAppointment"
import { usappstr } from "../strings"

const ManageAppointment = () => {
  const [pendApp, setPendApp] = useState([])
  const [accApp, setAccdApp] = useState([])
  const [comApp, setComApp] = useState([])
  const [cenApp, setCenApp] = useState([])
  const [showChangeApp, setShowChangeApp] = useState(false)
  const [cngAppId, setCngAppId] = useState("")
  const [f, setf] = useState()
  //slicer for user info
  const { userInfo } = useSelector((state) => state.userLogin)
  //def dispatch
  const dispatch = useDispatch()
  //slicer for appointments
  const { succes } = useSelector((state) => state.cancelAppointment)

  //initial get appointments
  useEffect(() => {
    dispatch(getAppointments(userInfo.appointments))
  }, [dispatch, userInfo.appointments])
  //slicer for appointments
  const { loading, apptsInfo, error } = useSelector(
    (state) => state.userAppointment
  )

  const showItem = (str) => {
    if (apptsInfo) {
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
        if (str === "Pending" && pendApp.length === 0) {
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
        if (str === "Accepted" && accApp.length === 0) {
          setAccdApp((old) => [
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
        if (str === "Completed" && comApp.length === 0) {
          setComApp((old) => [
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
        if (str === "Cancelled" && cenApp.length === 0) {
          setCenApp((old) => [
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
  }
  //close modal window
  const handleCloseModal = () => {
    setShowChangeApp(true)
  }
  const updateApp = () => {
    setf(true)
  }
  return (
    <Accordion>
      {error && <Message variant='danger'>{error}</Message>}
      {succes && (
        <Message variant='success'>"Appointment was canceled"</Message>
      )}
      {loading && <Loader />}
      <Accordion.Item
        eventKey='0'
        className='border-top'
        onClick={() => showItem("Pending")}
      >
        <Accordion.Header>{usappstr[0]}</Accordion.Header>
        <Accordion.Body>
          {pendApp.length > 0 ? (
            pendApp.map((pa) => (
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
          ) : (
            <p className='text-muted'>No Pending Appointment</p>
          )}
        </Accordion.Body>
      </Accordion.Item>
      <ModalAppointment
        show={showChangeApp}
        handleCloseModal={() => setShowChangeApp(false)}
        appointment={cngAppId}
        updateApp={updateApp}
      />
      <Accordion.Item
        eventKey='1'
        className='border-top'
        onClick={() => showItem("Accepted")}
      >
        <Accordion.Header>{usappstr[1]}</Accordion.Header>
        <Accordion.Body>
          {accApp.length > 0 ? (
            accApp.map((pa) => (
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
          ) : (
            <p className='text-muted'>No Accepted Appointment</p>
          )}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey='2'
        className='border-top'
        onClick={() => showItem("Completed")}
      >
        <Accordion.Header>{usappstr[2]}</Accordion.Header>
        <Accordion.Body>
          {comApp.length > 0 ? (
            comApp.map((pa) => (
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
          ) : (
            <p className='text-muted'>No Completed Appointment</p>
          )}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey='3'
        className='border-top'
        onClick={() => showItem("Cancelled")}
      >
        <Accordion.Header>{usappstr[3]}</Accordion.Header>
        <Accordion.Body>
          {cenApp.length > 0 ? (
            cenApp.map((pa) => (
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
          ) : (
            <p className='text-muted'>No Cancelled Appointment</p>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default ManageAppointment
