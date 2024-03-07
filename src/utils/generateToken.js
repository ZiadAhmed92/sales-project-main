import jwt from "jsonwebtoken"

export let generateToken = (payload) => {

  let token = jwt.sign(payload, "process.env.SECRET_KEY")
  return token
}