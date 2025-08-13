import AnimatedSection from '@/components/common/AnimatedSection'
import DataTable from '@/components/common/DataTable'
import { MessageBox } from '@/components/common/MessageBox'
import { Helmet } from 'react-helmet-async'
import OrdersSkeleton from '../components/OrdersSkeleton'
import { getOrderTableColumns } from '../components/OrderTableColumns'
import useOrders from '../hooks/useOrders'

export default function OrdersScreen () {
  const {
    orders,
    loading,
    error,
    loadingUpdate,
    loadingDelete,
    handleViewDetails,
    handleMarkAsDelivered,
    handleDeleteOrder
  } = useOrders()

  /**
   * Generamos las columnas de la tabla de órdenes.
   * Estas columnas incluyen acciones para ver detalles, marcar como entregado y eliminar órdenes.
   */
  const columns = getOrderTableColumns({ handleViewDetails, handleMarkAsDelivered, handleDeleteOrder })

  return (
    <AnimatedSection>
      <Helmet>
        <title>Administrar Órdenes | WebShopX</title>
      </Helmet>
      <header className='mb-6'>
        <h2 className='text-2xl font-semibold'>Ver órdenes de compras</h2>
        <p className='text-sm text-gray-400'>
          Aquí puedes ver los detalles de todas las órdenes de compra realizadas.
        </p>
      </header>
      {loading || loadingUpdate || loadingDelete
        ? (
          /**
           * Mostramos el esqueleto de carga mientras se obtienen los datos
           */
          <OrdersSkeleton />
          )
        : error
          ? (
            /**
             * Muestra un mensaje de error si ocurre un problema al obtener las órdenes
             */
            <MessageBox variant='danger'>{error}</MessageBox>
            )
          : (
            /**
             * Usamos nuestro componente DataTable para mostrar las órdenes y le pasamos las órdenes y las columnas definidas
            */
            <DataTable data={orders} columns={columns} filterColumn='_id' placeholderInput='ID de orden' />
            )}
    </AnimatedSection>
  )
}
