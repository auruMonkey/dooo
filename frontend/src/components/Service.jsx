import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Raiting from "./Raiting"

const Service = ({ service }) => {
  const dummyPic =
    "https://res.cloudinary.com/deveke/image/upload/v1654994715/vsymmz5fmd0df2iuyg1x.jpg"
  return (
    <Card className='my-3 p-3 rounded border-0 text-start sc-card'>
      {service !== null ? (
        <Link
          to={`/service/${service.category}/${service._id}`}
          className='ser-card'
        >
          <Card.Img
            src={service.mainPicture ? service.mainPicture : dummyPic}
            variant='top'
            className='sc-image ms-3 '
          />
          <Card.Body className='mt-auto'>
            <Card.Title as='h6' style={{ color: "black" }}>
              <strong>{service ? service.businessName : ""}</strong>
            </Card.Title>
            <Card.Text as='p'>
              {service ? service.locations[0].address : ""}
            </Card.Text>
            <Card.Text as='div'>
              <Raiting value={service ? service.rating : 0} />
            </Card.Text>
          </Card.Body>
        </Link>
      ) : (
        ""
      )}
    </Card>
  )
}

export default Service
