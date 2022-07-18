import React, { useEffect, useState } from "react"
import { Stack, Row, Container, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import validator from "validator"
import NumberFormat from "react-number-format"
import { useNavigate, useLocation } from "react-router-dom"
import { register, sendEmail } from "../actions"

const SignupScreen = () => {
  //const form
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  //work with browser url
  const history = useNavigate()
  const urlLocation = useLocation()
  const dispatch = useDispatch()
  //slicer for user info
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (userInfo) {
      history(-1)
    }
  }, [userInfo])
  //work with form
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

  const typeOfUser = urlLocation.pathname.split("/")[2]

  //validation form function
  const validateForm = () => {
    //const for work with form
    const { name, email, password, confpassword, phonenumber } = form
    const newErrors = {}

    //check name
    if (name === undefined) {
      newErrors.name = "Please enter Your Full Name"
    } else if (!name.toString().split(" ")[1]) {
      newErrors.name = "Please enter Your First and Last Name"
    }

    //check email
    if (email === undefined) {
      newErrors.email = "Please enter email"
    } else if (!validator.isEmail(email)) {
      newErrors.email = "Please enter valid email"
    }
    //check password
    if (password === undefined) {
      newErrors.password = "Please enter password"
    } else if (password.length < 6) {
      newErrors.password = "Please enter correct password 6 characters long"
    } else if (password !== confpassword) {
      newErrors.confpassword = "Password don't mutch"
    }

    //check phone number
    if (phonenumber === undefined) {
      newErrors.phonenumber = "Please enter phone number"
    } else if (phonenumber.length < 10) {
      newErrors.phonenumber = "Please enter correct phone number"
    }

    return newErrors
  }
  //submit form function
  const submitHandler = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      history("/")
      dispatch(register(form.name, form.email, form.password, form.phonenumber))
      dispatch(
        sendEmail({
          name: form.name,
          phnub: form.phonenumber,
          email: form.email,
          message: "Thanks for joining us",
          to: form.email,
          subject: `DooMoble`,
        })
      )
    }
  }

  return (
    <Stack direction='vertical' className='bg-white'>
      <Container>
        <Row className='m-0 '>
          <Form
            className='my-5 ls-form-main mx-auto'
            noValidate
            onSubmit={submitHandler}
          >
            <div className='text-center'>
              <h6 className='text-dark text-capitalize mt-5'>{`Create ${typeOfUser}  Account`}</h6>
            </div>
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>Full Name</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setField("name", e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>Email</Form.Label>
              <Form.Control
                required
                type='email'
                onChange={(e) => setField("email", e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>Password</Form.Label>
              <Form.Control
                autoComplete='true'
                type='password'
                onChange={(e) => setField("password", e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>
                Password Confirmation
              </Form.Label>
              <Form.Control
                autoComplete='true'
                type='password'
                onChange={(e) => setField("confpassword", e.target.value)}
                isInvalid={!!errors.confpassword}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.confpassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>Phone Number</Form.Label>
              <NumberFormat
                format='(###) ###-####'
                mask='_'
                isNumericString={true}
                customInput={Form.Control}
                onValueChange={(e) =>
                  setField("phonenumber", e.floatValue.toString())
                }
                isInvalid={!!errors.phonenumber}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.phonenumber}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='text-end mt-5'>
              <Button
                type='submit'
                className='shadow p-2 rounded'
                style={{
                  color: "#3b8543",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  border: "none",
                  width: "auto",
                }}
              >
                Create Account<i className='bi bi-check-lg ms-2'></i>
              </Button>
            </div>
            <div className='text-end mt-3'>
              <LinkContainer to={`/signin/${typeOfUser}`}>
                <span className='ls-signup-text'>Already have an account?</span>
              </LinkContainer>
            </div>
          </Form>
        </Row>
      </Container>
    </Stack>
  )
}
export default SignupScreen
