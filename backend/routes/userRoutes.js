import express from "express"
const router = express.Router()
import "../middleware/authMiddleware.js"
// import { protect } from "../middleware/authMiddleware.js"
import {
  getUsers,
  registerUser,
  authUser,
  updateUser,
  getAppts,
  updateAppts,
  userById,
} from "../controllers/userController.js"

router.route("/").get(getUsers).post(registerUser)
router.route("/id").post(userById)
router.route("/appts").post(getAppts)
router.route("/appts/update").post(updateAppts)
router.route("/profile").put(updateUser)
router.post("/login", authUser)

export default router
