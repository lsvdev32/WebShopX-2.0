/**
 * generateLinkFromName convierte un nombre en un enlace amigable
 * @param {*} name - Nombre a convertir
 * @returns {string} - Enlace amigable
 *
 * Lo utilizamos en la pagina de productos para generar un enlace amigable
 * basado en el nombre del producto, eliminando caracteres especiales y espacios
 */
export const generateLinkFromName = (name) => {
  return name.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
}
