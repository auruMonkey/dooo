import React, { useState } from "react"
import { Row, Col, Button, Container, Card, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { DUMMY_SERVICES_LINE } from "../assets/dummy/dummyservices"

const AddBusiness = () => {
  const history = useNavigate()

  const buttonClickHandler = () => {
    history(`/addbusiness`)
  }

  return (
    <div className='mx-auto text-center '>
      <h5 className='add-business-title'>Add your business</h5>
      <h6 className='add-business-slogan'>Get Listed on DooMoble</h6>

      <Row className='justify-content-md-center text-center my-4'>
        {DUMMY_SERVICES_LINE.map((e) => (
          <Col lg={2} md={6} sm={12} key={e.id}>
            <Card
              className='addbusiness-card-card '
              // onClick={() => clickHandler(e.id)}
            >
              <Card.Img
                className='addbusiness-card-img mx-auto '
                variant='top'
                src={e.image}
              />
              <Card.Body>
                <Card.Text className='addbusiness-card-title'>
                  {e.name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button
        variant='outline-dark'
        size='lg'
        className='add-business-button'
        onClick={buttonClickHandler}
      >
        Add Business
      </Button>
    </div>
  )
}

export default AddBusiness
