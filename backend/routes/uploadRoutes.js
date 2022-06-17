import express from "express"
const router = express.Router()

import {
  uploadAvatar,
  uploadDocument,
  addImageBusiness,
  uploadAvatarBusiness,
  deleteImageBusiness,
  addMain,
} from "../controllers/uploadControllers.js"

router.route("/").post(uploadAvatar)
router.route("/business").post(uploadAvatarBusiness)
router.route("/galery").post(addImageBusiness)
router.route("/galery/main").post(addMain)
router.route("/business/galery/delete").put(deleteImageBusiness)
// router.post("/document", upload.single("file"), (req, res) => {
//   res.send(`/${req.file.path}`)
// })

export default router
