import { handlingError } from "../../utils/handlingError.js"
import { AppError } from "../../utils/AppError.js"
import { productModel } from "../../../database/models/product.model.js"

// if (!req.file) return next(new AppError("Image Required", 404))
// req.body.imageCover = req.file.filename

const createProduct = handlingError(async (req, res, next) => {
  req.body.userId = req.user._id
  const { categoryName,name,salary } = req.body
  console.log(req.body)
  let results = new productModel({name,salary,userId: req.body.userId, categoryName })
  await results.save()
  res.status(200).json({ message: "success", data: results })
})

const getAllProduct = handlingError(async (req, res, next) => {
  let results = productModel.find()
  if (req.query.keyword) {
    results.find({
      $or: [
        { categoryName: { $regex: req.query.keyword, $options: 'i' } }
      ]
    })
  }
  let data = await results
  res.status(200).json({ message: "success", data })
})

const updateProduct = handlingError(async (req, res, next) => {
  const { id } = req.params
  // if (req.file) {
  //   req.body.imageCover = req.file.filename
  // }
  let results = await productModel.findByIdAndUpdate(id, req.body, { new: true })
  results ? res.status(200).json({ message: "success", data: results }) : next(new AppError("Product Not Found", 404))
})

const deleteProduct = handlingError(async (req, res, next) => {
  const { id } = req.params
  let results = await productModel.findByIdAndDelete(id)
  results ? res.status(200).json({ message: "success", data: results }) : next(new AppError("Product Not Found", 404))
})


export {
  deleteProduct,
  getAllProduct,
  updateProduct,
  createProduct
}