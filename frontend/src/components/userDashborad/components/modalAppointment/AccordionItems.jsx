import React from "react"
import { Accordion, Col, Image, Row } from "react-bootstrap"
import { usappstr } from "../../../strings"
import { ButtonShadow } from "../../../../components"
import { useState } from "react"
import { useEffect } from "react"

const AccordionItems = ({
  ek,
  act,
  clickAccItemHandler,
  openApn,
  openModal,
}) => {
  const [ekl, setEkl] = useState()
  const [actl, setActl] = useState()
  const [openApnl, setOpenApnl] = useState()

  useEffect(() => {
    setEkl(() => ek)
    setActl(() => act)
    setOpenApnl(() => openApn)
  }, [ek, act, openApn])

  return (
    <Accordion.Item
      eventKey={ekl}
      className='border-top'
      onClick={() => clickAccItemHandler(actl)}
    >
      <Accordion.Header>{`${actl} ${usappstr}`}</Accordion.Header>
      <Accordion.Body>
        {openApnl
          ? openApnl.map((pa) => (
              <Row key={pa.addr} className='mb-3'>
                <Col lg={1} md={2} xs={12} className='text-start p-0 me-3'>
                  <Image
                    src={pa.avt}
                    className='avatar-user-manager me-3 shadow img-fluid'
                  />
                </Col>
                <Col lg={6} md={6} xs={12} className='text-start p-0'>
                  <h6 className='text-dark'>
                    <strong>{pa.addr}</strong>
                  </h6>
                  <p>{pa.datetime}</p>
                </Col>
                <Col lg={2} md={2} xs={12} className='border rounded '>
                  <div className='d-flex flex-row justify-content-center h-100 align-items-center'>
                    <i
                      className='bi bi-clock-fill me-2'
                      style={{ color: "orange" }}
                    ></i>
                    <strong>{pa.status}</strong>
                  </div>
                </Col>
                <Col
                  lg={2}
                  md={2}
                  xs={12}
                  className='d-flex align-items-center justify-content-end'
                >
                  <ButtonShadow
                    icon='bi bi-three-dots-vertical'
                    handleOnClick={() => {
                      openModal()
                    }}
                  />
                </Col>
              </Row>
            ))
          : ""}
        {openApnl.length === 0 && (
          <p className='text-muted'>{`No ${actl} ${usappstr}`}</p>
        )}
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default AccordionItems
