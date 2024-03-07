import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    userId: {
         type: mongoose.Types.ObjectId,
          ref:'user' 
        },

        cartItems:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId ,
                    ref:"product"
                },
                quantity:{type:Number ,default:1} ,
                salary: Number
            }
        ],
        totalPrice:Number 
    
} ,{timetamps:true})

export const cartModel = mongoose.model("cart",cartSchema)