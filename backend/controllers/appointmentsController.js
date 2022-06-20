import asyncHandler from "express-async-handler"
import Appointment from "../models/appointmentModels.js"

//@desc  get appointment by Id
//@route POST /api/appointments
//@acess Public
const getAppointmentById = asyncHandler(async (req, res) => {
  const { idApp } = req.body

  const appointment = await Appointment.findById({
    _id: idApp,
  })

  res.json(appointment)
})

export { getAppointmentById }
