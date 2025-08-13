/**
 * Formatea una fecha y hora a un string legible
 * @param {*} date - Fecha a formatear
 * @returns {string} - Fecha formateada en formato 'dd/mm/yyyy - hh:mm AM/PM'
 *
 * Los utilizamos en la vista de detalles de productos y en la vista de pedidos
 * para mostrar la fecha de creación del producto y la fecha de creación del pedido respectivamente
 */
export const formatDateTime = (date) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) + ' - ' + dateObj.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}
