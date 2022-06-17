import React, { useState } from "react"
import { Button, Col, Container, Row, Stack } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import {
  Engage,
  Review,
  Servicesc,
  VideoPlayer,
  AddBusiness,
} from "../components/homeScreen"
import { Loader, Message, SearchBox, Top } from "../components"
import { hstso, hsbso, hsbst } from "../components/strings.js"

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin)

  return (
    <Stack direction='vertical' style={{ backgroundColor: "white" }}>
      <VideoPlayer />

      <Row className='m-0 justify-content-md-center '>
        <Top text='DooMoble'>
          <span className='top-slogan'>{hstso}</span>
          <SearchBox />
          <Row className='mb-4 text-center'>
            <Col md={3}></Col>
            <Col xl={12} lg={3} md={6} sm={6}>
              <LinkContainer
                to={!userInfo ? "/signin/user" : "/search/allbusinesses"}
              >
                <Button
                  variant='dark'
                  className='top-search-button btn-sm me-3'
                  style={{ marginBottom: "2rem" }}
                >
                  {hsbso}
                </Button>
              </LinkContainer>

              <LinkContainer to='/addbusiness'>
                <Button
                  variant='outline-dark '
                  className='btn-sm top-search-button-two'
                  style={{ marginBottom: "5rem" }}
                >
                  {hsbst}
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Top>
      </Row>
      <Container className='bg-white'>
        <Row className='p-0 m-0'>
          <Servicesc />
        </Row>
      </Container>
      <div className='add-business-main p-0 m-0'>
        <Container>
          <Row className='p-0 m-0'>
            <AddBusiness />
          </Row>
        </Container>
      </div>
      <div className='maphs-main'></div>
      <Container>
        <Row className='p-0 m-0'>
          <Review />
        </Row>
      </Container>
      <div className='add-business-main py-2 m-0'>
        <Container>
          <Row className='p-0 m-0'>
            <Engage />
          </Row>
        </Container>
      </div>
    </Stack>
  )
}

export default HomeScreen
