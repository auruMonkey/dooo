import React, { useState } from "react"
import { Container, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { uploadImages } from "../actions/uploadActions"


const uploadFile = () => {
  const [previewSource, setPreviewSource] = useState("")
  const [fileInputState, setFileInputState] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  
  const handleFileInput = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const dispatch = useDispatch()
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
      dispatch(uploadImages(base64EncodedImage))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmitFile}>
        <input
          type='file'
          name='image'
          onChange={handleFileInput}
          value={fileInputState}
        />
        <button type='submit'>Submit</button>
      </Form>
      {previewSource && <img src={previewSource} alt='' />}
    </Container>
  )
}

export default uploadFile
