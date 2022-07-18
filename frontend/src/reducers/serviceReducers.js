export const serviceListReducer = (state = {}, action) => {
  switch (action.type) {
    case "SERVICE_LIST_REQUEST":
      return { loading: true }
    case "SERVICE_LIST_SUCCESS":
      return {
        loading: false,
        services: action.payload,
      }

    case "SERVICE_LIST_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const serviceDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SERVICE_DETAILS_REQUEST":
      return { loading: true }
    case "SERVICE_DETAILS_SUCCESS":
      return { loading: false, service: action.payload }
    case "SERVICE_DETAILS_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const sendEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEND_EMAIL_SUCCESS":
      return { loading: false, emailStatus: action.payload }
    case "SEND_EMAIL_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
