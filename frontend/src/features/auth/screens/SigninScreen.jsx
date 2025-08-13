/**
 * Pnatalla de inicio de sesión
 */

import AnimatedSection from '@/components/common/AnimatedSection'
import { AuthLayout } from '@/components/common/AuthLayout'
import { Store } from '@/context/Store'
import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import SigninForm from '../components/SigninForm'

export default function SigninScreen () {
  const { state } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate()
  const search = useLocation()
  const redirectUrl = new URLSearchParams(search.search).get('redirect')
  const redirect = redirectUrl || '/'

  /**
   * Redirige al usuario si ya está autenticado
   * y está intentando acceder a la pantalla de inicio de sesión.
   */
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  return (
    <AnimatedSection>
      <AuthLayout mode='signin'>
        <div className='w-full max-w-sm mx-auto'>
          <h1 className='text-2xl font-bold text-center mb-8'>Iniciar sesión</h1>
          <SigninForm redirect={redirect} />
        </div>
      </AuthLayout>
    </AnimatedSection>
  )
}
