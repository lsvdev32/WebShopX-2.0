import axios from 'axios'

/**
 * Servicio para manejar operaciones relacionadas con órdenes
 * @module orderService
 */

/**
 * Obtiene la lista de órdenes (requiere permisos de administrador)
 * @param {string} token - Token de autenticación
 * @returns {Promise} Lista de órdenes
 */
export const fetchOrders = async (token) => {
  const { data } = await axios.get('/api/orders', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Marca una orden como entregada (requiere permisos de administrador)
 * @param {string} orderId - ID de la orden
 * @param {string} token - Token de autenticación
 * @returns {Promise} Respuesta de la actualización
 */
export const markOrderAsDelivered = async (orderId, token) => {
  const { data } = await axios.put(`/api/orders/admin/${orderId}/deliver`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

/**
 * Elimina una orden por su ID (requiere permisos de administrador)
 * @param {string} orderId - ID de la orden
 * @param {string} token - Token de autenticación
 * @returns {Promise} Respuesta de la eliminación
 */
export const deleteOrder = async (orderId, token) => {
  await axios.delete(`/api/orders/admin/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
