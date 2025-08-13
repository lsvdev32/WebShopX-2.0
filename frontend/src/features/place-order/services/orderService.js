import axios from 'axios'

/**
 * Servicio para manejar operaciones relacionadas con la creación de órdenes
 * @module orderService
 */

/**
 * Crea una nueva orden en el servidor
 * @param {Object} orderData - Datos de la orden (ítems, dirección, método de pago, precios)
 * @param {string} token - Token de autenticación del usuario
 * @returns {Promise} Datos de la orden creada
 */
export const createOrder = async (orderData, token) => {
  const { data } = await axios.post('/api/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}
