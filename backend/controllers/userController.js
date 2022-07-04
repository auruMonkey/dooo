import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import Business from "../models/businessModel.js"
import Appointment from "../models/appointmentModels.js"
import "../middleware/authMiddleware.js"

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.USER_SECRET, {
    expiresIn: "30d",
  })
}

//@desc  Get all users
//@route GET /api/users
//@acess Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)

  // .catch((error) => {
  //   res.status(500).send("Error: " + error)
  // })
})

//@desc  Auth user & get token
//@route POST /api/users/login
//@acess Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json(user)
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

//@desc  update user
//@route POST /api/users/profile
//@acess Public
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, id } = req.body

  const user = await User.findByIdAndUpdate(id, {
    name: name,
    email: email,
    phone: phone,
  })

  const updatedUser = await User.findById(id)
  res.json(updatedUser)
})

//@desc  Register a new user
//@route POST /api/users
//@acess Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exist")
  }

  const user = await User.create({
    role: "user",
    name: name,
    email: email,
    password: password,
    phone: phoneNumber,
    avatar: {
      path: "https://res.cloudinary.com/deveke/image/upload/v1653260552/xddpnrsnogieb1scfqdz.png",
      filename: "xddpnrsnogieb1scfqdz",
    },
    joined: new Date(),
    appointments: [],
  })
  const createdUser = await User.findById(user._id)
  if (createdUser) {
    res.status(201).json(createdUser)
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

//@desc  get user appointment
const getAppts = asyncHandler(async (req, res) => {
  const { appt } = req.body
  const newArr = []
  const newArrBus = []

  for (let x of appt) {
    let findedApp = await Appointment.findOne({ _id: x })
    if (findedApp !== null) {
      newArr.push(findedApp)

      let findedBus = await Business.findOne({ _id: findedApp.business })
      newArrBus.push(findedBus)
    }
  }

  res.json({ newArr, newArrBus })
})

export { getUsers, registerUser, authUser, updateUser, getAppts }
