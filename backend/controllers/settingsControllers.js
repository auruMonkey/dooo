import asyncHandler from "express-async-handler"
import Setting from "../models/settingsModel.js"

//@desc  get setting
//@route GET /api/settings
//@acess Public
const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.find()
  res.json(settings)
})

//@desc  add setting
//@route GET /api/settings
//@acess Public
const addSettings = asyncHandler(async (req, res) => {
  const { id, category, newName } = req.body

  const settings = await Setting.findByIdAndUpdate(
    { _id: id },
    {
      $addToSet: {
        userServices: {
          name: newName,
          shortName: category,
          // icon: {
          //   element: element,
          //   size: size,
          // },
        },
      },
    }
  )
  const newSettings = await Setting.find()
  res.json(newSettings)
})

export { getSettings, addSettings }
