import axios from "axios"

//login action
export const loginU = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" })
    //config axios
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    //request to backend
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    )

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data })
    localStorage.setItem("userInfo", JSON.stringify(data))
    localStorage.removeItem("businessInfo")
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({ type: "USER_LOGOUT" })
}
// register new user
export const register =
  (name, email, password, phoneNumber) => async (dispatch) => {
    // congig headers
    const config = { headers: { "Content-type": "application/json" } }
    try {
      dispatch({ type: "USER_REGISTER_REQUEST" })
      await axios
        .post("/api/users/", { name, email, password, phoneNumber }, config)
        .then((response) => {
          dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data })
          localStorage.setItem("userInfo", JSON.stringify(response.data))
          dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data })
        })
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

//update user profile

export const updateUserProfile =
  (name, email, phone, id) => async (dispatch) => {
    try {
      dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" })

      await axios
        .put(
          "/api/users/profile",
          { name, email, phone, id },
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((response) => {
          dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data })
          dispatch({
            type: "USER_UPDATE_PROFILE_SUCCESS",
            payload: response.data,
          })

          localStorage.setItem("userInfo", JSON.stringify(response.data))
        })
    } catch (error) {
      dispatch({
        type: "USER_UPDATE_PROFILE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

//get user appointments

export const getAppointments = (appts) => async (dispatch) => {
  try {
    dispatch({ type: "GET_APPOINTMENTS_REQUEST" })
    await axios
      .post(
        "/api/users/appts",
        { appts },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((response) => {
        dispatch({ type: "GET_APPOINTMENTS_SUCCESS", payload: response.data })
      })
  } catch (error) {
    dispatch({
      type: "GET_APPOINTMENTS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
