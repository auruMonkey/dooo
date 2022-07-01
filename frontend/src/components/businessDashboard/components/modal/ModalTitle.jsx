import React from "react"
import { bamstr } from "../../../strings"
import { Col, Row, CloseButton } from "react-bootstrap"

const ModalTitle = ({ icon, color, status, setAptModal }) => {
  return (
    <Row className=' h-100 align-items-center m-3 '>
      <Col as='h5' className='col-7' style={{ color: "black" }}>
        {bamstr[0]}
      </Col>
      <Col
        className='col-4 d-flex flex-row border  border-1 rounded w-auto p-3'
        as='h5'
        style={{ color: color }}
      >
        <i className={`${icon} mx-4`}></i>
        <strong>{status}</strong>
      </Col>
      <Col className='text-end'>
        <CloseButton
          variant='white'
          onClick={setAptModal}
          className='border shadow p-1 '
        />
      </Col>
    </Row>
  )
}

export default ModalTitle
