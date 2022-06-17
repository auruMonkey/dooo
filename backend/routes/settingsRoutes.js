import express from "express"
const router = express.Router()

import { getSettings, addSettings } from "../controllers/settingsControllers.js"

router.route("/").get(getSettings).post(addSettings)

export default router
