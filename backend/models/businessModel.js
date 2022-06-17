import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const businessSchema = mongoose.Schema({
  role: { type: String, require: true },
  businessName: { type: String, required: true },
  category: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: {
    path: { type: String },
    filename: { type: String },
  },
  joined: { type: Date },
  locations: [
    {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  ],
  details: { type: String, required: true },
  mainPicture: { type: String },
  gallery: [
    {
      path: { type: String },
      filename: { type: String },
    },
  ],
  services: [
    {
      name: { type: String },
      price: { type: Number },
      duration: { type: Number },
    },
  ],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  schedule: [
    {
      location: {
        address: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
      },
      start: {
        hours: { type: String },
        minutes: { type: String },
        td: { type: String },
      },
      end: {
        hours: { type: String },
        minutes: { type: String },
        td: { type: String },
      },
      daysoff: {},
      lunch: {
        start: {
          hours: { type: String },
          minutes: { type: String },
          td: { type: String },
        },
        end: {
          hours: { type: String },
          minutes: { type: String },
          td: { type: String },
        },
      },
      options: [
        {
          name: { type: String },
          value: { type: String },
        },
      ],
    },
  ],
  documents: [
    {
      name: { type: String },
      type: { type: String },
      path: { type: String },
    },
  ],
  experience: { type: Number },
  approved: { type: Boolean },
  rating: { type: Number },
})

businessSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

businessSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const Business = mongoose.model("Business", businessSchema)

export default Business
