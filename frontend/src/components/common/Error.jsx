/**
 * La función comprueba si el error tiene una respuesta con un mensaje específico y, si no, devuelve un mensaje de error genérico
 * Lo usamos para manejar errores en las solicitudes HTTP
 */
export default function getError (error) {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}
