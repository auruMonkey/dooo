import React from "react"
import {
  Container,
  Navbar,
  Nav,
  Button,
  Dropdown,
  ButtonGroup,
  Image,
  Stack,
} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Logo from "../components/Logo"
import { logout } from "../actions/userActions"
import { logoutB } from "../actions/businessActions"

const Header = () => {
  //defined dispatch
  const dispatch = useDispatch()

  //slicer for user info
  const { userInfo } = useSelector((state) => state.userLogin)
  const { businessInfo } = useSelector((state) => state.businessLogin)

  //logout handler
  const logoutHandler = () => {
    if (userInfo) {
      dispatch(logout())
    } else {
      dispatch(logoutB())
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
                <LinkContainer to='search/allbusinesses'>
                  <Nav.Link>Services</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
            {userInfo ? (
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
            ) : businessInfo ? (
              <>
                <Image
                  src={businessInfo.avatar.path}
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
              <Stack direction='horizontal'>
                <LinkContainer to='/signin/user'>
                  <Button
                    variant='outline-dark'
                    className='me-4 btn-sm btn-crack'
                  >
                    User Sign Up/Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to='/signin/business'>
                  <Button variant='warning' className='btn-sm'>
                    Business Sign Up/Sign In
                  </Button>
                </LinkContainer>
              </Stack>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
