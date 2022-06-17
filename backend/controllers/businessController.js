import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import Business from "../models/businessModel.js"
import Appointment from "../models/appointmentModels.js"
import "../middleware/authMiddleware.js"
import User from "../models/userModel.js"

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.USER_SECRET, {
    expiresIn: "30d",
  })
}
//@desc  Auth business & get token
//@route POST /api/business/login
//@acess Public
const authBus = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const business = await Business.findOne({ email })

  if (business && (await business.matchPassword(password))) {
    res.json(business)
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

//@desc  Register a new user
//@route POST /api/users
//@acess Public
const registerBusiness = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phonenumber,
    businessname,
    description,
    category,
    address,
    lat,
    lng,
    apt,
  } = req.body

  const businessExists = await Business.findOne({ email })

  if (businessExists) {
    res.status(400)
    throw new Error("Business already exist")
  }

  const business = await Business.create({
    role: "business",
    businessName: businessname,
    category: category,
    password: password,
    name: name,
    email: email,
    phone: phonenumber,
    avatar: {
      path: "https://res.cloudinary.com/deveke/image/upload/v1653260552/xddpnrsnogieb1scfqdz.png",
      filename: "xddpnrsnogieb1scfqdz",
    },
    joined: new Date(),
    locations: {
      address: address,
      latitude: lat,
      longitude: lng,
    },
    details: description,
    mainPicture:
      "https://res.cloudinary.com/deveke/image/upload/v1654994715/vsymmz5fmd0df2iuyg1x.jpg",
    gallery: [],
    services: [],
    appointments: [],
    schedule: [
      {
        location: {
          address: address,
          latitude: lat,
          longitude: lng,
        },
      },
    ],
    documents: [],
    experience: 0,
    approved: false,
    rating: 0,
  })

  const createdBusiness = await Business.findById(business._id)
  res.json(createdBusiness)
})

// *******Update personal business*******

//@desc  update personal business
//@route POST /api/users/profile
//@acess Public
const updatePersonalBusiness = asyncHandler(async (req, res) => {
  const { name, email, phone, id } = req.body

  const business = await Business.findByIdAndUpdate(id, {
    name: name,
    email: email,
    phone: phone,
  })

  const updatedBusiness = await Business.findById(id)

  res.json(updatedBusiness)
})
//@desc  update personal business
//@route POST /api/users/profile
//@acess Public
const updateBusinessBusiness = asyncHandler(async (req, res) => {
  const { businessName, details, experience, id } = req.body
  const business = await Business.findByIdAndUpdate(id, {
    businessName: businessName,
    details: details,
    experience: experience,
  })

  const updatedBusiness = await Business.findById(id)

  res.json(updatedBusiness)
})

// *******Update location*******

const updateBusinessLocation = asyncHandler(async (req, res) => {
  const { id, newLocation, newLong, newLat } = req.body
  await Business.findByIdAndUpdate(id, {
    $push: {
      locations: {
        address: newLocation,
        latitude: newLat,
        longitude: newLong,
      },
      schedule: {
        location: {
          address: newLocation,
          latitude: newLat,
          longitude: newLong,
        },
      },
    },
  })
  const updatedBusiness = await Business.findById(id)
  res.json(updatedBusiness)
})

// *******Delete location*******

const deleteBusinessLocation = asyncHandler(async (req, res) => {
  const { bId, id, address } = req.body

  const schedule = await Business.findById(bId, "schedule")
  const scheduleByAddress = schedule.schedule.find(
    (e) => e.location.address === address
  )

  await Business.findByIdAndUpdate(bId, {
    $pull: {
      locations: { _id: id },
      schedule: { _id: scheduleByAddress._id },
    },
  })

  const updatedBusiness = await Business.findById(bId)
  res.json(updatedBusiness)
})
// *******Update service*******

const updateBusinessService = asyncHandler(async (req, res) => {
  const { id, name, duration, price } = req.body
  const business = await Business.findByIdAndUpdate(id, {
    $push: {
      services: {
        name: name,
        duration: duration,
        price: price,
      },
    },
  })
  const updatedBusiness = await Business.findById(id)
  res.json(updatedBusiness)
})
// *******Delete service*******

const deleteBusinessService = asyncHandler(async (req, res) => {
  const { bId, id } = req.body
  const business = await Business.findByIdAndUpdate(bId, {
    $pull: {
      services: { _id: id },
    },
  })
  const updatedBusiness = await Business.findById(bId)
  res.json(updatedBusiness)
})
// *******Update service*******

const editBusinessService = asyncHandler(async (req, res) => {
  const { bid, id, name, duration, price } = req.body
  const business = await Business.findByIdAndUpdate(id, {
    $push: {
      services: {
        name: name,
        duration: duration,
        price: price,
      },
    },
  })
  const updatedBusiness = await Business.findById(id)
  res.json(updatedBusiness)
})
// *******make appointment*******

const makeAppointment = asyncHandler(async (req, res) => {
  const { uid, sid, schServices, schLocation, startDate } = req.body

  const businessExists = await Appointment.findOne({ datetime: startDate })

  if (businessExists) {
    res.status(400)
    throw new Error("Appointment already exist")
  }

  const appointment = await Appointment.create({
    user: uid,
    business: sid,
    services: schServices,
    location: schLocation,
    datetime: startDate,
    userstatus: "Pending",
    businessstatus: "Pending",
  })
  const business = await Business.findByIdAndUpdate(sid, {
    $push: {
      appointments: [appointment._id],
    },
  })
  const user = await User.findByIdAndUpdate(uid, {
    $push: {
      appointments: [appointment._id],
    },
  })

  const updatedUser = await User.findById(uid)
  res.json(updatedUser)
})

// *******Update location*******

const updateBusinessSchedule = asyncHandler(async (req, res) => {
  const { bid, sid, shift, lunch, daysOff, locationSch } = req.body

  const tb = await Business.findByIdAndUpdate(bid, {
    $pull: {
      schedule: { _id: sid },
    },
  })

  const tb1 = await Business.findByIdAndUpdate(bid, {
    $push: {
      schedule: {
        location: {
          address: locationSch.address,
          latitude: locationSch.latitude,
          longitude: locationSch.longitude,
        },
        start: {
          hours: shift.starthour,
          minutes: shift.startmin,
          td: shift.starttd,
        },
        end: {
          hours: shift.endhour,
          minutes: shift.endmin,
          td: shift.endtd,
        },
        lunch: {
          start: {
            hours: lunch.starthour,
            minutes: lunch.startmin,
            td: lunch.starttd,
          },
          end: {
            hours: lunch.endhour,
            minutes: lunch.endmin,
            td: lunch.endtd,
          },
        },
        daysoff: { daysOff },
      },
    },
  })

  const updatedBusiness = await Business.findById(bid)
  res.json(updatedBusiness)
})

// *******Get businesses*******

//@desc  update personal business
//@route POST /api/users/profile
//@acess Public
const getBusinesses = asyncHandler(async (req, res) => {
  const { category, pageNumber } = req.body

  //product number in one page
  const pageSize = 10
  const page = Number(pageNumber) || 1

  //search validation
  const keyword = [
    {
      category: {
        $regex: category,
        $options: "x",
      },
    },
  ]
  // const keywordD = [
  //   {
  //     businessName: {
  //       $regex: category,
  //       $options: "x",
  //     },
  //   },
  // ]

  const count = await Business.countDocuments(keyword)
  let businesses = []
  if (category instanceof Array) {
    for (let cat in category) {
      const jk = await Business.find({ category: category[cat].shortName })
      businesses.push(jk[0])
    }

    // category.map(async (cat) => {
    //   const jk = await Business.find({ category: cat.shortName })
    //   businesses.push(jk)
    // })

    // businesses = await Business.find({ category: category.shortName })
    //   .limit(pageSize)
    //   .skip(pageSize * (page - 1))
  } else {
    if (category === "allbusinesses") {
      businesses = await Business.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    } else {
      businesses = await Business.find({ category: category })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    }
  }
  res.json({ businesses, page, pages: Math.ceil(count / pageSize) })
})

// *******Get business Details*******

//@desc  update personal business
//@route POST /api/users/profile
//@acess Public
const getBusinesDetails = asyncHandler(async (req, res) => {
  const { category, id } = req.body

  const businesses = await Business.find({
    category: category,
  })
  const obj = businesses.find((x) => x._id == id)

  res.json(obj)
})
export {
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
}
