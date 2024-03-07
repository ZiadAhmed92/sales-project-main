import express from 'express'
import { addProductToCart, removeProductFromCart, updateQuantity } from './cart.controller.js'
import { protectedRoutes } from '../auth/auth.controller.js'

const cartRouter =express.Router()
cartRouter.post( '/',protectedRoutes,addProductToCart )
cartRouter.delete( '/:id',protectedRoutes,removeProductFromCart )
cartRouter.put( '/:id',protectedRoutes,updateQuantity )

export default cartRouter