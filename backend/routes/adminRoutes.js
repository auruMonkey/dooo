import express from "express"
const router = express.Router()
// import "../middleware/authMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"
import {
  authAdmin,
  registerAdmin,
  findAdmin,
  deleteAdmin,
} from "../controllers/adminController.js"

router.post("/login", authAdmin)
router.post("/create", registerAdmin)
router.post("/find", findAdmin)
router.post("/delete", deleteAdmin)

export default router
