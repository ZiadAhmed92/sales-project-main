import express from 'express'
import { signIn, signUp } from "./auth.controller.js"

let authRouter = express.Router()
authRouter
  .post("/signUp", signUp)
  .post("/signIn", signIn)

export default authRouter;