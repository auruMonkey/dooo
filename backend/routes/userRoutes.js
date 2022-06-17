import express from "express"
const router = express.Router()
// import "../middleware/authMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"
import {
  getUsers,
  registerUser,
  authUser,
  updateUser,
  getAppts,
} from "../controllers/userController.js"

router.route("/").get(getUsers).post(registerUser)
router.route("/appts").post(getAppts)
router.route("/profile").put(updateUser)
router.post("/login", authUser)

export default router
