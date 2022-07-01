import React from "react"
import { useEffect, useState } from "react"
import { Container, Row, Col, Toast, CloseButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ButtonShadow from "../UI/ButtonShadow"

const PageHeader = ({ businessInfo }) => {
  const [approved, setApproved] = useState(false)
  const [disableButton, setDisableButton] = useState({
    left: true,
    right: false,
  })
  const [idLocation, setIdLocation] = useState(0)
  const [show, setShow] = useState(false)
  const [location, setLocation] = useState([])

  const history = useNavigate()

  useEffect(() => {
    if (businessInfo) {
      if (businessInfo !== undefined) {
        setApproved(businessInfo.approved)
        setLocation(businessInfo.locations.map((s) => s))
        if (businessInfo.locations.length < 2) {
          setDisableButton(() => ({ left: true, right: true }))
        }
      }
    }
  }, [businessInfo])

  const clickPreviewHandler = () => {
    history(`/preview/${businessInfo.category}/${businessInfo._id}`)
  }

  // handler address change
  const handlAddr = (p) => {
    if (p === "right") {
      setIdLocation(idLocation + 1)
      if (idLocation + 1 === businessInfo.locations.length - 1) {
        setDisableButton({ left: false, right: true })
      }
    } else {
      setIdLocation(idLocation - 1)
      if (idLocation - 1 === 0) {
        setDisableButton({ left: true, right: false })
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col xl={2} md={2} xs={4}>
          <h6 className='text-dark my-3'>
            <strong>{`Welcome, ${businessInfo && businessInfo.name}`}</strong>
          </h6>
        </Col>
        <Col
          xl={2}
          md={2}
          xs={4}
          className='col-4 d-flex flex-row border  border-1 rounded w-auto p-3 my-2'
          as='h6'
          style={{ color: "black" }}
        >
          {approved ? (
            <>
              <i
                className='bi bi-check-circle-fill mx-3'
                style={{ color: "green" }}
              ></i>
              <strong> Approved</strong>
            </>
          ) : (
            <>
              <i
                className='bi bi-exclamation-circle-fill mx-3'
                style={{ color: "red" }}
              ></i>
              <strong> Not Approved</strong>
            </>
          )}
        </Col>

        <Col xl={2} md={2} xs={4} className='my-auto'>
          <div className='form-check form-switch my-auto'>
            <input
              className='form-check-input border rounded p-2 mt-3'
              type='checkbox'
              role='switch'
              id='publishCheck'
              checked={approved}
              onChange={() => setShow(true)}
            />
            <span style={{ fontSize: "0.9rem", color: "black" }}>
              Click to publish your page
            </span>
          </div>
        </Col>
        <Col xl={3} md={3} xs={4} className='my-4 h-100'>
          <ButtonShadow
            text='Click to preview page'
            color='#1976D2'
            icon='bi bi-eye-fill mx-3'
            handleOnClick={clickPreviewHandler}
          />
        </Col>
        <Col xl={3} md={3} xs={4}>
          <Row className='my-3'>
            <Col
              as='button'
              lg={1}
              md={1}
              sm={1}
              disabled={disableButton.left}
              className='text-center align-middle border-0 bg-white'
              onClick={() => handlAddr("left")}
            >
              <i className='fa-solid fa-angle-left'></i>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <strong>
                {location.length > 0 && location[idLocation].address}
              </strong>
            </Col>
            <Col
              as='button'
              lg={1}
              md={1}
              sm={1}
              className='text-center align-middle border-0 bg-white'
              disabled={disableButton.right}
              onClick={() => handlAddr("right")}
            >
              <i className='fa-solid fa-angle-right'></i>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className='toast-container position-fixed bottom-0 end-0 p-3'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <div className='my-auto bg-white text-dark border-0 rounded p-3'>
            <i
              className='bi bi-exclamation-circle-fill me-3'
              style={{ color: "red" }}
            ></i>
            <strong>Your business hasn't been approved yet.</strong>
            <CloseButton
              variant='white'
              onClick={() => setShow(false)}
              aria-label='Close'
            />
          </div>
        </Toast>
      </div>
    </Container>
  )
}

export default PageHeader
