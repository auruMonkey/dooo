import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  Image,
  Row,
  Stack,
  Form,
  Button,
  Col,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap"
import NumberFormat from "react-number-format"
import {
  uploadDocument,
  changeAvatarBusiness,
} from "../../actions/uploadActions"
import {
  updatePersonalBusiness,
  updateBusinessBusiness,
} from "../../actions/businessActions"

const BusinessManager = () => {
  //slicer for business info
  const { businessInfo } = useSelector((state) => state.businessLogin)

  //states for files
  const [document, setDocument] = useState()
  const [documentName, setDocumentName] = useState("")
  //is form active state
  const [isEditPersonal, setIsEditPersonal] = useState(true)
  const [isEditBusiness, setIsEditBusiness] = useState(true)
  //states for work with avatar
  const [previewSource, setPreviewSource] = useState("")
  const [fileInputState, setFileInputState] = useState("")

  //state work with document
  const [documentUpload, setDocumentUpload] = useState(false)
  //states for work personal profile form
  const [personalForm, setPersonalForm] = useState({})
  const [businessForm, setBusinessForm] = useState({})

  useEffect(() => {
    if (businessInfo) {
      setPersonalForm({
        name: businessInfo.name,
        email: businessInfo.email,
        phone: businessInfo.phone,
      })
      setBusinessForm({
        businessName: businessInfo.businessName,
        details: businessInfo.details,
        experience: businessInfo.experience,
      })
    }
  }, [setPersonalForm, businessInfo, setBusinessForm, businessInfo])

  const [personalErrors, setPersonalErrors] = useState({})
  //states for work business profile form
  const [businessErrors, setBusinessErrors] = useState({})

  //def dispatch
  const dispatch = useDispatch()
  //work with personal form
  const setPersonalField = (field, value) => {
    setPersonalForm({
      ...personalForm,
      [field]: value,
    })

    if (!!personalErrors[field])
      setPersonalErrors({
        ...personalErrors,
        [field]: null,
      })
  }

  //work with business form
  const setBusinessFieldB = (field, value) => {
    setBusinessForm({
      ...businessForm,
      [field]: value,
    })

    if (!!businessErrors[field])
      setBusinessErrors({
        ...businessErrors,
        [field]: null,
      })
  }

  //preview avatar function
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  //cancel to edit personal information
  const cancelHandler = () => {
    setIsEditPersonal(true)
    personalForm.name = businessInfo.name
    personalForm.email = businessInfo.email
    personalForm.phone = businessInfo.phone

    setPersonalErrors({})
  }
  //cancel to edit business information
  const cancelBusinessHandler = () => {
    setIsEditBusiness(true)
    setBusinessForm({
      name: businessInfo.businessName,
      details: businessInfo.details,
      experience: businessInfo.experience,
    })
    setPersonalErrors({})
  }

  // submit avatar handler
  const handleSubmitFile = (e) => {
    e.preventDefault()
    if (!previewSource) return
    try {
      dispatch(
        changeAvatarBusiness(
          previewSource,
          businessInfo.avatar.path,
          businessInfo._id
        )
      )
      setPreviewSource("")
    } catch (error) {
      console.error(error)
    }
  }

  // submit document handler
  const handleSubmitDocument = (e) => {
    e.preventDefault()
    try {
      // dispatch(changeAvatar(previewSource, userInfo.path, userInfo._id))
    } catch (error) {
      console.error(error)
    }
  }
  //preview avatar handler
  const handleFileInput = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  //submit personal info
  const submitPersonalFormHandler = (e) => {
    e.preventDefault()
    const formErrors = {}

    if (Object.keys(formErrors).length > 0) {
      console.log(formErrors)
      setPersonalErrors(formErrors)
    } else {
      // *******Dispatch personal******
      dispatch(
        updatePersonalBusiness(
          personalForm.name,
          personalForm.email,
          personalForm.phone,
          businessInfo._id
        )
      )
    }
    setIsEditPersonal(true)
    setPersonalForm({})
  }

  //submit business info
  const submitBusinessFormHandler = (e) => {
    e.preventDefault()
    const formErrors = {}

    if (Object.keys(formErrors).length > 0) {
      setPersonalErrors(formErrors)
    } else {
      dispatch(
        updateBusinessBusiness(
          businessForm.businessName,
          businessForm.details,
          businessForm.experience,
          businessInfo._id
        )
      )
    }
    setIsEditBusiness(true)
    setBusinessForm({})
  }

  //functions work with files
  const saveFile = (e) => {
    setDocument(e.target.files[0])
    setDocumentName(e.target.files[0].name)
  }

  const uploadFile = async (e) => {
    const formData = new FormData()
    formData.append("file", document)
    formData.append("fileName", documentName)
    dispatch(uploadDocument(formData))
  }

  //main return
  return (
    <Stack direction='vertical'>
      <Row>
        {
          <Form
            className='d-flex flex-row align-items-center'
            onSubmit={handleSubmitFile}
          >
            <Image
              src={
                previewSource
                  ? previewSource
                  : businessInfo
                  ? businessInfo.avatar.path
                  : ""
              }
              className='avatar-user-manager me-3 shadow '
            />

            {previewSource ? (
              <>
                <Button
                  type='submit'
                  className='shadow p-2 rounded'
                  style={{
                    color: "#3b8543",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    border: "none",
                  }}
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
                  }}
                  onClick={() => setPreviewSource("")}
                >
                  Cancel <i className='bi bi-x-lg ms-2'></i>
                </Button>
              </>
            ) : (
              <div className='shadow p-2 rounded btn-text-dashboard-user'>
                <input
                  id='inputImage'
                  type='file'
                  name='image'
                  onChange={handleFileInput}
                  value={fileInputState}
                  style={{ display: "none" }}
                />
                <label htmlFor='inputImage'>
                  Edit Profile Picture
                  <i className='bi bi-pencil-fill ms-2'></i>
                </label>
              </div>
            )}
          </Form>
        }
      </Row>
      {/* *******Personal Information******* */}
      <Row className='my-4'>
        <Col>
          <strong>Personal Info</strong>
        </Col>
        {isEditPersonal ? (
          <Button
            type='submit'
            className='shadow p-2 rounded text-end'
            style={{
              color: "black",
              backgroundColor: "white",
              border: "none",
              width: "auto",
            }}
            onClick={() => setIsEditPersonal(false)}
          >
            Edit<i className='bi bi-pencil-fill ms-2'></i>
          </Button>
        ) : (
          <>
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
              form='personalFormId'
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
          </>
        )}
      </Row>
      <Row style={{ marginBottom: "4rem" }}>
        <Form
          id='personalFormId'
          onSubmit={submitPersonalFormHandler}
          noValidate
        >
          {/* *******Personal Information Name******* */}
          <Form.Group>
            <Form.Label
              className='text-muted m-0'
              style={{ fontSize: "0.8rem" }}
            >
              Name
            </Form.Label>
            <Form.Control
              type='text'
              disabled={isEditPersonal}
              placeholder={personalForm ? personalForm.name : ""}
              value={personalForm ? personalForm.name : ""}
              onChange={(e) => setPersonalField("name", e.target.value)}
              isInvalid={!!personalErrors.name}
            />
            <Form.Control.Feedback type='invalid'>
              {personalErrors.name}
            </Form.Control.Feedback>
          </Form.Group>
          {/* *******Personal Information Email******* */}
          <Form.Group>
            <Form.Label
              className='text-muted m-0'
              style={{ fontSize: "0.8rem" }}
            >
              Email
            </Form.Label>
            <Form.Control
              type='email'
              value={personalForm.email ? personalForm.email : ""}
              disabled={isEditPersonal}
              placeholder={personalForm.email ? personalForm.email : ""}
              onChange={(e) => setPersonalField("email", e.target.value)}
              isInvalid={!!personalErrors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {personalErrors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label
              className='text-muted m-0'
              style={{ fontSize: "0.8rem" }}
            >
              Phone
            </Form.Label>
            <NumberFormat
              format='(###) ###-####'
              mask='_'
              isNumericString={true}
              customInput={Form.Control}
              placeholder={personalForm.phone}
              disabled={isEditPersonal}
              onValueChange={(e) => setPersonalField("phone", e.floatValue)}
              isInvalid={!!personalErrors.phonenumber}
            />
            <Form.Control.Feedback type='invalid'>
              {personalErrors.phonenumber}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Row>
      {/* Edit Business Information */}
      <Row className='my-4'>
        <Col>
          <strong>Business Info</strong>
        </Col>
        {isEditBusiness ? (
          <Button
            type='submit'
            className='shadow p-2 rounded text-end'
            style={{
              color: "black",
              backgroundColor: "white",
              border: "none",
              width: "auto",
            }}
            onClick={() => setIsEditBusiness(false)}
          >
            Edit<i className='bi bi-pencil-fill ms-2'></i>
          </Button>
        ) : (
          <>
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
              form='editBusinessForm'
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
              onClick={() => cancelBusinessHandler()}
            >
              Cancel <i className='bi bi-x-lg ms-2'></i>
            </Button>
          </>
        )}
      </Row>

      <Row style={{ marginBottom: "4rem" }}>
        <Form
          id='editBusinessForm'
          onSubmit={submitBusinessFormHandler}
          noValidate
        >
          {/* *******Business name******* */}
          <Form.Group>
            <Form.Label
              className='text-muted m-0'
              style={{ fontSize: "0.8rem" }}
            >
              Business Name
            </Form.Label>
            <Form.Control
              type='text'
              disabled={isEditBusiness}
              placeholder={businessForm ? businessForm.businessName : ""}
              value={businessForm ? businessForm.businessName : ""}
              onChange={(e) =>
                setBusinessFieldB("businessName", e.target.value)
              }
              isInvalid={!!businessErrors.businessName}
            />
            <Form.Control.Feedback type='invalid'>
              {businessErrors.businessName}
            </Form.Control.Feedback>
          </Form.Group>
          {/* *******Business description******* */}
          <Form.Group>
            <Form.Label
              className='text-muted m-0'
              style={{ fontSize: "0.8rem" }}
            >
              Details
            </Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              type='text'
              disabled={isEditBusiness}
              placeholder={businessForm ? businessForm.details : ""}
              value={businessForm ? businessForm.details : ""}
              onChange={(e) => setBusinessFieldB("details", e.target.value)}
              isInvalid={!!businessErrors.details}
            />
            <Form.Control.Feedback type='invalid'>
              {businessErrors.details}
            </Form.Control.Feedback>
          </Form.Group>
          {/* *******Years of Experience******* */}
          <Form.Group>
            <Form.Label
              className='text-muted m-0'
              style={{ fontSize: "0.8rem" }}
            >
              Years of Experience
            </Form.Label>
            <Form.Control
              type='text'
              disabled={isEditBusiness}
              placeholder={businessForm ? businessForm.experience : ""}
              value={businessForm ? businessForm.experience : ""}
              onChange={(e) => setBusinessFieldB("experience", e.target.value)}
              isInvalid={!!businessErrors.experience}
            />
            <Form.Control.Feedback type='invalid'>
              {businessErrors.experience}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Row>
      {/* *******Download document******* */}
      <Row className='mb-5'>
        {
          <Form onSubmit={handleSubmitDocument}>
            <Button
              type='button'
              className={
                !documentUpload ? "shadow p-2 rounded " : "visually-hidden"
              }
              onClick={() => setDocumentUpload(true)}
              style={{
                color: "#415da5",
                fontWeight: "bold",
                backgroundColor: "white",
                border: "none",
              }}
            >
              Add Document<i className='bi bi-plus-lg ms-2'></i>
            </Button>

            {documentUpload && (
              <Row>
                <Col lg={5} md={6} sm={12}>
                  <Form.Group
                    controlId='formFile'
                    className='me-2 shadow rounded w-100'
                  >
                    <Form.Control type='file' onChange={saveFile} />
                  </Form.Group>
                </Col>
                <Col lg={3} md={2} sm={12}>
                  <InputGroup className='justify-content-end '>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant='outline-secondary'
                        id='input-group-dropdown-1'
                      >
                        Type
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='bg-white'>
                        <Dropdown.Item className='bg-white text-dark'>
                          Insurance
                        </Dropdown.Item>
                        <Dropdown.Item className='bg-white text-dark'>
                          License
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </InputGroup>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <Row>
                    <Col>
                      <Button
                        type='button'
                        onClick={uploadFile}
                        className='shadow p-2 rounded w-100'
                        style={{
                          color: "#3b8543",
                          fontWeight: "bold",
                          backgroundColor: "white",
                          border: "none",
                        }}
                      >
                        Save<i className='fa-solid fa-floppy-disk ms-2'></i>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className='shadow ms-3 p-2 rounded w-100'
                        style={{
                          color: "#d1372d",
                          fontWeight: "bold",
                          backgroundColor: "white",
                          border: "none",
                        }}
                        onClick={() => setDocumentUpload(false)}
                      >
                        Cancel <i className='bi bi-x-lg ms-2'></i>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Form>
        }
      </Row>
    </Stack>
  )
}

export default BusinessManager
