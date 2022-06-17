import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
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
              <Button
                active={btnsState === 1}
                variant='light'
                className='menu-btn text-start'
                onClick={() => setBtnsState(1)}
              >
                <i className='bi bi-list-task me-2'></i> Manage Appointments
              </Button>
              <Button
                active={btnsState === 2}
                variant='light'
                className='menu-btn text-start'
                onClick={() => setBtnsState(2)}
              >
                <i className='bi bi-calendar3 me-2'></i> My Calendar
              </Button>
              <Button
                active={btnsState === 3}
                variant='light'
                className='menu-btn text-start'
                onClick={() => setBtnsState(3)}
              >
                <i className='bi bi-person-circle me-2'></i>Account Manager
              </Button>
            </ButtonGroup>
          </Col>
          <Col lg={9} md={7} sm={12} className='my-4 px-4'>
            {btnsState === 3 ? (
              <AccountManager />
            ) : btnsState === 2 ? (
              <MyCalendar />
            ) : (
              <ManageAppointment />
            )}
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}

export default DbUser
