export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true }
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload }
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload }
    case "USER_LOGOUT":
      return {}
    default:
      return state
  }
}
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REQUEST":
      return { loading: true }
    case "USER_UPDATE_PROFILE_SUCCESS":
      return { loading: false, userInfo: action.payload }
    case "USER_UPDATE_PROFILE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const getUserAppointmentsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_APPOINTMENTS_REQUEST":
      return { loading: true }
    case "GET_APPOINTMENTS_SUCCESS":
      return { loading: false, apptsInfo: action.payload }
    case "GET_APPOINTMENTS_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true }
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload }
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
