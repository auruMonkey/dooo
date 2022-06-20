import express from "express"
const router = express.Router()
import { getAppointmentById } from "../controllers/appointmentsController.js"

router.route("/").post(getAppointmentById)

export default router
