/**
 * Componente para mostrar mensajes de error o información
 * Utiliza el componente Alert de Radix UI para mostrar mensajes estilizados
 */

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export function MessageBox (props) {
  return (
    <Alert variant={props.variant || 'info'} className='border-red-500'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle className='text-red-500'>Error</AlertTitle>
      <AlertDescription>
        {props.children}
      </AlertDescription>
    </Alert>
  )
}
