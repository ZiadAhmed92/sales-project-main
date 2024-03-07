import mongoose from "mongoose"
let dbConnection = () => {
  mongoose.connect("mongodb+srv://ziad12:ziad123@cluster0.xnavg3n.mongodb.net/sales").then(() => {
    console.log("database connection ...")
  }).catch((err) => {
    console.log(err)
  })
}
export default dbConnection