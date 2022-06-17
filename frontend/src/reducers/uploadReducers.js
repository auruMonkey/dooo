export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPLOAD_REQUEST":
      return { loading: true }
    case "UPLOAD_SUCCESS":
      return { loading: false, success: true, upload: action.payload }
    case "UPLOAD_FAIL":
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
export const uploadDocumentReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPLOAD_DOCUMENT_REQUEST":
      return { loading: true }
    case "UPLOAD_DOCUMENT_SUCCESS":
      return { loading: false, success: true, upload: action.payload }
    case "UPLOAD_DOCUMENT_FAIL":
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
export const addImageBusinessReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_IMAGE_REQUEST":
      return { loading: true }
    case "ADD_IMAGE_SUCCESS":
      return { loading: false, success: true, upload: action.payload }
    case "ADD_IMAGE_FAIL":
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
export const deleteImageBusinessReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_IMAGE_REQUEST":
      return { loading: true }
    case "DELETE_IMAGE_SUCCESS":
      return { loading: false, success: true, upload: action.payload }
    case "DELETE_IMAGE_FAIL":
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
