/**
 * Gráfica de ventas por categoría
 * Utiliza CardWrapper para el contenedor y Recharts para la visualización.
 */

import CardWrapper from '@/components/common/CardWrapper'
import { MessageBox } from '@/components/common/MessageBox'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B']

export default function SalesByCategoryChart ({ data }) {
  /**
   * Formateamos los datos para la gráfica
   * Cada objeto debe tener una propiedad 'date' y las categorías como propiedades dinámicas.
   */
  const formattedData = data.map((item) => ({
    date: item._id,
    ...item.categories.reduce((acc, cat) => ({ ...acc, [cat.category]: cat.sales }), {})
  }))

  /**
   * Obtenemos las categorías únicas de los datos
   * Esto nos permite crear una serie para cada categoría en la gráfica.
   */
  const categories = [...new Set(data.flatMap((item) => item.categories.map((cat) => cat.category)))]

  return (
    <CardWrapper className='p-6'>
      <h2 className='text-2xl font-light mb-6'>Ventas por categoría</h2>
      {data.length === 0
        ? (
          <MessageBox variant='warning'>No hay datos de ventas por categoría</MessageBox>
          )
        : (
          <ResponsiveContainer width='100%' height={400}>
            <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' aria-label='Fechas de ventas' />
              <YAxis aria-label='Monto de ventas' />
              <Tooltip />
              <Legend />
              {categories.map((category, index) => (
                <Area
                  key={category}
                  type='monotone'
                  dataKey={category}
                  stackId='1'
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
          )}
    </CardWrapper>
  )
}
