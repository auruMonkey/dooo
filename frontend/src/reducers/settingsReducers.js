export const settingsUpReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SETTINGS_REQUEST":
      return { loading: true }
    case "GET_SETTINGS_SUCCESS":
      return { loading: false, settingsInfo: action.payload }
    case "GET_SETTINGS_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
