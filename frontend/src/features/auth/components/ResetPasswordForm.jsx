/**
 * Formulario para restablecer la contraseña del usuario.
 * Utiliza React Hook Form y Zod para la validación.
 */

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useResetPassword } from '../hooks/useResetPassword'
import { ResetPasswordValidation } from '../validations/ResetPasswordValidation'

export default function ResetPasswordForm () {
  /**
   * Hook para manejar el formulario de restablecimiento de contraseña.
   * Utiliza Zod para la validación de los campos del formulario.
   */
  const form = useForm({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  /**
   * Hook personalizado para manejar la lógica de restablecimiento de contraseña.
   * Incluye la función para enviar la nueva contraseña al backend.
   */
  const { resetUserPassword } = useResetPassword()

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(resetUserPassword)} className='space-y-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    icon={Lock}
                    type='password'
                    placeholder='Nueva contraseña'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    icon={Lock}
                    type='password'
                    placeholder='Confirmar nueva contraseña'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full rounded-sm bg-[#1a2238] hover:bg-[#2a3248]'>
            Restablecer contraseña
          </Button>
        </form>
      </Form>
    </div>
  )
}
