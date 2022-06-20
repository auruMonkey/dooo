import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  Container,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap"
import { Loader, SvgIcon, Message } from "../../components"
import { hssccto, hsscctt } from "../strings.js"

const Servicesc = () => {
  const [show, setShow] = useState(false)
  const chunkSize = 4
  const { loading, settingsInfo, error } = useSelector(
    (state) => state.settingsUp
  )
  return (
    <Container>
      <Row>
        {settingsInfo[0].mainServices.map((ms) => (
          <Col lg={chunkSize} md={6} sm={12} key={ms.shortName}>
            <Link
              to={`/search/${ms.shortName}`}
              className='servicess-card-link'
            >
              <Card className='card-main'>
                <div className='servicess-card-img mx-auto '>
                  <SvgIcon
                    className='w-100'
                    stroke='white'
                    fill='white'
                    comp={ms.icon.element}
                    size={ms.icon.size}
                    sz='50px'
                  />
                </div>

                <Card.Body>
                  <Card.Title className='servicess-card-title'>
                    {ms.name}
                  </Card.Title>
                  <Card.Text className='servicess-card-text'>
                    {hsscctt}
                    <i className='fa-solid fa-arrow-right'></i>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Servicesc
