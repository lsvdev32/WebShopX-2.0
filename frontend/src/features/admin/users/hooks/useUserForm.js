import { Store } from '@/context/Store'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUser } from '../services/userServices'
import { editUserSchema } from '../validations/editUserSchema'

export default function useUserForm ({ user, setOpenModal, onSuccess }) {
  const { state } = useContext(Store)
  const { userInfo } = state
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false) // Estado para controlar si el usuario es administrador

  /**
   * Hook para manejar el formulario de edición de usuario.
   * Utiliza react-hook-form para la gestión del formulario y zod para la validación
   */
  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      isAdmin: Boolean(user?.isAdmin)
    }
  })

  /**
   * Efecto para inicializar el formulario con los datos del usuario.
   * Se ejecuta cuando el usuario cambia o cuando se inicializa el formulario.
   * Actualiza el estado de isAdmin basado en los datos del usuario.
   * También resetea el formulario con los valores del usuario.
   */
  useEffect(() => {
    setIsAdmin(user?.isAdmin || false)
    form.reset({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      isAdmin: Boolean(user?.isAdmin)
    })
  }, [user, form])

  /**
   * Manejador de envío del formulario.
   * Envía los datos del formulario al servidor para actualizar el usuario.
   * @param {*} data - Datos del formulario
   */
  const handleSubmit = async (data) => {
    try {
      const formData = { ...data, isAdmin }
      await updateUser(user._id, formData, userInfo.token)
      toast({
        description: 'Usuario actualizado correctamente.'
      })
      setOpenModal(false)
      if (onSuccess) onSuccess()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message,
        variant: 'destructive'
      })
    }
  }

  return {
    form,
    isAdmin,
    setIsAdmin,
    handleSubmit: form.handleSubmit(handleSubmit)
  }
}
