import AnimatedSection from '@/components/common/AnimatedSection'
import { MessageBox } from '@/components/common/MessageBox'
import { Helmet } from 'react-helmet-async'
import CategoriesChart from '../components/CategoriesChart'
import CategoriesChartSkeleton from '../components/CategoriesChartSkeleton'
import DashboardWidgets from '../components/DashboardWidgets'
import DashboardWidgetsSkeleton from '../components/DashboardWidgetsSkeleton'
import OrderStatusChart from '../components/OrderStatusChart'
import OrderStatusChartSkeleton from '../components/OrderStatusChartSkeleton'
import SalesByCategoryChart from '../components/SalesByCategoryChart'
import SalesByCategoryChartSkeleton from '../components/SalesByCategoryChartSkeleton'
import SalesChart from '../components/SalesChart'
import SalesChartSkeleton from '../components/SalesChartSkeleton'
import TopProductsChart from '../components/TopProductsChart'
import TopProductsChartSkeleton from '../components/TopProductsChartSkeleton'
import UsersChart from '../components/UsersChart'
import UsersChartSkeleton from '../components/UsersChartSkeleton'
import useDashboardData from '../hooks/useDashboardData'

export default function DashboardScreen () {
  /**
   * Con este hook se obtiene toda la información necesaria para el panel de administración.
   * Incluye datos de ventas, usuarios, categorías de productos, estado de pedidos y productos más vendidos.
   */
  const { loading, error, summary, usersByDay, orderStatus, salesByCategory, topProducts } = useDashboardData()

  return (
    <div>
      <Helmet>
        <title>Panel de administración | WebShopX</title>
      </Helmet>
      <AnimatedSection>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-light'>Panel de información de la empresa</h1>
          <p className='text-gray-600 mt-2'>
            En este apartado se muestra toda la información relevante de la compañía
          </p>
        </div>
      </AnimatedSection>
      {/* Mostramos los skeletons de carga mientras se carga toda la información que queremos mostrar */}
      {loading
        ? (
          <div className='space-y-6'>
            <DashboardWidgetsSkeleton />
            <SalesChartSkeleton />
            <CategoriesChartSkeleton />
            <UsersChartSkeleton />
            <OrderStatusChartSkeleton />
            <SalesByCategoryChartSkeleton />
            <TopProductsChartSkeleton />
          </div>
          )
        : error
          ? (
            <MessageBox variant='danger'>{error}</MessageBox> // Si hay un error, lo mostramos en un MessageBox
            )
          : (
            // Si no hay error y la información se ha cargado correctamente, mostramos los componentes con los datos
            <div className='space-y-6'>
              <AnimatedSection>
                <DashboardWidgets summary={summary} />
              </AnimatedSection>
              <AnimatedSection>
                <SalesChart data={summary.dailyOrders || []} />
              </AnimatedSection>
              <AnimatedSection>
                <CategoriesChart data={summary.productCategories || []} />
              </AnimatedSection>
              <AnimatedSection>
                <UsersChart data={usersByDay} />
              </AnimatedSection>
              <AnimatedSection>
                <OrderStatusChart data={orderStatus} />
              </AnimatedSection>
              <AnimatedSection>
                <SalesByCategoryChart data={salesByCategory} />
              </AnimatedSection>
              <AnimatedSection>
                <TopProductsChart data={topProducts} />
              </AnimatedSection>
            </div>
            )}
    </div>
  )
}
