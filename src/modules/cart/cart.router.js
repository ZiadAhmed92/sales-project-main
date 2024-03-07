import express from 'express'
import { addProductToCart, getLogedUserCart, removeProductFromCart, updateQuantity } from './cart.controller.js'
import { protectedRoutes } from '../auth/auth.controller.js'

const cartRouter =express.Router()
cartRouter.post( '/',protectedRoutes,addProductToCart )
cartRouter.delete( '/:id',protectedRoutes,removeProductFromCart )
cartRouter.put( '/:id',protectedRoutes,updateQuantity )
cartRouter.get('/', protectedRoutes, getLogedUserCart )

export default cartRouter