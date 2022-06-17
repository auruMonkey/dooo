import mongoose from "mongoose"

let settingsSchema = mongoose.Schema({
  mainServices: [
    {
      name: { type: String, required: true },
      shortName: { type: String, required: true },
      icon: {
        element: { type: String },
        size: { type: String },
      },
    },
  ],
  usersServices: [
    {
      name: { type: String },
      shortName: { type: String },
    },
  ],
})

const Setting = mongoose.model("Setting", settingsSchema)
export default Setting
