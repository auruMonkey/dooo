import React, { useEffect, useState } from "react"
import { Stack, Row, Form, FormGroup, Container, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginAdmin } from "../actions"
import isStrongPassword from "validator/lib/isStrongPassword"

const AdminLoginScreen = () => {
  const history = useNavigate()

  useEffect(() => {
    if (window.sessionStorage.getItem("adminInfo") !== null) {
      history("/admindashboard")
    }
  }, [])

  //const form
  const [form, setForm] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  //set form's fields
  const setField = (field, value) => {
    setForm({ ...form, [field]: value })
    if (!!errors[field]) setErrors({ ...errors, [field]: null })
  }
  //validate form function
  const validateForm = () => {
    const { email, password } = form
    const newErrors = {}
    //check email
    if (email === undefined) {
      newErrors.email = "Please enter email"
    }

    //check password
    if (password === undefined) {
      newErrors.password = "Please enter password."
    } else if (
      !isStrongPassword(password, {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: 0,
        pointsForContainingUpper: 0,
        pointsForContainingNumber: 0,
        pointsForContainingSymbol: 0,
      })
    ) {
      newErrors.password = "Please enter correct password"
    }

    return newErrors
  }
  const submitHandler = (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      dispatch(loginAdmin(form.email, form.password))
      history("/admindashboard")
    }
  }
  return (
    <Stack direction='vertical' className='bg-white text-muted'>
      <Container>
        <Row className='m-0 '>
          <Form
            className='my-5 ls-form-main mx-auto'
            noValidate
            onSubmit={submitHandler}
          >
            <div className='text-center'>
              <h6 className='text-dark text-capitalize mt-5'>{`Login to Admin  Account`}</h6>
            </div>
            <FormGroup>
              <Form.Label as='p' style={{ fontSize: "0.8rem" }}>
                Email
              </Form.Label>
              <Form.Control
                type='email'
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder='doomoble@email.com'
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup className='mt-3'>
              <Form.Label as='p' style={{ fontSize: "0.8rem" }}>
                Password
              </Form.Label>
              <Form.Control
                type='password'
                autoComplete='true'
                placeholder='*****'
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </FormGroup>
            <div className='text-end mt-4'>
              <Button type='submit' variant='dark'>
                Sign In
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </Stack>
  )
}

export default AdminLoginScreen
