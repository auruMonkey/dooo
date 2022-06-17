import { useState, useEffect, useRef } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import {
  addService,
  deleteService,
  editService,
} from "../../actions/businessActions"
import { ListGroup } from "react-bootstrap"
import { Form } from "react-bootstrap"

const BusinessServices = () => {
  const [isEditService, setIsEditService] = useState()
  const [newPrice, setNewPrice] = useState()
  const [newDuration, setNewDuration] = useState()
  const [newName, setNewName] = useState()
  //constante to work with add services
  const [isEdit, setIsEdit] = useState(false)
  // constante to get services
  const [allServices, setAllServices] = useState([])
  //constante to work with new service
  const [newService, setNewService] = useState({})
  const [errors, setErrors] = useState({})

  // *********** slicer for business information
  const { businessInfo } = useSelector((state) => state.businessLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    setAllServices(businessInfo.services)
  }, [setAllServices, businessInfo])

  //cancel to add services handler
  const cancelHandler = () => {
    setIsEdit(false)
    setNewService("")
    setErrors({})
  }
  //cancel to edit services handler
  const cancelEditHandler = () => {
    setIsEditService()
    setNewPrice()
    setNewDuration()
    setNewName()
  }
  //validation form function
  const validateForm = () => {
    //const for work with form
    const { name, duration, price } = newService
    const newErrors = {}

    //check name
    if (name === undefined) {
      newErrors.name = "Please enter Name of service"
    }
    //check duration
    if (duration === undefined) {
      newErrors.duration = "Please enter duration"
    }
    //check price
    if (price === undefined) {
      newErrors.price = "Please enter price"
    }

    return newErrors
  }

  //add services handler
  const addServiceHandler = () => {
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      dispatch(
        addService(
          businessInfo._id,
          newService.name,
          newService.duration,
          newService.price
        )
      )
      setErrors({})
      setIsEdit(false)
    }
  }
  // *********** delete Service handler
  const deleteServiceHandler = (id) => {
    dispatch(deleteService(businessInfo._id, id))
  }
  // *********** edit Service handler
  const editServiceHandler = (id, name, duration, price) => {
    let edServ = { name: name, duration: duration, price: price }
    if (newName) {
      edServ.name = newName
    }
    if (newPrice) {
      edServ.price = newPrice
    }
    if (newDuration) {
      edServ.duration = newDuration
    }

    dispatch(
      editService(
        businessInfo._id,
        id,
        edServ.name,
        edServ.duration,
        edServ.price
      )
    )
  }

  return (
    <div>
      <Row>
        <h6 className='text-dark mb-3'>My Services</h6>
        <Row>
          <Col lg={4} md={4} xs={4}>
            <p className='w-100 text-muted' style={{ fontSize: "0.8rem" }}>
              Name of Service
            </p>
          </Col>
          <Col lg={2} md={2} xs={4} style={{ fontSize: "0.8rem" }}>
            <p className='w-100 text-muted'>Duration (mins)</p>
          </Col>
          <Col lg={2} md={2} xs={4} style={{ fontSize: "0.8rem" }}>
            <p className='w-100 text-muted'>Price (whole $)</p>
          </Col>
        </Row>

        <ListGroup>
          {allServices.map((s) => (
            <ListGroup.Item
              className='bg-white text-dark mb-1 border-0'
              key={s._id}
            >
              <Row>
                <Col
                  lg={4}
                  md={4}
                  xs={3}
                  className='text-dark mb-1 border rounded p-2'
                >
                  <input
                    type='text'
                    className='w-100 border-0'
                    value={
                      isEditService === s._id
                        ? newName
                          ? newName
                          : s.name
                        : s.name
                    }
                    onChange={(e) => setNewName(e.target.value)}
                    disabled={isEditService !== s._id}
                  />
                </Col>
                <Col
                  lg={2}
                  md={2}
                  xs={3}
                  className='text-dark mb-1 border rounded p-2  mx-3'
                >
                  <input
                    type='number'
                    className='w-100 border-0'
                    value={
                      isEditService === s._id
                        ? newDuration
                          ? newDuration
                          : s.duration
                        : s.duration
                    }
                    onChange={(e) => setNewDuration(e.target.value)}
                    disabled={isEditService !== s._id}
                  />
                </Col>
                <Col
                  lg={2}
                  md={2}
                  xs={3}
                  className='text-dark mb-1 border rounded p-2'
                >
                  <input
                    type='number'
                    className='w-100 border-0'
                    value={
                      isEditService === s._id
                        ? newPrice
                          ? newPrice
                          : s.price
                        : s.price
                    }
                    onChange={(e) => setNewPrice(e.target.value)}
                    disabled={isEditService !== s._id}
                  />
                </Col>
                <Col className='text-end'>
                  {/* **************************** */}
                  {isEditService !== s._id ? (
                    <Button
                      type='button'
                      variant='light'
                      className='px-3 me-3 bg-white border-0 shadow text-secondary'
                      onClick={() => setIsEditService(s._id)}
                      // onClick={() => deleteServiceHandler(s._id)}
                    >
                      <i className='bi bi-pencil-fill'></i>
                    </Button>
                  ) : (
                    <>
                      <Button
                        type='button'
                        className='shadow p-2 rounded'
                        style={{
                          color: "#3b8543",
                          fontWeight: "bold",
                          backgroundColor: "white",
                          border: "none",
                          width: "auto",
                        }}
                        onClick={() =>
                          editServiceHandler(s._id, s.name, s.duration, s.price)
                        }
                      >
                        Save<i className='fa-solid fa-floppy-disk ms-2'></i>
                      </Button>
                      <Button
                        className='shadow ms-3 p-2 rounded '
                        style={{
                          color: "#d1372d",
                          fontWeight: "bold",
                          backgroundColor: "white",
                          border: "none",
                          width: "auto",
                        }}
                        onClick={() => cancelEditHandler(s._id)}
                      >
                        Cancel <i className='bi bi-x-lg ms-2'></i>
                      </Button>
                    </>
                  )}
                  {/* *********************** */}

                  <Button
                    variant='danger'
                    className='px-3 '
                    onClick={() => deleteServiceHandler(s._id)}
                  >
                    <i className='bi bi-x-lg'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      {/* *******Add new service******* */}
      {!isEdit ? (
        <Button
          type='button'
          className='shadow p-2 rounded text-end'
          style={{
            color: "#415da5",
            fontWeight: "500",
            backgroundColor: "white",
            border: "none",
            width: "auto",
          }}
          onClick={() => setIsEdit(true)}
        >
          Add Service<i className='bi bi-plus-lg ms-2'></i>
        </Button>
      ) : (
        <>
          <Row className='w-100'>
            <Col lg={4} md={4} xs={5}>
              <Form.Group>
                <Form.Control
                  type='text'
                  className=' border rounded'
                  isInvalid={!!errors.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={2} md={2} xs={3}>
              <Form.Group>
                <Form.Control
                  step={5}
                  min={0}
                  type='number'
                  className=' border rounded'
                  isInvalid={!!errors.duration}
                  onChange={(e) =>
                    setNewService({ ...newService, duration: e.target.value })
                  }
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={2} md={2} xs={3}>
              <Form.Group>
                <Form.Control
                  min={0}
                  type='number'
                  className='border rounded'
                  isInvalid={!!errors.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
                  }
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-2 ms-1'>
            <Button
              type='button'
              className='shadow p-2 rounded'
              style={{
                color: "#3b8543",
                fontWeight: "bold",
                backgroundColor: "white",
                border: "none",
                width: "auto",
              }}
              onClick={() => addServiceHandler()}
            >
              Save<i className='fa-solid fa-floppy-disk ms-2'></i>
            </Button>
            <Button
              className='shadow ms-3 p-2 rounded '
              style={{
                color: "#d1372d",
                fontWeight: "bold",
                backgroundColor: "white",
                border: "none",
                width: "auto",
              }}
              onClick={() => cancelHandler()}
            >
              Cancel <i className='bi bi-x-lg ms-2'></i>
            </Button>
          </Row>
        </>
      )}
    </div>
  )
}

export default BusinessServices
