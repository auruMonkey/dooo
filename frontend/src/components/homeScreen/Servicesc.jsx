import React, { useState } from "react"
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
  const chunkSize = 3

  const { loading, settingsInfo, error } = useSelector(
    (state) => state.settingsUp
  )
  return (
    <Container>
      <Row>
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : settingsInfo !== undefined ? (
          settingsInfo[0].mainServices.map((ms) => {
            return (
              <Col lg={chunkSize} md={6} sm={12} key={ms.shortName}>
                {ms.shortName === "allbusinesses" ? (
                  <>
                    <OverlayTrigger
                      trigger='click'
                      key='top'
                      placement='top'
                      overlay={
                        <Popover
                          id={`popover-positioned-top`}
                          style={{ marginBottom: "-3rem" }}
                          show={show}
                        >
                          <div className='d-flex flex-row'>
                            <Link
                              to={`/search/${ms.shortName}`}
                              className='servicess-card-link'
                            >
                              <div className='p-2 bg-white'>
                                <div
                                  className='mx-auto bg-black p-2'
                                  style={{
                                    borderRadius: "50%",
                                    width: "3.5rem",
                                    height: "3.5rem",
                                    color: "darkgrey",
                                  }}
                                >
                                  <SvgIcon
                                    className='w-100'
                                    stroke='white'
                                    fill='white'
                                    comp={ms.icon.element}
                                    size={ms.icon.size}
                                    sz='2.5rem'
                                  />
                                </div>
                                <div>
                                  <h6 className='servicess-card-title'>
                                    {ms.name}
                                  </h6>
                                </div>
                              </div>
                            </Link>
                            <Link
                              to={`/search/other`}
                              className='servicess-card-link'
                            >
                              <div className='p-2 bg-white'>
                                <div
                                  className='mx-auto bg-black p-2'
                                  style={{
                                    borderRadius: "50%",
                                    width: "3.5rem",
                                    height: "3.5rem",
                                    color: "darkgrey",
                                  }}
                                >
                                  <SvgIcon
                                    className='w-100'
                                    stroke='white'
                                    fill='white'
                                    comp="<path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />"
                                    size='0 0 16 16'
                                    sz='2.5rem'
                                  />
                                </div>
                                <div>
                                  <h6 className='servicess-card-title'>
                                    {hssccto}
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </Popover>
                      }
                    >
                      <Card
                        className='card-main'
                        onClick={() => setShow(true)}
                        style={{ cursor: "pointer" }}
                      >
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
                    </OverlayTrigger>
                  </>
                ) : (
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
                )}
              </Col>
            )
          })
        ) : (
          ""
        )}
      </Row>
    </Container>
  )
}

export default Servicesc
