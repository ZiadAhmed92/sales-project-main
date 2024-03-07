
import mongoose from "mongoose";
let productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "الاسم مطلوب"],

  },
  categoryName: {
    type: String,
    required: [true, "الاسم مطلوب"],
  },
  salary: {
    type: Number,
    required: [true, "السعر مطلوب"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  }
}, { timestamps: true });


// productSchema.post("init", (doc) => {
//   console.log(doc)
//   doc.imageCover = "http://localhost:3000/" + doc.imageCover

// })

productSchema.pre('find', function (next) {
  this.populate('userId', 'name');
  next();
});




export const productModel = mongoose.model('product', productSchema)