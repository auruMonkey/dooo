import axios from "axios"

export const changeAvatar = (image, oldImage, id) => async (dispatch) => {
  try {
    dispatch({ type: "UPLOAD_REQUEST" })

    const { data } = await axios.post(
      "/api/upload",
      { data: image, olddata: oldImage, userId: id },
      { headers: { "Content-type": "application/json" } }
    )
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: "UPLOAD_FAIL",
      payload:
        error.response && error.response.msg.message
          ? error.response.msg.message
          : error.message,
    })
  }
}

export const changeAvatarBusiness =
  (image, oldImage, id) => async (dispatch) => {
    try {
      dispatch({ type: "UPLOAD_REQUEST" })

      const { data } = await axios.post(
        "/api/upload/business",
        { data: image, olddata: oldImage, businessId: id },
        { headers: { "Content-type": "application/json" } }
      )
      dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: data })
      localStorage.setItem("businessInfo", JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: "UPLOAD_FAIL",
        payload:
          error.response && error.response.msg.message
            ? error.response.msg.message
            : error.message,
      })
    }
  }

// *******Add image to business galary*******
export const addImageBusiness = (image, id) => async (dispatch) => {
  // configure the header
  const config = { headers: { "Content-type": "multipart/form-data" } }

  try {
    dispatch({ type: "ADD_IMAGE_REQUEST" })
    await axios
      .post(
        "/api/upload/galery",
        { id, image },
        {
          headers: { "Content-type": "application/json" },
        }
      )

      .then((response) => {
        dispatch({ type: "ADD_IMAGE_SUCCESS", payload: response.data })
        dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
        localStorage.setItem("businessInfo", JSON.stringify(response.data))
      })
  } catch (error) {
    dispatch({
      type: "ADD_IMAGE_FAIL",
      payload: error.message,
      // error.response && error.response.msg.message
      //   ? error.response.msg.message
      //   : error.message,
    })
  }
}
// *******Add image to business galary*******
export const addMainPicture = (path, bid) => async (dispatch) => {
  try {
    dispatch({ type: "BUSINESS_LOGIN_REQUEST" })
    await axios
      .post(
        "/api/upload/galery/main",
        { path, bid },
        {
          headers: { "Content-type": "application/json" },
        }
      )

      .then((response) => {
        dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
        localStorage.setItem("businessInfo", JSON.stringify(response.data))
      })
  } catch (error) {
    dispatch({
      type: "BUSINESS_LOGIN_FAIL",
      payload: error.message,
      // error.response && error.response.msg.message
      //   ? error.response.msg.message
      //   : error.message,
    })
  }
}
export const deleteImageBusiness = (id, bid) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_IMAGE_REQUEST" })

    const { data } = await axios.put(
      "/api/upload/business/galery/delete",
      { id, bid },
      { headers: { "Content-type": "application/json" } }
    )
    dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: data })
    dispatch({ type: "DELETE_IMAGE_SUCCESS", payload: data })
    localStorage.setItem("businessInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: "DELETE_IMAGE_FAIL",
      payload:
        error.response && error.response.msg.message
          ? error.response.msg.message
          : error.message,
    })
  }
}
export const uploadDocument = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "UPLOAD_DOCUMENT_REQUEST" })

    await axios
      .post("/api/upload/document", formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        dispatch({ type: "UPLOAD_DOCUMENT_SUCCESS", payload: response.data })
      })
  } catch (error) {
    dispatch({
      type: "UPLOAD_DOCUMENT_FAIL",
      payload:
        error.response && error.response.msg.message
          ? error.response.msg.message
          : error.message,
    })
  }
}
