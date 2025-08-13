/**
 * Funcion para calcular el precio total de un pedido
 * @param {*} subtotal - El subtotal del pedido
 * @param {*} taxRate - La tasa de impuesto a aplicar (por ejemplo, 0.19 para 19%)
 * @returns {number} - El precio total del pedido
 */
export const calculateShipping = (subtotal) => {
  const FREE_SHIPPING_THRESHOLD = 80000
  const BASE_SHIPPING_COST = 20000

  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING_COST
}

/**
 * Calcula el total del pedido incluyendo impuestos y costos de envío
 * @param {*} subtotal - El subtotal del pedido
 * @param {*} shippingCost - El costo de envío del pedido
 * @returns  {number} - El total del pedido
 */
export const calculateSavings = (subtotal, shippingCost) => {
  const shippingSavings = subtotal >= 80000 ? 20000 : 0

  /**
   * Asumimos que no hay otros ahorros adicionales
   * Si hay otros ahorros, se pueden agregar aquí
  */
  const additionalSavings = 0

  return shippingSavings + additionalSavings
}

/**
 * Funcion para formatear un precio a la moneda local
  * usando el formato de moneda colombiano (COP)
  *
 * @param {*} price - El precio a formatear
 * @returns {string} - El precio formateado como cadena
  * con el símbolo de moneda y separadores de miles
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

/**
 * Función para calcular si un pedido califica para envío gratis
  * según el precio del pedido
  *
  * @description
  * Esta función verifica si el precio del pedido es igual o superior a 80000 COP,
  * lo que califica para envío gratis.
  *
 * @param {*} price
 * @returns {boolean} - True si califica para envío gratis, false en caso contrario
 */
export const calculateFreeShipping = (price) => {
  return price >= 80000
}
