import React from "react"
import { Col, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Raiting } from "../components"

const ServiceList = ({ service }) => {
  const dummyPic =
    "https://res.cloudinary.com/deveke/image/upload/v1654994715/vsymmz5fmd0df2iuyg1x.jpg"
  return (
    <div className='my-3 p-3 rounded border-0 text-start bg-white'>
      <Link
        to={`/service/${service.category}/${service._id}`}
        className='ser-card'
      >
        <Row>
          <Col>
            <Image
              src={service.mainPicture ? service.mainPicture : dummyPic}
              className='sc-image ms-3 '
            />
          </Col>
          <Col>
            <div className='mt-auto'>
              <h6 style={{ color: "black" }}>
                <strong>{service.businessName}</strong>
              </h6>
              <p>{service.locations[0].address}</p>
              <div>
                <Raiting value={service.rating} />
              </div>
            </div>
          </Col>
        </Row>
      </Link>
    </div>
  )
}

export default ServiceList
