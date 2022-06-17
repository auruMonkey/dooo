import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import cloudinary from "../middleware/cloudinaryMiddleware.js"
import User from "../models/userModel.js"
import Business from "../models/businessModel.js"
import multer from "multer"

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.USER_SECRET, {
    expiresIn: "30d",
  })
}
//@desc  add image to cloudinary
//@route POST /api/upload
//@acess Public
const uploadAvatar = asyncHandler(async (req, res) => {
  let nwUser
  try {
    const fileStr = req.body.data
    const userI = req.body.userId
    const oldFileName = req.body.olddata
      .substring(req.body.olddata.lastIndexOf("/") + 1)
      .split(".")[0]

    const uploadedResponse = await cloudinary.uploader.upload(fileStr)
    const deleteResponse = await cloudinary.uploader.destroy(oldFileName, {
      invalidate: true,
      resource_type: "image",
    })

    //update user

    const user = await User.findOneAndUpdate(
      { _id: userI },
      {
        $set: {
          avatar: {
            path: uploadedResponse.secure_url,
            filename: uploadedResponse.public_id,
          },
        },
      }
    )
    const updatedUser = await User.findById(userI)

    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ err: "Something went wrong" })
  }
})
//@desc  add image to cloudinary
//@route POST /api/upload
//@acess Public
const uploadAvatarBusiness = asyncHandler(async (req, res) => {
  let nwUser
  try {
    const fileStr = req.body.data
    const businessI = req.body.businessId
    const oldFileName = req.body.olddata
      .substring(req.body.olddata.lastIndexOf("/") + 1)
      .split(".")[0]

    const uploadedResponse = await cloudinary.uploader.upload(fileStr)
    const deleteResponse = await cloudinary.uploader.destroy(oldFileName, {
      invalidate: true,
      resource_type: "image",
    })

    //update user

    const business = await Business.findOneAndUpdate(
      { _id: businessI },
      {
        $set: {
          avatar: {
            path: uploadedResponse.secure_url,
            filename: uploadedResponse.public_id,
          },
        },
      }
    )
    const updatedBusiness = await Business.findById(businessI)

    res.json(updatedBusiness)
  } catch (error) {
    console.error(error)
    res.status(500).json({ err: "Something went wrong" })
  }
})

//@desc  add image to cloudinary
//@route POST /api/upload
//@acess Public
const uploadDocument = asyncHandler(async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })

  const upload = multer({ storage: storage })
  upload.single("file")
  try {
    // const newpath = __dirname + "/files/"
    // const document = req.files.file
    // const documentName = document.name
    // const fileStr = req.body.data
    // const userI = req.body.userId
    // const oldFileName = req.body.olddata
    //   .substring(req.body.olddata.lastIndexOf("/") + 1)
    //   .split(".")[0]
    // const uploadedResponse = await cloudinary.uploader.upload(fileStr)
    // const deleteResponse = await cloudinary.uploader.destroy(oldFileName, {
    //   invalidate: true,
    //   resource_type: "image",
    // })
    //update user
    // const user = await User.findOneAndUpdate(
    //   { _id: userI },
    //   {
    //     $set: {
    //       avatar: {
    //         path: uploadedResponse.secure_url,
    //         filename: uploadedResponse.public_id,
    //       },
    //     },
    //   }
    // )
    // res.json({
    //   _id: user._id,
    //   role: user.role,
    //   password: user.password,
    //   name: user.name,
    //   email: user.email,
    //   phone: user.phone,
    //   path: user.avatar.path,
    //   filename: user.avatar.filename,
    //   token: generateToken(user._id),
    // })
  } catch (error) {
    console.error(error)
    res.status(500).json({ err: "Something went wrong" })
  }
})
//@desc  add image to business galary
//@route POST /api/upload
//@acess Public
const addImageBusiness = asyncHandler(async (req, res) => {
  const { id, image } = req.body

  try {
    const uploadedResponse = await cloudinary.uploader.upload(image)

    const business = await Business.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          gallery: {
            path: uploadedResponse.secure_url,
            filename: uploadedResponse.public_id,
          },
        },
      }
    )
    const updatedBusiness = await Business.findById(id)
    res.json(updatedBusiness)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})
//@desc  add image to business galary
//@route POST /api/upload
//@acess Public
const addMain = asyncHandler(async (req, res) => {
  const { path, bid } = req.body
  try {
    const business = await Business.findOneAndUpdate(
      { _id: bid },
      { $set: { mainPicture: path } },
      { new: true }
    )
    const updatedBusiness = await Business.findById(bid)
    res.json(updatedBusiness)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})
//@desc  add image to cloudinary
//@route POST /api/upload
//@acess Public
const deleteImageBusiness = asyncHandler(async (req, res) => {
  try {
    const businessI = req.body.bid
    const imageID = req.body.id

    //update user

    await Business.findOneAndUpdate(
      { _id: businessI },
      {
        $pull: {
          gallery: {
            _id: imageID,
          },
        },
      }
    )
    const updatedBusiness = await Business.findById(businessI)

    res.json(updatedBusiness)
  } catch (error) {
    console.error(error)
    res.status(500).json({ err: "Something went wrong" })
  }
})

export {
  uploadAvatar,
  uploadDocument,
  uploadAvatarBusiness,
  addImageBusiness,
  deleteImageBusiness,
  addMain,
}
//********************Clean cloudinary*/
// var result = []

// var options = { resource_type: "image", folder: "deveke", max_results: 500 }

// function listResources(next_cursor) {
//   if (next_cursor) {
//     options["next_cursor"] = next_cursor
//   }

//   cloudinary.api.resources(options, function (error, res) {
//     if (error) {
//       console.log(error)
//     }
//     var more = res.next_cursor
//     var resources = res.resources

//     for (var res in resources) {
//       res = resources[res]
//       var resultTemp = []
//       var url = res.secure_url
//       resultTemp.push(url)
//       result.push(resultTemp)
//     }

//     if (more) {
//       listResources(more)
//     } else {
//       console.log("done")
//       console.log(result)
//     }
//   })
// }
// listResources(null)
