import React, { useState, useEffect } from "react"
import { Button, Dropdown, ButtonGroup, Image, Stack } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector } from "react-redux"

const ButtonPanel = ({ logoutHandlers }) => {
  const [defaultButt, setDefaultButt] = useState(true)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { businessInfo } = useSelector((state) => state.businessLogin)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const adminStorage = window.sessionStorage.getItem("adminInfo")

  useEffect(() => {
    setDefaultButt(true)
  }, [])

  useEffect(() => {
    if (userInfo) {
      setDefaultButt(false)
    } else if (businessInfo) {
      setDefaultButt(false)
    } else if (adminInfo !== undefined || adminStorage !== null) {
      setDefaultButt(false)
    }
  }, [adminInfo, userInfo, businessInfo])

  const logoutHandler = () => {
    if (userInfo) {
      setDefaultButt(true)
      logoutHandlers("user")
    } else if (businessInfo) {
      setDefaultButt(true)
      logoutHandlers("bus")
    } else {
      setDefaultButt(true)
      logoutHandlers("admin")
    }
  }

  return (
    <>
      {defaultButt ? (
        <Stack direction='horizontal'>
          <LinkContainer to='/signin/user'>
            <Button variant='outline-dark' className='me-4 btn-sm btn-crack'>
              User Sign Up/Sign In
            </Button>
          </LinkContainer>
          <LinkContainer to='/signin/business'>
            <Button variant='warning' className='btn-sm'>
              Business Sign Up/Sign In
            </Button>
          </LinkContainer>
        </Stack>
      ) : adminInfo !== undefined ? (
        <Dropdown as={ButtonGroup}>
          <>
            <LinkContainer to='/'>
              <Button
                variant='outline-dark'
                className='me-4 btn-sm btn-crack'
                onClick={logoutHandler}
              >
                Sign Out
              </Button>
            </LinkContainer>
            <LinkContainer to='/admindashboard'>
              <Button variant='outline-dark' className='me-4 btn-sm btn-crack'>
                Dashboard
              </Button>
            </LinkContainer>
          </>
        </Dropdown>
      ) : businessInfo ? (
        <>
          <Image src={businessInfo.avatar.path} className='header-avatar' />

          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              id='dropdown-user'
              variant='dark-outline'
              className='dropdown-btn-menu btn-sm ms-4'
            >
              <span>Menu</span>
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
              <>
                <LinkContainer to='/dashboard'>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </LinkContainer>
                <LinkContainer to='/'>
                  <Dropdown.Item onClick={logoutHandler}>
                    Sign Out
                  </Dropdown.Item>
                </LinkContainer>
              </>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : userInfo ? (
        <>
          <Image
            src={userInfo.avatar.path ? userInfo.avatar.path : ""}
            className='header-avatar'
          />

          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              id='dropdown-user'
              variant='dark-outline'
              className='dropdown-btn-menu btn-sm ms-4'
            >
              <span>Menu</span>
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
              <>
                <LinkContainer to='/dashboard'>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </LinkContainer>
                <LinkContainer to='/'>
                  <Dropdown.Item onClick={logoutHandler}>
                    Sign Out
                  </Dropdown.Item>
                </LinkContainer>
              </>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default ButtonPanel
