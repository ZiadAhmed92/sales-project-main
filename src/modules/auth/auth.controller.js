import { handlingError } from "../../utils/handlingError.js"
import { generateToken } from "../../utils/generateToken.js"
import { AppError } from "../../utils/AppError.js"
import { userModel } from "../../../database/models/user.model.js"
import jwt from 'jsonwebtoken'
export const signUp = handlingError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email })
  if (user) return next(new AppError("User Already Exist ", 409))
  let results = new userModel(req.body)
  await results.save()
  res.json({ message: "success", data: results })
})

export const signIn = handlingError(async (req, res, next) => {
  let { email, password } = req.body
  let user = await userModel.findOne({ email })

  if (!user) return next(new AppError("Email Invalid", 401))
  if (user.password !== password) return next(new AppError("Password Invalid", 401))

  let token = generateToken({ _id: user._id, name: user.name, email: user.email })
  user.password = null
  res.json({ message: "success", token, data: user })

})

export const protectedRoutes = handlingError(async (req, res, next) => {
  let { token } = req.headers
  if (!token) return next(new AppError("Token Not Provided", 401))

  let decode = jwt.verify(token, "process.env.SECRET_KEY")


  let user = await userModel.findById(decode._id)
  if (!user) return next(new AppError("Invalid Token", 401))

  req.user = user
  next()

})

export const allowedTo = (...roles) => {
  return handlingError(async (req, res, next) => {

    if (!roles.includes(req.user.role)) return next(new AppError(`You Are Not Authorized To Access This Route : You are ${req.user.role}`, 401))

    next()
  })
}
