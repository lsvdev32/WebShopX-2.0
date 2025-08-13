// este archivo funciona para crear la orden pero no trae la lista de usuarios

import jwt from 'jsonwebtoken'

// esta función crea un token de acceso para los usuarios
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  )
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({ message: 'No token proporcionado' })
  }

  try {
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : authorization

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Auth error:', error)
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json({ message: 'Token de administrador inválido' })
  }
}
