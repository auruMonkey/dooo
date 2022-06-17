import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const DUMMY_REVIEWS = [
  {
    id: 1,
    name: "Sara Ortiz",
    city: "Los Angeles",
    state: "CA",
    review:
      "Couldn’t be happier with the service you guys really did a great job and I’ve already told three friends to call you.",
    image: require("../assets/reviews/Ellipse1.png"),
  },
  {
    id: 2,
    name: "Jonathan Chapman",
    city: "Venice",
    state: "CA",
    review:
      "I wasted so much time calling around and finally I found you.So quick and easy, thanks so much!",
    image: require("../assets/reviews/Ellipse2.png"),
  },
  {
    id: 3,
    name: "Jessica Everling",
    city: "Hollywood",
    state: "CA",
    review:
      "I can’t believe you were right around the corner from me for year.I should come in so much earlier.I’m so glad I finally came in, loved it!",
    image: require("../assets/reviews/Ellipse3.png"),
  },
  {
    id: 4,
    name: "James Smith",
    city: "Silver Lake",
    state: "CA",
    review:
      "One of the best new companies I’ve found in my neighborhood.So close by and you guys got the job done so quickly.I couldn’t be happier, You’re awesome!",
    image: require("../assets/reviews/Ellipse4.png"),
  },
]
const Review = () => {
  const chunkSize = 3
  return (
    <div className='mx-auto text-center mb-5'>
      <h2 className='review-title'>Our Reviews</h2>
      <h6 className='review-slogan'>What people are saying</h6>
      <Row className='mx-auto'>
        {DUMMY_REVIEWS.map((e) => (
          <Col lg={chunkSize} md={6} sm={12} key={e.id}>
            {/* <Link to={`/servicess/${e.id}`} className='servicess-card-link'> */}
            <Card className='review-card-card'>
              <Card.Img
                className='review-card-img mx-auto'
                variant='top'
                src={e.image}
              />
              <Card.Body className='d-flex flex-column'>
                <Card.Title className='review-card-title'>
                  &quot;{e.review}&quot;
                </Card.Title>
                <div className='mt-auto'>
                  <Card.Text className='review-card-name mt-5 mb-0'>
                    {e.name}
                  </Card.Text>
                  <Card.Text>
                    {e.city},{e.state}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
            {/* </Link> */}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Review
