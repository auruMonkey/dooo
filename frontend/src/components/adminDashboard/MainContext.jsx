import React, { useState, useEffect } from "react"
import {
  ListGroup,
  Col,
  Row,
  Toast,
  ToastContainer,
  ButtonGroup,
  Modal,
} from "react-bootstrap"
import { useSelector } from "react-redux"

import { Persona, ButtonShadow } from "../../components"

const MainContext = ({
  item,
  showMain,
  showPreview,
  setShowMain,
  setShowPreview,
  deleteClickHandler,
  approvedHandler,
}) => {
  const [switchFilter, setSwitchFilter] = useState(false)
  const [toast, setToast] = useState(false)
  const [categoryChosenName, setCategoryNameChosen] = useState(item.category)
  const { loading, settingsInfo, error } = useSelector(
    (state) => state.settingsUp
  )
  useEffect(() => {
    if (settingsInfo !== null && settingsInfo !== undefined) {
      //   setUserServices(settingsInfo[0].usersServices)
      getFullName()
    }
  }, [settingsInfo])

  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ("" + phoneNumberString).replace(/\D/g, "")
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3]
    }
    return null
  }
  const getFullName = () => {
    let fn = {}
    if (settingsInfo !== undefined) {
      fn = settingsInfo[0].mainServices.find(
        (o) => o.shortName === item.category
      )
      if (fn !== undefined) {
        setCategoryNameChosen(fn.name)
      } else {
        fn = settingsInfo[0].usersServices.find(
          (o) => o.shortName === item.category
        )
        setCategoryNameChosen(fn.name)
      }
    }
  }
  return (
    <Modal show={showMain} onHide={() => setShowMain(false)} centered>
      <Modal.Header>
        <Modal.Title>Manage Member</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-white'>
        <ListGroup className='bg-white'>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            <Persona img={item.avatar.path} />
          </ListGroup.Item>
          {item.role === "business" && (
            <>
              <ListGroup.Item
                className='bg-white border-0'
                style={{ color: "black" }}
              >
                {` Business Name: ${item.businessName}`}
              </ListGroup.Item>
              <ListGroup.Item
                className='bg-white border-0'
                style={{ color: "black" }}
              >
                {` Category: ${categoryChosenName}`}
              </ListGroup.Item>
            </>
          )}

          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            {` Member ID: ${item._id}`}
          </ListGroup.Item>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            {` Name: ${item.name}`}
          </ListGroup.Item>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            {`Email: ${item.email}`}
          </ListGroup.Item>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          >
            {`Phone: ${formatPhoneNumber(item.phone)}`}
          </ListGroup.Item>
          <ListGroup.Item
            className='bg-white border-0'
            style={{ color: "black" }}
          ></ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      {/* <Modal.Footer> */}
      <>
        <Row className='m-3 '>
          <Col xl={6} md={6} xs={12}>
            {item.approved ? (
              <div>
                <span className='text-success me-1'>
                  Approved <i className='bi bi-check-lg'></i>
                </span>
                <ButtonShadow
                  text='Preview'
                  handleOnClick={() => {
                    setShowPreview(true)
                    setShowMain(false)
                  }}
                />
              </div>
            ) : item.approved !== undefined ? (
              <ButtonGroup className='gap-3'>
                <ButtonShadow
                  text='Approve'
                  bgcolor='#198754'
                  color='#fff'
                  handleOnClick={approvedHandler}
                />
                <ButtonShadow
                  text='Preview'
                  handleOnClick={() => {
                    setShowPreview(true)
                    setShowMain(false)
                  }}
                />
              </ButtonGroup>
            ) : (
              ""
            )}
          </Col>
          <Col xl={6} md={6} xs={12}>
            <ButtonGroup>
              <div
                className={
                  switchFilter
                    ? "tap-button-active ms-auto"
                    : "tap-button ms-auto"
                }
                onClick={() => {
                  setToast(true)
                }}
              >
                Delete Member
              </div>
              <div
                className={switchFilter ? "tap-button-active" : "tap-button"}
                onClick={() => {
                  setSwitchFilter(true)
                  setShowMain(false)
                }}
              >
                Close <i className='bi bi-x-lg'></i>
              </div>
            </ButtonGroup>
          </Col>
        </Row>

        <ToastContainer className='p-3' position='middle-center'>
          <Toast show={toast} onClose={() => setToast(false)}>
            <Toast.Header className='bg-white text-dark'>
              <strong className='me-auto '>
                Are you sure you want to delete
              </strong>
            </Toast.Header>
            <Toast.Body className='bg-white'>
              <Row className='justify-content-end '>
                <Col xs={4}>
                  <div
                    className={
                      switchFilter
                        ? "tap-button-active text-center"
                        : "tap-button text-center"
                    }
                    style={{ background: "#228B22", color: "white" }}
                    onClick={() => {
                      setToast(false)
                      setShowMain(false)
                      deleteClickHandler()
                    }}
                  >
                    Ok
                  </div>
                </Col>
                <Col xs={4}>
                  <div
                    className={
                      switchFilter
                        ? "tap-button-active text-center"
                        : "tap-button text-center"
                    }
                    onClick={() => {
                      setToast(false)
                      setSwitchFilter(true)
                    }}
                  >
                    Cancel
                  </div>
                </Col>
              </Row>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </>
      {/* </Modal.Footer> */}
    </Modal>
  )
}

export default MainContext
