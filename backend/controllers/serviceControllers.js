import asyncHandler from "express-async-handler"
import nodemailer from "nodemailer"
import Business from "../models/businessModel.js"

//@desc  Fetch all services
//@route Get api/services
//@acess Public
const getServices = asyncHandler(async (req, res) => {
  //pagination
  //product number in one page
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const category = req.query.category

  //search validation
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}

  // const count = await Business.countDocuments({ ...keyword })
  const count = await Business.countDocuments(
    {},
    { category: req.query.keyword }
  )
  // const services = await Business.find({}, { ...req.query.keyword })
  const services = await Business.find({ category: category })

  // .limit(pageSize)
  // .skip(pageSize * (page - 1))
  res.json({ services })

  // res.json({ services, page, pages: Math.ceil(count / pageSize) })
})

//@desc  Fetch all services
//@route Get api/services
//@acess Public
const setEmail = asyncHandler(async (req, res) => {
  const { form } = req.body
  console.log(form)
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secureConnection: false,
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: "contact@doomoble.com",
      pass: "Salon@#12345",
    },
  })
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
    } else {
      console.log("Server is ready to take our messages")
    }
  })
  var mail = {
    from: "contact@doomoble.com",
    to: form.to,
    subject: form.subject,
    text: form.message,
  }
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      })
      console.log(err)
    } else {
      res.json({
        status: "success",
      })
      console.log(data)
    }
  })
})

export { getServices, setEmail }
