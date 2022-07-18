import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { useLocation } from "react-router-dom"

import {
  Container,
  Row,
  Stack,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap"

import {
  getAppointments,
  cancelAppointmentById,
  updateAppointment,
} from "../actions"

import {
  AccountManager,
  MyCalendar,
  ManageAppointment,
} from "../components/userDashborad"

const DbUser = () => {
  const [appts, setAppts] = useState()
  const dispatch = useDispatch()
  //slicers
  const { userInfo } = useSelector((state) => state.userLogin)
  const { succes } = useSelector((state) => state.cancelAppointment)

  useEffect(() => {
    dispatch(getAppointments(userInfo.appointments))
  }, [])

  const { apptsInfo, error, loading } = useSelector(
    (state) => state.userAppointment
  )
  useEffect(() => {
    if (apptsInfo !== undefined) {
      setAppts({ apptsInfo, error, loading })
    }
  }, [apptsInfo])

  //work with browser url
  const urlLocation = useLocation()

  const typeOfPage = urlLocation.pathname.split("/")[2]

  const cancelAppointment = (id) => {
    dispatch(cancelAppointmentById(id))
    dispatch(getAppointments(userInfo.appointments))
  }
  const updateAppointmentHandler = (apt) => {
    dispatch(
      updateAppointment(apt._id, apt.services, apt.location, apt.datetime)
    )
    dispatch(getAppointments(userInfo.appointments))
    // const updatingAppts = (aid, apptServices, apptLocation, td) => {
  }

  return (
    <Stack className='m-0 vh-80'>
      <Container>
        <h6 className='text-dark my-3'>
          <strong>{`Welcome, ${userInfo.name}`}</strong>
        </h6>
      </Container>
      <hr className='m-0' />
      <Container className='border '>
        <Row>
          <Col lg={3} md={5} sm={12} className='border p-0'>
            <ButtonGroup vertical className='w-100 bg-white'>
              <LinkContainer to='/dashboard/manage'>
                <Button
                  active={typeOfPage === "manage"}
                  variant='light'
                  className='menu-btn text-start'
                >
                  <i className='bi bi-list-task me-2'></i> Manage Appointments
                </Button>
              </LinkContainer>
              <LinkContainer to='/dashboard/calendar'>
                <Button
                  active={typeOfPage === "calendar"}
                  variant='light'
                  className='menu-btn text-start'
                >
                  <i className='bi bi-calendar3 me-2'></i> My Calendar
                </Button>
              </LinkContainer>
              <LinkContainer to='/dashboard/account'>
                <Button
                  active={typeOfPage === "account"}
                  variant='light'
                  className='menu-btn text-start'
                >
                  <i className='bi bi-person-circle me-2'></i>Account Manager
                </Button>
              </LinkContainer>
            </ButtonGroup>
          </Col>
          <Col lg={9} md={7} sm={12} className='my-4 px-4'>
            {typeOfPage === "manage" ? (
              appts !== undefined &&
              userInfo && (
                <ManageAppointment
                  appts={appts}
                  userInfo={userInfo}
                  cancelAppointment={cancelAppointment}
                  updateAppointmentHandler={updateAppointmentHandler}
                />
              )
            ) : typeOfPage === "calendar" ? (
              appts !== undefined && <MyCalendar appts={appts} />
            ) : (
              <AccountManager />
            )}
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}

export default DbUser
