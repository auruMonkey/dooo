import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Stack, Button, Image, Row, Form, Card, Col } from "react-bootstrap"
import {
  addImageBusiness,
  deleteImageBusiness,
  addMainPicture,
} from "../../actions/uploadActions"
import { Loader, Message } from "../../components"

const BusinessGallery = () => {
  const [fileInputState, setFileInputState] = useState("")
  const [previewSource, setPreviewSource] = useState("")

  //slicer for business info
  // const { businessInfo } = useSelector((state) => state.businessLogin)
  const { loading, success, upload, error } = useSelector(
    (state) => state.addImageBusiness
  )
  // *********** slicer for business information
  const { businessInfo } = useSelector((state) => state.businessLogin)

  const dispatch = useDispatch()
  //preview avatar function
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
  //preview avatar handler
  const handleFileInput = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }
  // submit avatar handler
  const handleSubmitFile = (e) => {
    e.preventDefault()

    if (!previewSource) return
    try {
      dispatch(addImageBusiness(previewSource, businessInfo._id))
      setPreviewSource("")
    } catch (error) {
      console.error(error)
    }
  }
  // submit avatar handler
  const deleteImageHandler = (id) => {
    try {
      dispatch(deleteImageBusiness(id, businessInfo._id))
    } catch (error) {
      console.error(error)
    }
  }
  //do as main
  const asMainHandler = (path) => {
    try {
      dispatch(addMainPicture(path, businessInfo._id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack direction='vertical'>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Row>
        {
          <Form
            className='d-flex flex-row align-items-center'
            onSubmit={handleSubmitFile}
          >
            <Image
              className={
                previewSource
                  ? "visible avatar-user-manager me-3 shadow"
                  : "invisible avatar-user-manager me-3 shadow"
              }
              src={previewSource ? previewSource : ""}
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
                  Add Image
                  <i className='bi bi-plus-lg ms-2'></i>
                </label>
              </div>
            )}
          </Form>
        }
      </Row>
      <Row>
        {businessInfo &&
          businessInfo.gallery.map((i) => (
            <Col lg={4} md={6} xs={12}>
              <Card className='shadow bg-white p-3'>
                <Row>
                  <Col lg={9} md={9} xs={9} className='mb-3'>
                    {i.path !== businessInfo.mainPicture ? (
                      <Button
                        type='button'
                        className='shadow p-2 rounded text-end '
                        style={{
                          color: "#415da5",
                          fontWeight: "500",
                          backgroundColor: "white",
                          border: "none",
                          width: "auto",
                        }}
                        onClick={() => asMainHandler(i.path)}
                      >
                        Set as Main Image
                      </Button>
                    ) : (
                      <span style={{ color: "orange" }}>
                        <i className='bi bi-check-lg me-2'></i>
                        Main Image
                      </span>
                    )}
                  </Col>
                  <Col lg={3} md={3} xs={3}>
                    <Button
                      variant='danger'
                      className='px-3 '
                      onClick={() => deleteImageHandler(i._id)}
                    >
                      <i className='bi bi-x-lg'></i>
                    </Button>
                  </Col>
                </Row>
                <Card.Img variant='bottom' src={i.path} />
              </Card>
            </Col>
          ))}
      </Row>
    </Stack>
  )
}

export default BusinessGallery
