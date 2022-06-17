import mongoose from "mongoose"

let appointmentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  services: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: Number, required: true },
    },
  ],
  location: {
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  datetime: { type: Date },
  userstatus: { type: String, required: true },
  businessstatus: { type: String, required: true },
})

const Appointment = mongoose.model("Appointment", appointmentSchema)
export default Appointment
