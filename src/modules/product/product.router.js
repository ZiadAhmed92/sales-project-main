import express from "express";
import { createProduct, deleteProduct, getAllProduct, updateProduct } from "./product.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {

    cb(null, uuidv4() + '-' + file.originalname)
  }
})
function fileFilter(req, file, cb) {
  file.mimetype.startsWith("image") ? cb(null, true) : cb(new AppError('Image Only', 400), false)
}
const upload = multer({ storage, fileFilter })



// upload.single("imageCover"),

const productRouter = express.Router()
productRouter
  .route("/")
  .post( protectedRoutes, allowedTo('admin'), createProduct)
  .get(getAllProduct)
productRouter
  .route("/:id")
  .put( protectedRoutes, allowedTo('admin'), updateProduct)
  .delete(protectedRoutes, allowedTo('admin') ,deleteProduct)
  



export default productRouter