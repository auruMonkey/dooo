import React from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import Icon1 from "../../assets/icons/Group30.svg"
import Icon2 from "../../assets/icons/group40.svg"
import Icon3 from "../../assets/icons/group50.svg"
import {
  hseso,
  hsest,
  hsesth,
  hsescto,
  hsesctto,
  hsesctt,
  hsescttt,
  hsesctth,
  hsescttth,
  hsesbt,
} from "../strings.js"

const Engage = () => {
  const engCard = (ic, title, text) => {
    return (
      <Card className='engage-card my-5'>
        <Card.Img
          className='mx-auto engage-card-image'
          variant='top'
          src={ic}
        />
        <Card.Body>
          <Card.Title className='engage-card-title'>{title}</Card.Title>
          <Card.Text className='engage-card-text'>{text}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
  return (
    <div className='mx-auto text-center mb-5'>
      <h4 className='review-title mt-5'>
        {hseso}
        <span className='engage-title-span'>{hsest}</span>
        {hsesth}
      </h4>
      <Row className='mx-auto text-center'>
        <Col lg={4} md={4} sm={12}>
          {engCard(Icon1, hsescto, hsesctto)}
        </Col>
        <Col lg={4} md={4} sm={12}>
          {engCard(Icon2, hsesctt, hsescttt)}
        </Col>
        <Col lg={4} md={4} sm={12} className=''>
          {engCard(Icon3, hsesctth, hsescttth)}
        </Col>
      </Row>
      <Button variant='outline-dark' className='engage-btn'>
        {hsesbt}
      </Button>
    </div>
  )
}

export default Engage
