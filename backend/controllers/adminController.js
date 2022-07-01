import asyncHandler from "express-async-handler"
import Admin from "../models/adminModel.js"
import User from "../models/userModel.js"
import Business from "../models/businessModel.js"

//@desc  Auth admin

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })

  if (admin && (await admin.matchPassword(password))) {
    res.json(admin)
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

//@desc  Register a new user
//@route POST /api/users
//@acess Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.create({
    role: "admin",
    email: email,
    password: password,
  })
  const createdUser = await Admin.findById(user._id)
  if (createdUser) {
    res.status(201).json(createdUser)
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})
//@desc  Register a new user
const findAdmin = asyncHandler(async (req, res) => {
  const { name, id, keyword } = req.body
  const nameList = ["name", "email", "_id", "phone", "businessName"]
  let users
  if (name === "User") {
    if (id === 0) {
      users = await User.find({ name: new RegExp(keyword, "i") })
    }
    if (id === 1) {
      users = await User.find({ email: new RegExp(keyword, "i") })
    }
    if (id === 2) {
      users = await User.findById({ _id: keyword })
    }
    if (id === 3) {
      users = await User.find({ phone: new RegExp(keyword, "i") })
    }
  } else {
    if (id === 0) {
      users = await Business.find({ name: new RegExp(keyword, "i") })
    }
    if (id === 1) {
      users = await Business.find({ email: new RegExp(keyword, "i") })
    }
    if (id === 2) {
      users = await Business.findById({ _id: keyword })
    }
    if (id === 3) {
      users = await Business.find({ phone: new RegExp(keyword, "i") })
    }
    if (id === 4) {
      users = await Business.find({ businessName: new RegExp(keyword, "i") })
    }
  }
  res.json(users)
  // const admin = await Admin.create({
  //   role: "admin",
  //   email: email,
  //   password: password,
  // })
  // const createdUser = await Admin.findById(user._id)
  // if (createdUser) {
  //   res.status(201).json(createdUser)
  // } else {
  //   res.status(400)
  //   throw new Error("Invalid user data")
  // }
})

//@desc  Register a new user
const deleteAdmin = asyncHandler(async (req, res) => {
  const { name, id, keyword, bid } = req.body

  let users
  if (name === "User") {
    await User.deleteOne({ _id: bid })
    if (id === 0) {
      users = await User.find({ name: new RegExp(keyword, "i") })
    }
    if (id === 1) {
      users = await User.find({ email: new RegExp(keyword, "i") })
    }
    if (id === 2) {
      users = await User.findById({ _id: keyword })
    }
    if (id === 3) {
      users = await User.find({ phone: new RegExp(keyword, "i") })
    }
  } else {
    await Business.deleteOne({ _id: bid })
    if (id === 0) {
      users = await Business.find({ name: new RegExp(keyword, "i") })
    }
    if (id === 1) {
      users = await Business.find({ email: new RegExp(keyword, "i") })
    }
    if (id === 2) {
      users = await Business.findById({ _id: keyword })
    }
    if (id === 3) {
      users = await Business.find({ phone: new RegExp(keyword, "i") })
    }
    if (id === 4) {
      users = await Business.find({ businessName: new RegExp(keyword, "i") })
    }
  }
  res.json(users)
})

export { authAdmin, registerAdmin, findAdmin, deleteAdmin }
