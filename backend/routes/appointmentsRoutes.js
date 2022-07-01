import express from "express"
const router = express.Router()
import {
  getAppointmentById,
  cancelAppointmentById,
} from "../controllers/appointmentsController.js"

router.route("/").post(getAppointmentById)
router.route("/cancel").post(cancelAppointmentById)

export default router
