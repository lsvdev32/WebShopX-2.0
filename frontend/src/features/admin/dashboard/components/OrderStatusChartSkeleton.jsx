/**
 * Sekeleton de carga para la grfica de estado de pedidos
 * Utiliza CardWrapper para el contenedor y estilos de carga.
 */

import CardWrapper from '@/components/common/CardWrapper'

export default function OrderStatusChartSkeleton () {
  return (
    <CardWrapper className='p-6 animate-pulse'>
      <div className='h-6 w-1/3 bg-gray-200 rounded mb-6' />
      <div className='h-96 bg-gray-200 rounded' />
    </CardWrapper>
  )
}
