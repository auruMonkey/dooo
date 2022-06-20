import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import NumberFormat from "react-number-format"
import { Stack, Row, Container, Form, Button, Col } from "react-bootstrap"
import validator from "validator"
import Autocomplete from "react-google-autocomplete"
import Geocode from "react-geocode"
import { businessRegister } from "../actions/businessActions"
import { logout } from "../actions/userActions"
import { abstro, abstr } from "../components/strings.js"

const AddBusinessScreen = () => {
  //slicer for business info
  const { businessInfo } = useSelector((state) => state.businessLogin)
  const { loading, settingsInfo, error } = useSelector(
    (state) => state.settingsUp
  )
  //const form
  const [form, setForm] = useState({ category: "spa" })
  const [errors, setErrors] = useState({})

  // ***********
  const inputRef = useRef(null)
  const [country, setCountry] = useState("us")
  const [address, setAddress] = useState()
  const [addOther, showAddOther] = useState(false)

  Geocode.setApiKey("AIzaSyDXSd1rUGhNijPa_Sbi1Qc5VqCBwsUyXWY")

  //work with browser url
  const history = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (businessInfo) {
      history("/dashboard")
    }
    if (address) {
      // Get latitude & longitude from address.
      Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location
          form.lat = lat
          form.lng = lng
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }, [address, setAddress, form, businessInfo])
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

  //validate form function
  const validateForm = () => {
    //const for work with form
    const {
      name,
      email,
      password,
      confpassword,
      phonenumber,
      businessname,
      description,
    } = form
    const newErrors = {}

    //check name
    if (name === undefined) {
      newErrors.name = abstro[0]
    } else if (!name.toString().split(" ")[1]) {
      newErrors.name = abstro[1]
    }
    //check business name
    if (businessname === undefined) {
      newErrors.businessname = abstro[2]
    }
    //check address name
    if (address === undefined) {
      newErrors.address = abstro[3]
    } else {
      form.address = address.toString()
    }
    //check description
    if (description === undefined) {
      newErrors.description = abstro[4]
    } else if (description.length < 50) {
      newErrors.description = abstro[5]
    }

    //check email
    if (email === undefined) {
      newErrors.email = abstro[6]
    } else if (!validator.isEmail(email)) {
      newErrors.email = abstro[7]
    }
    //check password
    if (password === undefined) {
      newErrors.password = abstro[8]
    } else if (password.length < 6) {
      newErrors.password = abstro[9]
    } else if (password !== confpassword) {
      newErrors.confpassword = abstro[10]
    }

    //check phone number
    if (phonenumber === undefined) {
      newErrors.phonenumber = abstro[11]
    } else if (phonenumber.length < 10) {
      newErrors.phonenumber = abstro[12]
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
      let isNew = false
      if (form.category === "other") {
        let capCat = form.othercategory.toLowerCase().replace(/\s/g, "")
        const newName = form.othercategory
        form.category = capCat
        isNew = true
        dispatch(logout())
        dispatch(
          businessRegister(
            form.name,
            form.email,
            form.password,
            form.phonenumber,
            form.businessname,
            form.description,
            form.category,
            form.address,
            form.lat,
            form.lng,
            form.apt,
            isNew,
            settingsInfo[0]._id,
            newName
          )
        )
      } else {
        dispatch(logout())
        dispatch(
          businessRegister(
            form.name,
            form.email,
            form.password,
            form.phonenumber,
            form.businessname,
            form.description,
            form.category,
            form.address,
            form.lat,
            form.lng,
            form.apt,
            isNew,
            settingsInfo._id
          )
        )
      }

      history("/dashboard")
    }
  }

  const formRender = (label, type, fdn, en) => {
    return (
      <Form.Group className='my-3'>
        <Form.Label className='sgnup-form-label'>{label}</Form.Label>
        <Form.Control
          type={type}
          onChange={(e) => setField(fdn, e.target.value)}
          isInvalid={!!en}
        />
        <Form.Control.Feedback type='invalid'>{en}</Form.Control.Feedback>
      </Form.Group>
    )
  }

  //main return
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
              <h6 className='text-dark text-capitalize mt-5'>{`Create Business Account`}</h6>
            </div>
            {/* ********Full name********* */}
            {formRender(abstr[0], "text", "name", errors.name)}
            {/* ********Email********* */}
            {formRender(abstr[1], "email", "email", errors.email)}
            {/* ********Password********* */}
            {formRender(abstr[2], "password", "password", errors.password)}
            {/* ********Confirm Password********* */}
            {formRender(
              abstr[3],
              "password",
              "confpassword",
              errors.confpassword
            )}
            {/* ********Phone Number********* */}
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>{abstr[4]}</Form.Label>
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
            {/* ********Business name********* */}
            {formRender(abstr[5], "text", "businessname", errors.businessname)}

            {/* ********Business category********* */}
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>{abstr[11]}</Form.Label>
              <Form.Select
                onChange={(e) => setField("category", e.target.value)}
                isInvalid={!!errors.category}
              >
                <option value='transport'>Transport Vehicles</option>
                <option value='barbersalon'>
                  Mobile Hair Stylist and Barber
                </option>
                <option value='grooming'>Mobile Pet Care</option>
                <option value='cardetails'>Mobile Auto Care</option>
                <option value='health'>Mobile Health</option>
                <option value='property'>Property Care</option>
                <option value='entertainment'>Mobile Entertainment</option>
                <option value='film'>Photography and Filmmaking</option>
                <option value='other' onClick={() => showAddOther(true)}>
                  Other
                </option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
            {form.category == "other" && (
              <Form.Group className='my-3'>
                <Form.Label className='sgnup-form-label'>{abstr[6]}</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => setField("othercategory", e.target.value)}
                  isInvalid={!!errors.category}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            {/* ********Address********* */}
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>{abstr[7]}</Form.Label>
              <Row>
                <Col lg={8} md={8} sm={12}>
                  <Autocomplete
                    className='w-100 rounded'
                    placeholder='Street Adress'
                    style={
                      errors.address
                        ? { border: "0.05rem solid #c00", height: "2.4rem" }
                        : { border: "0.05rem solid #dee2e6", height: "2.4rem" }
                    }
                    ref={inputRef}
                    onPlaceSelected={(selected, a, c) => {
                      setAddress(selected.formatted_address)
                    }}
                    options={{
                      types: ["geocode", "establishment"],
                      componentRestrictions: { country },
                    }}
                    defaultValue=''
                  />
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <Form.Control
                    type='text'
                    placeholder='Apt, Suite'
                    onChange={(e) => setField("apt", e.target.value)}
                  />
                </Col>
              </Row>

              {errors.address && (
                <span className='text-danger'>{errors.address}</span>
              )}
            </Form.Group>
            {/* ********Business description********* */}
            <Form.Group className='my-3'>
              <Form.Label className='sgnup-form-label'>{abstr[8]}</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                type='text'
                onChange={(e) => setField("description", e.target.value)}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            {/* ********Submit button********* */}
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
                {abstr[9]}
                <i className='bi bi-check-lg ms-2'></i>
              </Button>
            </div>
            <div className='text-end mt-3'>
              <LinkContainer to={`/signin/business`}>
                <span className='ls-signup-text'>{abstr[10]}</span>
              </LinkContainer>
            </div>
          </Form>
        </Row>
      </Container>
    </Stack>
  )
}

export default AddBusinessScreen
