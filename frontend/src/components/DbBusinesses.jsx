import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
  Container,
  Row,
  Stack,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {
  BusinessManager,
  BusinessSchedule,
  BusinessGallery,
  BusinessServices,
  BusinessLocations,
  BusinessCalendar,
  BusinessAppointments,
  PageHeader,
} from "../components/businessDashboard"
import { useEffect } from "react"

const DbBusinesses = () => {
  const [btnsState, setBtnsState] = useState(7)
  const [isBI, setisBI] = useState(false)
  const [business, setBusiness] = useState()
  //const for work with url
  const history = useNavigate()

  //slicer for business info
  const { businessInfo } = useSelector((state) => state.businessLogin)
  useEffect(() => {
    if (businessInfo !== undefined) {
      setBusiness(() => businessInfo)
    } else {
      setisBI(false)
    }
  }, [businessInfo])

  const retComp = () => {
    switch (btnsState) {
      case 7:
        return <BusinessManager />
      case 6:
        return <BusinessSchedule />
      case 5:
        return <BusinessGallery />
      case 4:
        return <BusinessServices />
      case 3:
        return <BusinessLocations />
      case 2:
        return <BusinessCalendar />
      case 1:
        return <BusinessAppointments businessInfo={businessInfo} />
      default:
        break
    }
  }

  return (
    <Stack className='m-0'>
      <PageHeader businessInfo={businessInfo} />
      <hr className='m-0' />
      <Container>
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
                <i className='bi bi-geo-alt-fill me-2'></i> My Locations
              </Button>
              <Button
                active={btnsState === 4}
                variant='light'
                className='menu-btn text-start'
                onClick={() => setBtnsState(4)}
              >
                <i className='bi bi-person-circle me-2'></i> My Services
              </Button>
              <Button
                active={btnsState === 5}
                variant='light'
                className='menu-btn text-start'
                onClick={() => setBtnsState(5)}
              >
                <i className='bi bi-image me-2'></i> My Gallery
              </Button>
              <Button
                active={btnsState === 6}
                variant='light'
                className='menu-btn text-start'
                onClick={() => setBtnsState(6)}
              >
                <i className='bi bi-clock me-2'></i> My Schedule
              </Button>
              <Button
                active={btnsState === 7}
                variant='light'
                className='menu-btn text-start'
                onClick={() => setBtnsState(7)}
              >
                <i className='bi bi-person-circle me-2'></i>Account Manager
              </Button>
            </ButtonGroup>
          </Col>
          <Col lg={9} md={7} sm={12} className='my-4 px-4'>
            {retComp()}
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}

export default DbBusinesses
