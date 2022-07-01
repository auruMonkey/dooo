import axios from "axios"

export const getAppointmentById = (idApp) => async (dispatch) => {
  try {
    const config = { headers: { "Content-type": "application/json" } }
    dispatch({ type: "GET_APPOINTMENT_REQUEST" })
    await axios
      .post("/api/appointments", { idApp }, config)
      .then((response) => {
        dispatch({ type: "GET_APPOINTMENT_SUCCESS", payload: response.data })
      })
  } catch (error) {
    dispatch({
      type: "GET_APPOINTMENT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const cancelAppointmentById = (idApp) => async (dispatch) => {
  try {
    const config = { headers: { "Content-type": "application/json" } }
    dispatch({ type: "CANCEL_APPOINTMENT_REQUEST" })
    await axios
      .post("/api/appointments/cancel", { idApp }, config)
      .then((response) => {
        dispatch({ type: "CANCEL_APPOINTMENT_SUCCESS", payload: response.data })
        dispatch({ type: "GET_APPOINTMENTS_SUCCESS", payload: response.data })
      })
  } catch (error) {
    dispatch({
      type: "CANCEL_APPOINTMENT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
