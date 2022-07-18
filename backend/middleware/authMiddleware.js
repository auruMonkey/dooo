// import jwt from "jsonwebtoken"
// import asyncHandler from "express-async-handler"
// import dotenv from "dotenv"
// import User from "../models/userModel.js"

// import passportJWT from "passport-jwt"
// import passport from "passport"
// import { Strategy as LocalStrategy } from "passport-local"
// import Admin from "../models/adminModel.js"

// dotenv.config()

// // let Admins = require("../models/admin").Admin
// let JWTStrategy = passportJWT.Strategy
// let ExtractJWT = passportJWT.ExtractJwt

// passport.use(
//   "adminLocal",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     (email, password, callback) => {
//       console.log(email + " " + password)
//       Admin.findOne({ email: email }, (error, admin) => {
//         if (error) {
//           console.log("Couldnt find business with the email")
//           return callback(error)
//         }
//         if (!admin) {
//           console.log("Incorrect Email")
//           return callback(null, false, {
//             message: "Incorrect email or password",
//           })
//         }
//         if (admin.comparePassword(password)) {
//           console.log("finished")
//           return callback(null, admin)
//         } else {
//           return res.status(400).send({
//             message: "Wrong password",
//           })
//         }
//       })
//     }
//   )
// )

// passport.use(
//   "adminJWT",
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.ADMIN_SECRET,
//     },
//     (jwtPayload, callback) => {
//       return Admin.findById(jwtPayload._id)
//         .then((auth) => {
//           return callback(null, auth)
//         })
//         .catch((error) => {
//           return callback(error)
//         })
//     }
//   )
// )

// passport.use(
//   "userLocal",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     (email, password, callback) => {
//       console.log(email + " " + password)
//       User.findOne({ email: email }, (error, user) => {
//         if (error) {
//           console.log("Couldnt find user with that email")
//           return callback(error)
//         }
//         if (!user) {
//           console.log("Incorrect Email")
//           return callback(null, false, {
//             message: "Incorrect email or password.",
//           })
//         }
//         if (user.comparePassword(password)) {
//           console.log("finished")
//           return callback(null, user)
//         } else {
//           return res.status(400).send({
//             message: "Wrong Password",
//           })
//         }
//       })
//     }
//   )
// )

// passport.use(
//   "userJWT",
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.USER_SECRET,
//     },
//     (jwtPayload, callback) => {
//       return User.findById(jwtPayload._id)
//         .then((auth) => {
//           return callback(null, auth)
//         })
//         .catch((error) => {
//           return callback(error)
//         })
//     }
//   )
// )

// const protect = asyncHandler(async (req, res, next) => {
//   let token
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1]
//       const decoded = jwt.verify(token, process.env.JWT_SECRET)
//       req.user = await User.findById(decoded.id).select("-password")
//       next()
//     } catch (error) {
//       console.error(error)
//       res.status(401)
//       throw new Error("Not authorized, token failed")
//     }
//   }
//   if (!token) {
//     res.status(401)
//     throw new Error("Not authorized, no token")
//   }
// })

// export { protect }
