import React from "react"
import { Col, Container, Row, Stack } from "react-bootstrap"
import Subscribe from "./Subscribe"
import Logo from "./Logo"
import MediaIcon from "./MediaIcon"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='footer-main mt-auto pt-5'>
      <Container>
        <Logo width='4rem' height='4rem' />
        <Row className='d-flex justify-content-start'>
          <Col sm={12} md={12} lg={6}>
            <Stack>
              <div>
                <h6 className='mt-3'>EMAIL</h6>
                <a href='mailto:contact@doomoble.com' className='footer-email'>
                  contact@doomoble.com
                </a>
              </div>
              <div>
                <h6 className='mt-4'>HEADQUARTERS</h6>
                <span>Dover, Delaware, USA</span>
              </div>
              <MediaIcon />
            </Stack>
          </Col>
          <Col sm={12} md={12} lg={6}>
            <Subscribe />
          </Col>
        </Row>
        <Row className='text-center pb-4 footer-allright'>
          <Col id='copyright'>{currentYear} All right reserved | DooMoble</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
