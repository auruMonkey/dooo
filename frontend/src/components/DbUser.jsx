import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"

import {
  Container,
  Row,
  Stack,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap"
import {
  AccountManager,
  MyCalendar,
  ManageAppointment,
} from "../components/userDashborad"

const DbUser = () => {
  const [btnsState, setBtnsState] = useState(3)

  //slicer for user info
  const { userInfo } = useSelector((state) => state.userLogin)
  //work with browser url
  const history = useNavigate()
  const urlLocation = useLocation()

  const typeOfPage = urlLocation.pathname.split("/")[2]
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
              <ManageAppointment />
            ) : typeOfPage === "calendar" ? (
              <MyCalendar />
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
