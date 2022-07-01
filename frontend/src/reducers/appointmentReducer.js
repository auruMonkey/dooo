export const getAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_APPOINTMENT_REQUEST":
      return { loading: true }
    case "GET_APPOINTMENT_SUCCESS":
      return { loading: false, appointmentInfo: action.payload }
    case "GET_APPOINTMENT_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const cancelAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case "CANCEL_APPOINTMENT_REQUEST":
      return { loading: true, succes: false }
    case "GET_APPOINTMENT_SUCCESS":
      return { loading: false, appointmentInfo: action.payload }
    case "CANCEL_APPOINTMENT_SUCCESS":
      return { loading: false, succes: true, appointmentInfo: action.payload }
    case "CANCEL_APPOINTMENT_FAIL":
      return { loading: false, error: action.payload, succes: false }
    default:
      return state
  }
}
