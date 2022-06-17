import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Row, Col, Card, Container, Image } from "react-bootstrap"
import { useSelector } from "react-redux"

import { DUMMY_SERVICES_LINE } from "../assets/dummy/dummyservices"
import { useParams } from "react-router-dom"
import { Loader, SvgIcon, Message } from "../components"



export const ServicesLine = () => {
  const chunkSize = 1
  const { category } = useParams()
  return (
    <Container>
      <Row className='justify-content-md-center text-center mb-4'>
        {DUMMY_SERVICES_LINE.map((e) => {
          return (
            <Col lg={chunkSize} md={3} xs={6} key={e.id}>
              <Image variant='top' src={e.image} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export const ServicesLineTwo = () => {
  const { loading, settingsInfo, error } = useSelector(
    (state) => state.settingsUp
  )
  const sampleLocation = useLocation()
  const location = sampleLocation.pathname.split("/")
  const categoryRet = (name, iconEl, iconSz) => {
    return (
      <Col lg={1} md={3} xs={6}>
        <Link to={`/search/${name}`}>
          {location[2] === name ? (
            <div className='slt-img-w'>
              <SvgIcon
                stroke='black'
                fill='black'
                comp={iconEl}
                size={iconSz}
                sz='30'
              />
            </div>
          ) : (
            <div className='slt-img-b'>
              <SvgIcon
                stroke='white'
                fill='white'
                comp={iconEl}
                size={iconSz}
                sz='30'
              />
            </div>
          )}
        </Link>
      </Col>
    )
  }
  return (
    <Container>
      <Row className='justify-content-md-center text-center mb-4'>
        {loading ? (
          <Loader />
        ) : (
          settingsInfo[0].mainServices.map((ms) => {
            return categoryRet(ms.shortName, ms.icon.element, ms.icon.size)
          })
        )}
      </Row>
    </Container>
  )
}
