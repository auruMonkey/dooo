export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN_REQUEST":
      return { loading: true }
    case "ADMIN_LOGIN_SUCCESS":
      return { loading: false, adminInfo: action.payload }
    case "ADMIN_LOGIN_FAIL":
      return { loading: false, error: action.payload }
    case "ADMIN_LOGOUT":
      return {}
    default:
      return state
  }
}
export const adminFindReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_FIND_REQUEST":
      return { loading: true }
    case "ADMIN_FIND_SUCCESS":
      return { loading: false, adminFindInfo: action.payload }
    case "ADMIN_FIND_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const adminDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_DELETE_REQUEST":
      return { loading: true }
    case "ADMIN_DELETE_SUCCESS":
      return { loading: false }
    case "ADMIN_DELETE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
