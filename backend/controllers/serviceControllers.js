import asyncHandler from "express-async-handler"
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

export { getServices }
