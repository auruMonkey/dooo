import React, { useEffect, useState } from "react"
import {
  Stack,
  Row,
  Col,
  Form,
  Button,
  Container,
  Toast,
  ToastContainer,
  Alert,
} from "react-bootstrap"
import { Top, Message } from "../components"
import phoneIcon from "../assets/icons/phone.svg"
import emailIcon from "../assets/icons/mailoutline.svg"
import NumberFormat from "react-number-format"
import { useDispatch, useSelector } from "react-redux"
import { sendEmail } from "../actions"
import { useNavigate } from "react-router-dom"

const ContactUsScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const [showMessage, setShowMessage] = useState(false)
  //state for form
  const [form, setForm] = useState({
    name: "",
    phnub: "",
    email: "",
    message: "",
    to: "contact@doomoble.com",
    subject: `New message from contact us.`,
  })
  const [errors, setErrors] = useState({})
  //state for message if success
  const [message, setMessage] = useState("")
  //fill form and error
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    })

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      })
  }
  const { emailStatus } = useSelector((state) => state.sendEmail)

  useEffect(() => {
    if (emailStatus !== undefined) {
      setMessage("")
    }
  }, [emailStatus, message])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [showMessage])

  //validate form function
  const validateForm = () => {
    const { name, phnub, email, message } = form
    const newErrors = {}
    //check name
    if (name === "") {
      newErrors.name = "Please enter name"
    }
    //check phone number
    if (phnub === "") {
      newErrors.phnub = "Please enter phone number"
    } else if (phnub.length < 9) {
      newErrors.phnub = "Please enter correct phone number"
    }
    //check email
    if (email === "") {
      newErrors.email = "Please enter email"
    }
    //check message
    if (message === "") {
      newErrors.message = "Please enter message"
    }

    return newErrors
  }
  //function for submit form
  const submitHandler = (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      const messages = `Customer name: ${form.name} phone:${form.phnub} email: ${form.email}`
      form.message = messages
      dispatch(sendEmail(form))
      setMessage(`Thank ${form.name} for contacting us!`)
      setShowMessage(true)
      setForm({
        name: "",
        phnub: "",
        email: "",
        message: "",
        to: "contact@doomoble.com",
        subject: `New message from contact us.`,
      })

      //SEND EMAIL
    }
  }

  return (
    <>
      <Stack direction='vertical'>
        <Row className='m-0 justify-content-md-center '>
          <Top text='Contact Us'>
            <span className='top-slogan mb-5'>Reach out to DooMoble</span>
          </Top>
        </Row>

        <Row className='m-0 justify-content-md-center '>
          <Col
            lg={6}
            md={6}
            sm={12}
            className='text-center cus-contactus-notitia '
          >
            <div className='cus-contact-form mx-auto py-5'>
              <Stack
                direction='vertical'
                className='cus-contactus-text text-start '
              >
                <h5>
                  <img src={phoneIcon} alt='phone' /> Call Us
                </h5>
                <span>
                  Tell us your needs and we’ll send you a free estimate.
                </span>
                <h4 className='mt-3 mb-5'>347-715-2240</h4>
                <h5>
                  <img src={emailIcon} alt='email' />
                  Email Us
                </h5>
                <span>
                  for general inquiries and questions, contact us via email.
                </span>
                <h4 className='mt-3'>
                  <a
                    href='mailto:contact@doomoble.com'
                    className='cus-contactus-email '
                  >
                    contact@doomoble.com
                  </a>
                </h4>
              </Stack>
            </div>
          </Col>
          <Col
            lg={6}
            md={6}
            sm={12}
            className='text-start'
            style={{ backgroundColor: "white" }}
          >
            <div className='cus-contact-form mx-auto py-5'>
              <Alert show={showMessage} variant='success'>
                {message}
              </Alert>

              <Form onSubmit={submitHandler}>
                <h5 style={{ color: "black" }}>Questions?</h5>
                <h6 style={{ color: "black" }}>
                  Leave us a message and one of our representatives will reach
                  back to you shortly!
                </h6>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='John Smith'
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>

                      <NumberFormat
                        format='(###) ###-####'
                        mask='_'
                        placeholder='(323)445-6787'
                        customInput={Form.Control}
                        // value={form.phnub}
                        // isInvalid={!!errors.phnub}
                        className={!!errors.phnub ? "is-invalid" : ""}
                        onValueChange={(e) =>
                          setField("phnub", e.floatValue.toString())
                        }
                      />
                      {/* <Form.Control
                      type='text'
                      placeholder='1234567890'
                      value={form.phnub}
                      onChange={(e) => setField("phnub", e.target.value)}
                      isInvalid={!!errors.phnub}
                    /> */}
                      <Form.Control.Feedback type='invalid'>
                        {errors.phnub}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='johnsmith@email.com'
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Hey There!'
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className='text-end'>
                  <Button type='submit' variant='dark' className='mt-5 w-25'>
                    Send
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Stack>
    </>
  )
}

export default ContactUsScreen
