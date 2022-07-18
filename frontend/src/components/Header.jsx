import React, { useEffect, useState } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { ButtonPanel, Logo } from "../components"
import { logout, logoutB } from "../actions"

const Header = () => {
  //defined dispatch
  const dispatch = useDispatch()
  //slicer for user info

  const logoutHandlers = (str) => {
    if (str === "user") {
      dispatch(logout())
    } else if (str === "bus") {
      dispatch(logoutB())
    } else if (str === "admin") {
      window.sessionStorage.removeItem("adminInfo")
    }
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Logo width='2.75rem' height='2.75rem' />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='justify-content-start'
          >
            <Nav className='me-auto'>
              <Nav.Item className='ms-lg-2 me-lg-2'>
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item className='mx-lg-2'>
                <LinkContainer to='/aboutus'>
                  <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item className='mx-lg-2'>
                <LinkContainer to='/contact'>
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item className='mx-lg-2'>
                <LinkContainer to='/search'>
                  <Nav.Link>Services</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>

            {
              <ButtonPanel
                // userInfo={userInfo}
                // businessInfo={businessInfo}
                logoutHandlers={logoutHandlers}
              />
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
