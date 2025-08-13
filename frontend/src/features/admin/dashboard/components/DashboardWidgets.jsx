/**
 * Widgets del panel de administración que muestran estadísticas clave.
 * Incluye usuarios, pedidos, ventas y productos registrado en la tienda.
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatPrice } from '@/utils/pricing'
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users
} from 'lucide-react'
import { Link } from 'react-router'

export default function DashboardWidgets ({ summary }) {
  /**
   * Creamos una constante `widgets` que contiene los datos de cada widget.
   * Cada widget incluye un título, una cantidad, un enlace, un icono y un tooltip.
   * Los valores se obtienen del objeto `summary` pasado como prop.
   */
  const widgets = [
    {
      /** Total de usuarios registrados en la tienda */
      title: 'Usuarios',
      amount: summary.users?.[0]?.numUsers || 0,
      linkText: 'Ver lista de usuarios',
      link: '/admin/users',
      icon: <Users className='h-10 w-10 text-blue-600 bg-blue-100 p-2 rounded-full' />,
      tooltip: 'Total de usuarios registrados en la plataforma'
    },
    {
      /** Total de pedidos registrados en la tienda */
      title: 'Pedidos',
      amount: summary.orders?.[0]?.numOrders || 0,
      linkText: 'Ver lista de pedidos',
      link: '/admin/orders',
      icon: <ShoppingCart className='h-10 w-10 text-blue-600 bg-blue-100 p-2 rounded-full' />,
      tooltip: 'Total de pedidos realizados'
    },
    {
      /** Venta total de la tienda */
      title: 'Ventas',
      amount: formatPrice(summary.orders?.[0]?.totalSales || 0),
      linkText: 'Ver detalles',
      link: '/admin/orders',
      icon: <DollarSign className='h-10 w-10 text-blue-600 bg-blue-100 p-2 rounded-full' />,
      tooltip: 'Total de ventas realizadas'
    },
    {
      /** Total de productos registrado en la tienda */
      title: 'Productos',
      amount: summary.products?.[0]?.numProducts || 0,
      linkText: 'Ver lista de productos',
      link: '/admin/products',
      icon: <Package className='h-10 w-10 text-blue-600 bg-blue-100 p-2 rounded-full' />,
      tooltip: 'Total de productos disponibles'
    }
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {/* Mapeamos la información y la mostramos en los Widgets */}
      {widgets.map((widget, index) => (
        <Card key={index} className='hover:shadow-lg transition-shadow'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-lg font-medium'>{widget.title}</CardTitle>
            {widget.icon}
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{widget.amount}</div>
            <Link
              to={widget.link}
              className='text-blue-500 hover:underline text-sm'
              aria-label={`Ir a ${widget.linkText}`}
            >
              {widget.linkText}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
