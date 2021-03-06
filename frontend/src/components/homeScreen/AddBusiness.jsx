import React from "react"
import { Row, Col, Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { DUMMY_SERVICES_LINE } from "../../assets/dummy/dummyservices"
import { hsabso, hsesbt, hsbst } from "../strings.js"
import { SvgIcon } from "../../components"

const AddBusiness = () => {
  const history = useNavigate()

  const buttonClickHandler = () => {
    history(`/addbusiness`)
  }

  return (
    <div className='mx-auto text-center '>
      <h5 className='add-business-title'>{hsabso}</h5>
      <h6 className='add-business-slogan'>{hsesbt}</h6>

      <Row className='justify-content-md-center text-center my-4'>
        {DUMMY_SERVICES_LINE.map((e) => (
          <Col xl={1} md={2} xs={12} key={e.id} className='m-3'>
            <Card className='addbusiness-card-card '>
              <div className='addbusiness-card-img mx-auto '>
                <SvgIcon
                  className='w-100'
                  stroke='white'
                  fill='white'
                  comp={e.icon.element}
                  size={e.icon.size}
                  sz='50px'
                />
              </div>
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
        {hsbst}
      </Button>
    </div>
  )
}

export default AddBusiness
