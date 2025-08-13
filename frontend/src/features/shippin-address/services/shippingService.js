/* eslint-disable no-undef */
/**
 * Servicio para manejar operaciones relacionadas con la información de envío
 * @module shippingService
 */

/**
 * Guarda la dirección de envío y el método de pago en el contexto y localStorage
 * @param {Object} dispatch - Función dispatch del contexto Store
 * @param {Object} shippingAddress - Dirección de envío
 * @param {string} paymentMethod - Método de pago seleccionado
 */
export const saveShippingInfo = (dispatch, shippingAddress, paymentMethod) => {
  dispatch({
    type: 'SAVE_SHIPPING_ADDRESS',
    payload: shippingAddress
  })
  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))

  dispatch({
    type: 'SAVE_PAYMENT_METHOD',
    payload: paymentMethod
  })
  localStorage.setItem('paymentMethod', paymentMethod)
}
