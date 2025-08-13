import multer from 'multer'
import express from 'express'
import streamifier from 'streamifier'
import { v2 as cloudinary } from 'cloudinary'
import { isAdmin, isAuth } from '../middleware/auth.js'

const upload = multer()
const uploadRouter = express.Router()

// definimos una ruta con el metodo POST para agregar una nueva imagen
uploadRouter.post('/', isAuth, isAdmin, upload.single('file'), async (req, res) => {
  // configuración de cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  // con esta función subimos el archivo a Cloudinary
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      })
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }
  // con esta función hacemos la solicitud HTTP de streamUpload
  const result = await streamUpload(req)
  res.send(result)
})

export default uploadRouter
