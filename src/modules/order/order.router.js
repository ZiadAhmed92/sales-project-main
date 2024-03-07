import express from 'express'
import { createOrder, getAllorders } from './order.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
const orderRouter =express.Router()

orderRouter.post('/:id',protectedRoutes,createOrder)
orderRouter.get('/',protectedRoutes, allowedTo('admin'),getAllorders)

export default orderRouter