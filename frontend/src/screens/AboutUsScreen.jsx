import React from "react"
import { Stack, Row, Container, Col, Button, Image } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Top } from "../components"
import img1 from "../assets/Rectangle21.png"
import img4 from "../assets/Rectangle24.png"

const AboutUsScreen = () => {
  return (
    <Stack direction='vertical'>
      <Row className='m-0 justify-content-md-center '>
        <Top text='About Us'>
          <span className='top-slogan mb-5'>
            Everything you need to know about DooMoble
          </span>
        </Top>
      </Row>
      <div
        className='m-0 justify-content-md-center '
        style={{ backgroundColor: "white" }}
      >
        <Container className='aus-continens-primo p-5'>
          <Row className='p-0 m-0'>
            <Col lg={6} md={6} sm={12}>
              <div className='d-flex flex-column'>
                <span className='px-lg-5' style={{ color: "black" }}>
                  <p>
                    DooMoble is designed for small entrepreneur who take their
                    Business to the customer. By creating easy online
                    accessibility, Customers can search, review and book
                    appointments in the comfort of their home and build great
                    relationships with their favorite small businesses in their
                    area. Customers and businesses are required to have a
                    profile, so reservations and easy contact can be maintained
                    and followed through. DooMoble is also designed to help
                    customers and businesses conduct safe transactions and
                    encounters, because at DooMoble, safety is first. We ensure
                    that all users of DooMoble identify themselves with
                    government Identification, pictures, online activity, email,
                    current address, and phone number. Plus, both parties will
                    be a member of your site. Yes! your site, once you’re a
                    member you are part of a growing community where you can tap
                    into anywhere you travel. So welcome to your DooMoble
                    community and spread the word
                  </p>
                </span>
                <div className='aus-button mx-lg-5 py-5'>
                  <LinkContainer to='/addbusiness'>
                    <Button variant='dark'>Add Your Business</Button>
                  </LinkContainer>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Row className='my-sm-3'>
                <Col lg={6} md={12} sm={12}>
                  <Image
                    style={{
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "50% 50%",
                    }}
                    src='https://res.cloudinary.com/deveke/image/upload/v1655260537/tqycvtwco7gdm4kcmqnh.jpg'
                    fluid
                  />
                </Col>
                <Col lg={6} md={12} sm={12} className='align-self-end mt-1'>
                  <Image
                    src='https://res.cloudinary.com/deveke/image/upload/v1655757855/cpgjb7mv521hnaifkgxh.png'
                    fluid
                  />
                </Col>
              </Row>
              <Row className='my-3 '>
                <Col lg={5} md={12} sm={12}>
                  <Image
                    style={{ objectFit: "cover" }}
                    src='https://res.cloudinary.com/deveke/image/upload/v1655757900/kuman7pja4q3pja0wqtg.png'
                    fluid={true}
                  />
                </Col>
                <Col lg={7} md={12} sm={12} className='mt-1'>
                  <Image
                    src='https://res.cloudinary.com/deveke/image/upload/v1655260514/softlouiwfb3bbyuzau8.png'
                    fluid
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='aus-continens-secundo p-5'>
        <Container>
          <Row>
            <Col lg={5} md={6} sm={12} className='mx-lg-5'>
              <h2 className='aus-h2-black'>
                <span className='aus-h2-white'>Choose a </span>mobile business
                <span className='aus-h2-white'> and </span> schedule a service
                <span className='aus-h2-white'> today!</span>
              </h2>
            </Col>
            <Col lg={5} md={6} sm={12} className='mx-lg-5  text-center mt-2'>
              <LinkContainer to='/services'>
                <Button variant='dark'>Search Businesses</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </div>
    </Stack>
  )
}

export default AboutUsScreen
