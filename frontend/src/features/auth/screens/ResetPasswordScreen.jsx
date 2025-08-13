/**
 * Pantalla de restablecimiento de contraseña
 */

import { AuthLayout } from '@/components/common/AuthLayout'
import { Link } from 'react-router'
import ResetPasswordForm from '../components/ResetPasswordForm'
import AnimatedSection from '@/components/common/AnimatedSection'

export default function ResetPasswordScreen () {
  return (
    <AnimatedSection className='flex items-center justify-center'>
      <AuthLayout mode='reset-password'>
        <div className='w-full max-w-sm mx-auto'>
          <h1 className='text-2xl font-bold text-center mb-8'>Escribe tu nueva contraseña</h1>
          <ResetPasswordForm />
          <div className='text-center mt-6'>
            <Link to='/signin' className='text-sm text-gray-600 hover:underline'>
              Iniciar sesión
            </Link>
          </div>
        </div>
      </AuthLayout>
    </AnimatedSection>
  )
}
