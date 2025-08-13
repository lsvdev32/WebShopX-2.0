/**
 * Pantalla de recuperación de contraseña
 * Esta pantalla permite a los usuarios ingresar su correo electrónico para recibir un enlace de recuperación de contraseña
 */

import AnimatedSection from '@/components/common/AnimatedSection'
import { AuthLayout } from '@/components/common/AuthLayout'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

export default function ForgotPasswordScreen () {
  return (
    <AnimatedSection className='flex items-center justify-center'>
      <AuthLayout mode='forgot-password'>
        <div className='w-full max-w-sm mx-auto'>
          <h1 className='text-2xl font-bold text-center mb-8'>Escribe tu correo electrónico</h1>
          <ForgotPasswordForm />
          <div className='relative mt-6'>
            <Link to='/signin' className='text-sm text-gray-600 hover:underline pl-10 pr-10'>
              <ChevronLeft className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500' />
              Volver
            </Link>
          </div>
        </div>
      </AuthLayout>
    </AnimatedSection>
  )
}
