/**
 *  Envoltura reutilizable de diseño para las páginas de autenticación (iniciar sesión, registrarse, olvidar contraseña, restablecer contraseña)
 */
export function AuthLayout ({ children, mode }) {
  return (
    <div className=' w-full flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col md:flex-row'>
        {mode === 'signin'
          ? (
            <>
              <div className='w-full md:w-1/2 p-8 lg:p-12'>
                {children}
              </div>
              <div className='w-full md:w-1/2 bg-[#1a2238] text-white p-8 lg:p-12 flex flex-col items-center justify-center text-center'>
                <h2 className='text-3xl font-bold mb-4'>Hola, Bienvenido!</h2>
                <p className='text-gray-300 mb-8'>
                  Si aún no tienes una cuenta, puedes registrarte.
                </p>
                <a href='/signup' className='border-2 border-white text-white px-10 py-2 rounded-sm hover:bg-white hover:text-[#1a2238] transition-colors'>
                  Registrarse
                </a>
              </div>
            </>
            )
          : mode === 'signup'
            ? (
              <>
                <div className='w-full md:w-1/2 bg-[#1a2238] text-white p-8 lg:p-12 flex flex-col items-center justify-center text-center'>
                  <h2 className='text-3xl font-bold mb-4'>Crea tu cuenta!</h2>
                  <p className='text-gray-300 mb-8'>
                    Si ya tienes una cuenta, puedes iniciar sesión.
                  </p>
                  <a href='/signin' className='border-2 border-white text-white px-10 py-2 rounded-sm hover:bg-white hover:text-[#1a2238] transition-colors'>
                    Iniciar sesión
                  </a>
                </div>
                <div className='w-full md:w-1/2 p-8 lg:p-12'>
                  {children}
                </div>
              </>
              )
            : mode === 'forgot-password'
              ? (
                <>
                  <div className='w-full md:w-1/2 bg-[#1a2238] text-white p-8 lg:p-12 flex flex-col items-center justify-center text-center'>
                    <h2 className='text-3xl font-bold mb-4'>Olvidaste tu contraseña?</h2>
                    <p className='text-gray-300 mb-8'>
                      No te preocupes, te enviaremos un correo electrónico para restablecerla.
                    </p>
                  </div>
                  <div className='w-full md:w-1/2 p-8 lg:p-12'>
                    {children}
                  </div>
                </>
                )
              : (
                <>
                  <div className='w-full md:w-1/2 p-8 lg:p-12'>
                    {children}
                  </div>
                  <div className='w-full md:w-1/2 bg-[#1a2238] text-white p-8 lg:p-12 flex flex-col items-center justify-center text-center'>
                    <h2 className='text-3xl font-bold mb-4'>Restablecer contraseña</h2>
                    <p className='text-gray-300 mb-8'>
                      Aqui puedes restablecer tu contraseña.
                    </p>
                  </div>
                </>
                )}
      </div>
    </div>
  )
}
