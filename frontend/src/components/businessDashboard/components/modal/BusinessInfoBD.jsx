import React from "react"
import { Row, Col } from "react-bootstrap"
import { Raiting, Persona } from "../../../../components"

const BusinessInfoBD = ({ avatar, name, rating }) => {
  return (
    <>
      {avatar && name && rating ? (
        <Row className=' justify-content-start'>
          <Col className='col-md-auto'>
            <Persona img={avatar} />
          </Col>
          <Col className='col-md-auto my-2'>
            <span>
              <strong className='my-2'>{name}</strong>
              <div className='my-2'>
                <Raiting value={rating} />
              </div>
            </span>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </>
  )
}

export default BusinessInfoBD
