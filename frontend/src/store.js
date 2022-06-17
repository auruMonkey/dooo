import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  getUserAppointmentsReducer,
} from "./reducers/userReducers"
import {
  serviceListReducer,
  serviceDetailsReducer,
} from "./reducers/serviceReducers"
import {
  businessRegisterReducer,
  businessLoginReducer,
  businessUpdatePersonalReducer,
  businessUpdateBusinessReducer,
  updateLocationReducer,
  deleteLocationReducer,
  updateServicesReducer,
  deleteServiceReducer,
  editServiceReducer,
  businessScheduleUpdateReducer,
} from "./reducers/businessReducers"
import {
  uploadImageReducer,
  uploadDocumentReducer,
  addImageBusinessReducer,
  deleteImageBusinessReducer,
} from "./reducers/uploadReducers"
import { settingsUpReducer } from "./reducers/settingsReducers"
//reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  getUserAppointment: getUserAppointmentsReducer,
  serviceList: serviceListReducer,
  serviceDetails: serviceDetailsReducer,
  businessRegister: businessRegisterReducer,
  businessLogin: businessLoginReducer,
  businessUpdatePersonal: businessUpdatePersonalReducer,
  businessUpdateBusiness: businessUpdateBusinessReducer,
  businessScheduleUpdate: businessScheduleUpdateReducer,
  updateLocation: updateLocationReducer,
  deleteLocation: deleteLocationReducer,
  updateServices: updateServicesReducer,
  deleteService: deleteServiceReducer,
  editService: editServiceReducer,
  uploadImage: uploadImageReducer,
  uploadDocument: uploadDocumentReducer,
  addImageBusiness: addImageBusinessReducer,
  deleteImageBusiness: deleteImageBusinessReducer,
  settingsUp: settingsUpReducer,
})

//get initial user info
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

//get initial setting info
const settingsInfoFromStorage = localStorage.getItem("settingsInfo")
  ? JSON.parse(localStorage.getItem("settingsInfo"))
  : null

//get initial user info
const businessInfoFromStorage = localStorage.getItem("businessInfo")
  ? JSON.parse(localStorage.getItem("businessInfo"))
  : null

//initial states
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  businessLogin: { businessInfo: businessInfoFromStorage },
  settingsUp: { settingsInfo: settingsInfoFromStorage },
}
//middleware
const middleware = [thunk]
// config store
const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware,
})
export default store
