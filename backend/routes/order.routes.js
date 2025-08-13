/**
 * ===================================
 * ORDER ROUTES (order.routes.js)
 * ===================================
 * Maneja todas las rutas relacionadas con órdenes/pedidos
 */

import express from 'express'
import * as orderController from '../controllers/order.controller.js'
import { isAdmin, isAuth } from '../middleware/auth.js'

const router = express.Router()

// === RUTAS DE ADMINISTRADOR ===
// Requieren autenticación Y permisos de admin (isAuth + isAdmin)

router.get('/', isAuth, isAdmin, orderController.getAllOrders) // GET /api/orders/ - Obtiene todas las órdenes del sistema (solo admin)
router.get('/summary', isAuth, isAdmin, orderController.getOrderSummary) // GET /api/orders/summary - Obtiene resumen/estadísticas de órdenes (solo admin)
router.delete('/admin/:id', isAuth, isAdmin, orderController.deleteOrder) // DELETE /api/orders/admin/123 - Elimina una orden específica (solo admin)
router.put('/admin/:id/deliver', isAuth, isAdmin, orderController.updateOrderToDelivered) // PUT /api/orders/admin/123/deliver - Marca una orden como entregada (solo admin)

// === RUTAS DE USUARIOS AUTENTICADOS ===
// Requieren solo autenticación (isAuth)

router.post('/', isAuth, orderController.createOrder) // POST /api/orders/ - Crea una nueva orden
router.get('/mine', isAuth, orderController.getUserOrders) // GET /api/orders/mine - Obtiene las órdenes del usuario autenticado
router.get('/:id', isAuth, orderController.getOrderById) // GET /api/orders/123 - Obtiene una orden específica por ID
router.put('/:id/pay', isAuth, orderController.updateOrderToPaid) // PUT /api/orders/123/pay - Marca una orden como pagada

export default router
