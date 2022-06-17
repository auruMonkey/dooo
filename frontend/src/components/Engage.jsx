import React from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import Icon1 from "../assets/icons/Group30.svg"
import Icon2 from "../assets/icons/group40.svg"
import Icon3 from "../assets/icons/group50.svg"

const Engage = () => {
  return (
    <div className='mx-auto text-center mb-5'>
      <h4 className='review-title mt-5'>
        A better way to <span className='engage-title-span'>engage</span> your
        customers.
      </h4>
      <Row className='mx-auto text-center'>
        <Col lg={4} md={4} sm={12} className=''>
          <Card className='engage-card my-5'>
            <Card.Img
              className='mx-auto engage-card-image'
              variant='top'
              src={Icon1}
            />
            <Card.Body>
              <Card.Title className='engage-card-title'>Save time</Card.Title>
              <Card.Text className='engage-card-text'>
                With online scheduling you’ll save time and be more efficient.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={12} className=''>
          <Card className='engage-card my-5'>
            <Card.Img
              className='mx-auto engage-card-image'
              variant='top'
              src={Icon2}
            />
            <Card.Body>
              <Card.Title className='engage-card-title'>
                Grow your business
              </Card.Title>
              <Card.Text className='engage-card-text'>
                Watch your profits and efficiency soar. You’ll expand faster
                than you ever thought possible
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={12} className=''>
          <Card className='engage-card my-5'>
            <Card.Img
              className='mx-auto engage-card-image'
              variant='top'
              src={Icon3}
            />
            <Card.Body>
              <Card.Title className='engage-card-title'>
                Bill clients
              </Card.Title>
              <Card.Text className='engage-card-text'>
                Bill clients when they schedule an appointment with you!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button variant='outline-dark' className='engage-btn'>
        Get Listed on DooMoble
      </Button>
    </div>
  )
}

export default Engage
