import { streamUpload } from '../services/upload.service.js'

/**
 * CONTROLADOR DE UPLOADS/SUBIDA DE ARCHIVOS
 * Este archivo maneja la subida de imágenes para productos del sistema.
 * Utiliza servicios de almacenamiento en la nube (como Cloudinary) para gestionar archivos.
 *
 * Flujo típico:
 * 1. Middleware (multer) procesa el archivo y lo coloca en req.file
 * 2. Servicio sube el archivo a la nube y retorna URL pública
 * 3. URL se guarda en base de datos asociada al producto
 */

/**
 * Sube una imagen al servicio de almacenamiento en la nube.
 * Endpoint: POST /upload/image
 * Content-Type: multipart/form-data
 * Requiere autenticación: solo usuarios autenticados pueden subir archivos
 * @param {Object} req - Objeto de petición con req.file agregado por multer middleware
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} URL pública del archivo subido y metadatos, o mensaje de error
 */
export const uploadImage = async (req, res) => {
  try {
    // req.file contiene los datos del archivo procesado por el middleware multer
    // streamUpload maneja la subida a servicios como Cloudinary
    const result = await streamUpload(req.file)

    // result contiene: url, public_id, width, height, format, etc.
    res.send(result)
  } catch (error) {
    // Errores comunes: archivo inválido, muy grande, error de conexión con servicio
    res.status(500).send({
      message: 'Ocurrió un error al subir la imagen del producto', // <- Corregido typos
      error
    })
  }
}
