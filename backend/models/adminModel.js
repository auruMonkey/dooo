import mongoose from "mongoose"
import bcrypt from "bcryptjs"

let adminSchema = mongoose.Schema({
  role: { type: String, require: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
})

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// adminSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password)
// }
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

let Admin = mongoose.model("Admin", adminSchema)

export default Admin
