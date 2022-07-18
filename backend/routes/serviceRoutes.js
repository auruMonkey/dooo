import express from "express"
const router = express.Router()
import { setEmail, getServices } from "../controllers/serviceControllers.js"

router.route("/mail").post(setEmail)
router.route("/").get(getServices)

export default router
