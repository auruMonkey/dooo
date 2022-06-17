export const businessRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_REGISTER_REQUEST":
      return { loading: true }
    case "BUSINESS_REGISTER_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_REGISTER_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const businessLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_LOGIN_REQUEST":
      return { loading: true }
    case "BUSINESS_LOGIN_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_LOGIN_FAIL":
      return { loading: false, error: action.payload }
    case "BUSINESS_LOGOUT":
      return {}
    default:
      return state
  }
}
export const businessUpdatePersonalReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_UPDATE_PROFILE_REQUEST":
      return { loading: true }
    case "BUSINESS_UPDATE_PROFILE_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_UPDATE_PROFILE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const businessUpdateBusinessReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_B_UPDATE_PROFILE_REQUEST":
      return { loading: true }
    case "BUSINESS_B_UPDATE_PROFILE_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_B_UPDATE_PROFILE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_UPDATE_LOCATION_REQUEST":
      return { loading: true }
    case "BUSINESS_UPDATE_LOCATION_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_UPDATE_LOCATION_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_DELETE_LOCATION_REQUEST":
      return { loading: true }
    case "BUSINESS_DELETE_LOCATION_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_DELETE_LOCATION_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateServicesReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_UPDATE_SERVICES_REQUEST":
      return { loading: true }
    case "BUSINESS_UPDATE_SERVICES_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_UPDATE_SERVICES_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_DELETE_SERVICE_REQUEST":
      return { loading: true }
    case "BUSINESS_DELETE_SERVICE_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_DELETE_SERVICE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const editServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_EDIT_SERVICE_REQUEST":
      return { loading: true }
    case "BUSINESS_EDIT_SERVICE_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_EDIT_SERVICE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const businessScheduleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "BUSINESS_SCHEDULE_UPDATE_REQUEST":
      return { loading: true }
    case "BUSINESS_SCHEDULE_UPDATE_SUCCESS":
      return { loading: false, businessInfo: action.payload }
    case "BUSINESS_SCHEDULE_UPDATE_FAIL":
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
