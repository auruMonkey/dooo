import axios from "axios"

//login action
export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_LOGIN_REQUEST" })

    await axios
      .post(
        "/api/admin/login",
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch({ type: "ADMIN_LOGIN_SUCCESS", payload: response.data })
      })

    // localStorage.setItem("userInfo", JSON.stringify(data))
    // localStorage.removeItem("businessInfo")
  } catch (error) {
    dispatch({
      type: "ADMIN_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//login action
export const findInformation = (name, id, keyword) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_FIND_REQUEST" })

    const { data } = await axios.post(
      "/api/admin/find",
      { name, id, keyword },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )

    dispatch({ type: "ADMIN_FIND_SUCCESS", payload: data })
  } catch (error) {
    dispatch({
      type: "ADMIN_FIND_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//login action
export const deleteMember = (name, id, keyword, bid) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_DELETE_REQUEST" })

    const { data } = await axios.post(
      "/api/admin/delete",
      { name, id, keyword, bid },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )

    dispatch({ type: "ADMIN_DELETE_SUCCESS", payload: data })
    dispatch({ type: "ADMIN_FIND_SUCCESS", payload: data })
  } catch (error) {
    dispatch({
      type: "ADMIN_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
