/**
 * ===================================
 * USER ROUTES (user.routes.js)
 * ===================================
 * Maneja todas las rutas relacionadas con usuarios
 */

import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import * as userController from '../controllers/user.controller.js'
import { isAdmin, isAuth } from '../middleware/auth.js'

const userRoutes = express.Router()

// === RUTAS PÚBLICAS ===
// Acceso sin autenticación

userRoutes.post('/signin', expressAsyncHandler(userController.signin)) // POST /api/users/signin - Iniciar sesión con email/password
userRoutes.post('/signup', expressAsyncHandler(userController.signup)) // POST /api/users/signup - Registrar nuevo usuario
userRoutes.post('/check-email', expressAsyncHandler(userController.checkEmail)) // POST /api/users/check-email - Verificar si email ya existe
userRoutes.post('/google-signin', expressAsyncHandler(userController.googleSignin)) // POST /api/users/google-signin - Iniciar sesión con Google OAuth
userRoutes.post('/forgot-password', expressAsyncHandler(userController.forgotPassword)) // POST /api/users/forgot-password - Solicitar restablecimiento de contraseña
userRoutes.post('/reset-password/:token', expressAsyncHandler(userController.resetPassword)) // POST /api/users/reset-password/abc123 - Restablecer contraseña con token

// === RUTAS PROTEGIDAS ===
// Requieren autenticación (isAuth)

userRoutes.get('/profile', isAuth, expressAsyncHandler(userController.userProfile)) // GET /api/users/profile - Ver perfil del usuario autenticado
userRoutes.put('/updateProfile/:id', isAuth, expressAsyncHandler(userController.updateUserProfile)) // PUT /api/users/updateProfile/123 - Actualizar perfil propio

// === RUTAS DE ADMINISTRADOR ===
// Gestión de usuarios - solo administradores

userRoutes.get('/admin/', isAuth, isAdmin, expressAsyncHandler(userController.getAllUsers)) // GET /api/users/admin/ - Lista todos los usuarios
userRoutes.get('/admin/:id', isAuth, isAdmin, expressAsyncHandler(userController.getUserById)) // GET /api/users/admin/123 - Obtiene usuario específico por ID
userRoutes.put('/admin/:id', isAuth, isAdmin, expressAsyncHandler(userController.updateUser)) // PUT /api/users/admin/123 - Actualiza cualquier usuario (admin)
userRoutes.delete('/admin/:id', isAuth, isAdmin, expressAsyncHandler(userController.deleteUser)) // DELETE /api/users/admin/123 - Elimina un usuario

export default userRoutes
