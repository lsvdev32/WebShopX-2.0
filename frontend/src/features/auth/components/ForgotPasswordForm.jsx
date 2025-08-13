/**
 * Formulario para solicitar un restablecimiento de contraseña.
 * Permite al usuario ingresar su correo electrónico para recibir un enlace de restablecimiento.
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
import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useForgotPassword } from '../hooks/useForgotPassword'
import { ForgotPasswordValidation } from '../validations/ForgotPasswordValidation'

export default function ForgotPasswordForm () {
  /**
   * validación del formulario de restablecimiento de contraseña.
   * Utiliza Zod para definir las reglas de validación del campo de correo electrónico.
   */
  const form = useForm({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: {
      email: ''
    }
  })

  /**
   * Hook para manejar el envío del formulario de restablecimiento de contraseña.
   * Proporciona la función `sendResetEmail` que se encarga de enviar el correo electrónico
   * de restablecimiento de contraseña al usuario.
   */
  const { sendResetEmail } = useForgotPassword()

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendResetEmail)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    icon={Mail}
                    type='email'
                    placeholder='Correo electrónico'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full rounded-sm bg-[#1a2238] hover:bg-[#2a3248]'>
            Enviar correo electrónico
          </Button>
        </form>
      </Form>
    </div>
  )
}
