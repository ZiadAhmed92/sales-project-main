
import mongoose from "mongoose";

const orderSchema =mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    cartItems: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'product' } ,
            price:Number ,
            quantity:Number
        }

    ],
    totalOrderPrice:Number 
},{timestamps:true})


orderSchema.pre('find', function () {
    this.populate('cartItems.product',['name']);
  });
  
export const orderModel =mongoose.model( 'order', orderSchema ) ;