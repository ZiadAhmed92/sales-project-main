import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { AppError } from "../../utils/AppError.js";
import { handlingError } from "../../utils/handlingError.js";

function calc(cart) {
    let totalPrice = 0
    cart.cartItems.forEach(element => {
        totalPrice += element.quantity * element.salary
    });
    cart.totalPrice = totalPrice
}

const addProductToCart = handlingError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if (!product) return next(new AppError("Porduct Not Found", 401))
    req.body.salary = product.salary
    const cartExist = await cartModel.findOne({ userId: req.user._id })
    if (!cartExist) {
        const cart = new cartModel({
            userId: req.user._id,
            cartItems: [req.body]
        })
        calc(cart)
        await cart.save()
        return res.json({ message: "success", cart })
    }
    let Exist = cartExist.cartItems.find((ele) => ele.product == req.body.product)
    if (Exist) {
        Exist.quantity += 1
    } else {
        cartExist.cartItems.push(req.body)
    }
    calc(cartExist)
    await cartExist.save()
    res.json({ message: "success", cart: cartExist })

})

const removeProductFromCart = handlingError(async (req, res, next) => {
    const result = await cartModel.findOneAndUpdate({ userId: req.user._id }, { $pull: { cartItems: { product: req.params.id } } }, { new: true })
    !result && next(new AppError("product not found or not found cart"))
  
    calc(result)
    await result.save()
    result && res.json({ message: "success", cart: result })
})

const updateQuantity = handlingError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)
    if (!product) return next(new AppError("Porduct Not Found", 401))
    const cartExist = await cartModel.findOne({ userId: req.user._id })
    let item = cartExist.cartItems.find(ele => ele.product == req.params.id)
    if (item) {
        item.quantity = req.body.quantity
    }
    calc(cartExist)
    
    await cartExist.save()
    res.json({ message: "success", cart: cartExist })
})

const getLogedUserCart = handlingError(async (req,res,next)=>{
    const cartItems =await cartModel.findOne({userId:req.user._id}).populate('cartItems.product')
    !cartItems&&next(new AppError("cart not found",401))
    cartItems&& res.json({message:"success",cart:cartItems})
})
export {
    addProductToCart ,
    removeProductFromCart ,
    updateQuantity,
    getLogedUserCart
}