import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Image, Row, Stack, Form, Button, Col } from "react-bootstrap"
import NumberFormat from "react-number-format"
import { updateUserProfile } from "../../actions/userActions"
import { changeAvatar } from "../../actions/uploadActions"

const AccountManager = () => {
  //is form active const
  const [isEdit, setIsEdit] = useState(true)
  //const profile form
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  //const work with avatar
  const [previewSource, setPreviewSource] = useState("")
  const [fileInputState, setFileInputState] = useState("")
  const dispatch = useDispatch()

  //slicer for user info
  const { userInfo } = useSelector((state) => state.userLogin)

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
  useEffect(() => {
    setForm({
      name: userInfo.name,
      email: userInfo.email,
      phonenumber: userInfo.phone,
    })
  }, [setForm, userInfo])

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault()
    if (!previewSource) return
    uploadImage(previewSource)
  }

  const uploadImage = (base64EncodedImage) => {
    try {
      dispatch(
        changeAvatar(base64EncodedImage, userInfo.avatar.path, userInfo._id)
      )
      setPreviewSource("")
    } catch (error) {
      console.error(error)
    }
  }
  const submitFormHandler = (e) => {
    e.preventDefault()
    const formErrors = {}
    // const formErrors = validateForm({
    //   name: form.name,
    //   email: form.email,
    //   phonenumber: form.phonenumber.toString(),
    // })
    if (Object.keys(formErrors).length > 0) {
      console.log(formErrors)
      setErrors(formErrors)
    } else {
      dispatch(
        updateUserProfile(
          form.name,
          form.email,
          form.phonenumber.toString(),
          userInfo._id
        )
      )
    }
    setIsEdit(true)
    setForm({
      name: userInfo.name,
      email: userInfo.email,
      phonenumber: userInfo.phone,
    })
  }

  const cancelHandler = () => {
    setIsEdit(true)
    setForm({
      name: userInfo.name,
      email: userInfo.email,
      phonenumber: userInfo.phone,
    })
    setErrors({})
  }
  return (
    <Stack direction='vertical'>
      <Row>
        {
          <Form
            className='d-flex flex-row align-items-center'
            onSubmit={handleSubmitFile}
          >
            <Image
              src={previewSource ? previewSource : userInfo.avatar.path}
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
                  Edit Profile Picture{" "}
                  <i className='bi bi-pencil-fill ms-2'></i>
                </label>
              </div>
            )}
          </Form>
        }
      </Row>
      <Row className='my-4'>
        <Col>
          <strong>Personal Info</strong>
        </Col>
        {isEdit ? (
          <Button
            type='submit'
            className='shadow p-2 rounded text-end'
            style={{
              color: "black",
              backgroundColor: "white",
              border: "none",
              width: "auto",
            }}
            onClick={() => setIsEdit(false)}
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
              form='profileForm'
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
      <Row style={{ marginBottom: "10rem" }}>
        <Form id='profileForm' onSubmit={submitFormHandler} noValidate>
          <Form.Group>
            <Form.Label
              className='text-muted m-0'
              style={{ fontSize: "0.8rem" }}
            >
              Name
            </Form.Label>
            <Form.Control
              type='text'
              disabled={isEdit}
              placeholder={userInfo.name}
              onChange={(e) => setField("name", e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label
              className='text-muted m-0'
              style={{ fontSize: "0.8rem" }}
            >
              Email
            </Form.Label>
            <Form.Control
              type='email'
              disabled={isEdit}
              placeholder={userInfo.email}
              onChange={(e) => setField("email", e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
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
              placeholder={userInfo.phone}
              customInput={Form.Control}
              disabled={isEdit}
              isNumericString={true}
              onValueChange={(e) => setField("phonenumber", e.floatValue)}
              isInvalid={!!errors.phonenumber}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.phonenumber}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Row>
    </Stack>
  )
}

export default AccountManager
