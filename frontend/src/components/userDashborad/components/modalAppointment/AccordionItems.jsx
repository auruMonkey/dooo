import React from "react"
import { Accordion, Col, Image, Row } from "react-bootstrap"
import { usappstr } from "../../../strings"
import { ButtonShadow } from "../../../../components"
import { useState } from "react"
import { useEffect } from "react"

const AccordionItems = ({ ek, act, openApn, openModal, color, icon }) => {
  const [openApnl, setOpenApnl] = useState()

  useEffect(() => {
    if (openApn !== []) {
      setOpenApnl(() => openApn)
    }
  }, [openApn])

  return (
    <Accordion.Item eventKey={ek} className='border-top'>
      <Accordion.Header>{`${act} ${usappstr}`}</Accordion.Header>
      <Accordion.Body>
        {openApnl ? (
          openApnl.length !== 0 ? (
            openApnl.map((pa) => (
              <Row key={pa.datetime} className='mb-3'>
                <Col lg={1} md={3} xs={12} className='text-start p-0 me-3'>
                  <Image
                    src={pa.avt}
                    className='avatar-user-manager me-3 shadow img-fluid'
                  />
                </Col>
                <Col lg={6} md={7} xs={12} className='text-start p-0'>
                  <h6 className='text-dark'>
                    <strong>{pa.addr}</strong>
                  </h6>
                  <p>{pa.datetime}</p>
                </Col>
                <Col lg={2} md={6} xs={6} className='border rounded '>
                  <div className='d-flex flex-row justify-content-center h-100 align-items-center'>
                    <i className={`${icon} me-2`} style={{ color: color }}></i>
                    <strong style={{ color: color }}>{act}</strong>
                  </div>
                </Col>
                <Col
                  lg={2}
                  md={6}
                  xs={6}
                  className='d-flex align-items-center justify-content-end'
                >
                  <ButtonShadow
                    icon='bi bi-three-dots-vertical'
                    handleOnClick={() => openModal(pa.idApp, pa.idBsn)}
                  />
                </Col>
              </Row>
            ))
          ) : (
            <p className='text-muted'>{`No ${act} ${usappstr}`}</p>
          )
        ) : (
          ""
        )}
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default AccordionItems
