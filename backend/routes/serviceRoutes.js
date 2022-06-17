import express from "express"
const router = express.Router()
import { getServices } from "../controllers/serviceControllers.js"

router.route("/").get(getServices)

export default router
