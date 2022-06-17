import React, { useEffect, useState } from "react"
import { Accordion, Col, Row, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { getAppointments } from "../../actions/userActions"
import { Loader, Message } from "../../components"

const ManageAppointment = () => {
  //slicer for user info
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, apptsInfo, error } = useSelector(
    (state) => state.getUserAppointment
  )
  const [pendApp, setPendApp] = useState([])
  const [accApp, setAccApp] = useState([])
  const [compApp, setCompApp] = useState([])
  const [cancApp, setCancApp] = useState([])

  //def dispatch
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAppointments(userInfo.appointments))
  }, [])

  const separApp = () => {}

  const showItem = (str) => {
    if (apptsInfo) {
      const hhh = apptsInfo.filter((x) => {
        return x.userstatus === str
      })
      setPendApp(hhh)
    }
  }
  return (
    <Accordion>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Accordion.Item
        eventKey='0'
        className='border-top'
        onClick={() => showItem("Pending")}
      >
        <Accordion.Header>Pending Appointments</Accordion.Header>
        <Accordion.Body>
          {pendApp.length > 0
            ? pendApp.map((pa) => (
                <Row>
                  <Col>
                    {/* <Image
                src={userInfo ? userInfo.avatar.path : ""}
                className='avatar-user-manager me-3 shadow '
              /> */}
                  </Col>
                  <Col>{pa.location.address} and Data</Col>
                  <Col>stat8us</Col>
                  <Col>change button</Col>
                </Row>
              ))
            : ""}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='1' className='border-top'>
        <Accordion.Header>Accepted Appointments</Accordion.Header>
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
        <Accordion.Header>Completed Appointments</Accordion.Header>
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
        <Accordion.Header>Cancelled Appointments</Accordion.Header>
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
