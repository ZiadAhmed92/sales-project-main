import { cartModel } from "../../../database/models/cart.model.js"
import { orderModel } from "../../../database/models/order.model.js"
import { AppError } from "../../utils/AppError.js"
import { handlingError } from "../../utils/handlingError.js"


const createOrder = handlingError(async (req, res, next) => {
    const cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError("cart not found", 401))
    const totalOrderPrice =cart.totalPrice
    const order = new orderModel({
        userId: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice
    })

    await order.save()
      await cartModel.findByIdAndDelete(req.params.id)


    res.json({ message: 'success', order })
})
const getAllorders =handlingError(async (req,res)=>{
    const  data=await orderModel.find({})
    res.json({message:"success",data})

})

export {
    createOrder ,
    getAllorders
}