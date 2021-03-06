import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  getUserAppointmentsReducer,
  updateUserAppointmentReducer,
  getUserByIdReducer,
} from "./reducers/userReducers"
import {
  serviceListReducer,
  serviceDetailsReducer,
  sendEmailReducer,
} from "./reducers/serviceReducers"
import {
  getAppointmentReducer,
  cancelAppointmentReducer,
} from "./reducers/appointmentReducer"
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
  getBusinessByIdReducer,
  getBusinessApnByIdReducer,
  acceptBusinessApnReducer,
} from "./reducers/businessReducers"
import {
  uploadImageReducer,
  uploadDocumentReducer,
  addImageBusinessReducer,
  deleteImageBusinessReducer,
} from "./reducers/uploadReducers"
import { settingsUpReducer } from "./reducers/settingsReducers"
import {
  adminLoginReducer,
  adminFindReducer,
  adminDeleteReducer,
  adminApproveReducer,
} from "./reducers/adminReducers"
//reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAppointment: getUserAppointmentsReducer,
  getUserById: getUserByIdReducer,
  updateUserAppointment: updateUserAppointmentReducer,
  serviceList: serviceListReducer,
  serviceDetails: serviceDetailsReducer,
  businessRegister: businessRegisterReducer,
  businessLogin: businessLoginReducer,
  businessUpdatePersonal: businessUpdatePersonalReducer,
  businessUpdateBusiness: businessUpdateBusinessReducer,
  businessScheduleUpdate: businessScheduleUpdateReducer,
  acceptBusinessApn: acceptBusinessApnReducer,
  getBusinessById: getBusinessByIdReducer,
  getBusinessApnById: getBusinessApnByIdReducer,
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
  getAppointment: getAppointmentReducer,
  cancelAppointment: cancelAppointmentReducer,
  adminLogin: adminLoginReducer,
  adminFind: adminFindReducer,
  adminDelete: adminDeleteReducer,
  adminApprove: adminApproveReducer,
  sendEmail: sendEmailReducer,
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
