import express from "express"
const router = express.Router()
import {
  registerBusiness,
  authBus,
  updatePersonalBusiness,
  updateBusinessBusiness,
  updateBusinessLocation,
  deleteBusinessLocation,
  updateBusinessService,
  deleteBusinessService,
  editBusinessService,
  updateBusinessSchedule,
  getBusinesses,
  getBusinesDetails,
  makeAppointment,
  businessById,
  getBusinessApnById,
  acceptBusinessApnById,
} from "../controllers/businessController.js"

router.route("/").post(registerBusiness)
router.route("/appointment/accept").post(acceptBusinessApnById)
router.route("/appointment").post(getBusinessApnById)
router.route("/id").post(businessById)
router.route("/makeapp").post(makeAppointment)
router.route("/all").post(getBusinesses)
router.route("/details").post(getBusinesDetails)
router.route("/schedule").post(updateBusinessSchedule)
router.route("/location/add").put(updateBusinessLocation)
router.route("/service/add").put(updateBusinessService)
router.route("/service/delete").put(deleteBusinessService)
router.route("/service/edit").put(editBusinessService)
router.route("/location/delete").put(deleteBusinessLocation)
router.route("/profile/personal").put(updatePersonalBusiness)
router.route("/profile/business").put(updateBusinessBusiness)
router.post("/login", authBus)
export default router
