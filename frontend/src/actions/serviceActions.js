import axios from "axios"

//get all services
export const listServices =
  (keyword = "", category = "", pageNumber = "") =>
  async (dispatch) => {
    console.log(category)
    try {
      dispatch({ type: "SERVICE_LIST_REQUEST" })
      //config axios
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      if (category !== "") {
        await axios
          .post("/api/business/all", { category, pageNumber }, config)
          .then((response) => {
            dispatch({ type: "SERVICE_LIST_SUCCESS", payload: response.data })
          })
      }
    } catch (error) {
      dispatch({
        type: "SERVICE_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
//get service by ID
export const listServiceDetails = (id, category) => async (dispatch) => {
  try {
    dispatch({ type: "SERVICE_DETAILS_REQUEST" })
    //config axios
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    //get data
    await axios
      .post("/api/business/details", { category, id }, config)
      .then((response) => {
        dispatch({ type: "SERVICE_DETAILS_SUCCESS", payload: response.data })
      })
  } catch (error) {
    dispatch({
      type: "SERVICE_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//make appointment
export const makeAppointment =
  (uid, sid, schServices, schLocation, startDate) => async (dispatch) => {
    try {
      dispatch({ type: "USER_LOGIN_REQUEST" })
      //config axios
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      await axios
        .post(
          "/api/business/makeapp",
          { uid, sid, schServices, schLocation, startDate },
          config
        )
        .then((response) => {
          dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data })
          localStorage.setItem("userInfo", JSON.stringify(response.data))
          // dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
          // localStorage.setItem("businessInfo", JSON.stringify(response.data))
        })
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
