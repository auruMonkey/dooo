import express from "express"
import path from "path"
import dotenv from "dotenv"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import userRoutes from "./routes/userRoutes.js"
import businessRoutes from "./routes/businessRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import settingsRoutes from "./routes/settingsRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

//routers
app.use("/api/users", userRoutes)
app.use("/api/business", businessRoutes)
app.use("/api/settings", settingsRoutes)
// app.use("/api/services", serviceRoutes)
// app.use("/api/admin", serviceRoutes)
// app.use("/api/appointments", serviceRoutes)
app.use("/api/upload", uploadRoutes)

//prepare for deploy
const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
