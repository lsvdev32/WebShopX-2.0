import AnimatedSection from '@/components/common/AnimatedSection'
import { AuthLayout } from '@/components/common/AuthLayout'
import { Store } from '@/context/Store'
import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import SignupForm from '../components/SignupForm'

/**
 * Componente para el registro de usuarios
 * @returns
 */
export default function SignupScreen () {
  const { state } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate()
  const search = useLocation()
  const redirectUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectUrl || '/'

  /**
   * Redirige al usuario si ya está autenticado
   * y está intentando acceder a la pantalla de registro.
   */
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    <AnimatedSection className='flex items-center justify-center'>
      <AuthLayout mode='signup'>
        <div className='w-full max-w-sm mx-auto'>
          <h1 className='text-2xl font-bold text-center mb-8'>Registrarse</h1>
          <SignupForm redirect={redirect} />
        </div>
      </AuthLayout>
    </AnimatedSection>
  )
}
