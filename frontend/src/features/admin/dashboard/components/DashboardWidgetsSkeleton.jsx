/**
 * Skelton de carga para los widgets del dashboard de administración.
 * Muestra un diseño de carga animado mientras los datos se están recuperando.
 */

import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function DashboardWidgetsSkeleton () {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {[...Array(4)].map((_, index) => (
        <Card key={index} className='animate-pulse'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div className='h-6 w-1/3 bg-gray-200 rounded' />
            <div className='h-10 w-10 bg-gray-200 rounded-full' />
          </CardHeader>
          <CardContent>
            <div className='h-8 w-1/2 bg-gray-200 rounded mb-4' />
            <div className='h-4 w-2/3 bg-gray-200 rounded' />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
