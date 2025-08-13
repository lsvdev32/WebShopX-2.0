/**
 * Grfica de barras que muestra el estado de los pedidos
 * Utiliza Recharts para renderizar los datos de pedidos por estado.
 */

import CardWrapper from '@/components/common/CardWrapper'
import { MessageBox } from '@/components/common/MessageBox'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

export default function OrderStatusChart ({ data }) {
  return (
    <CardWrapper className='p-6'>
      <h2 className='text-2xl font-light mb-6'>Estado de pedidos</h2>
      {data.length === 0
        ? (
          <MessageBox variant='warning'>No hay datos de pedidos</MessageBox>
          )
        : (
          <ResponsiveContainer width='100%' height={400}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='label' aria-label='Estado de pedidos' />
              <YAxis aria-label='Cantidad de pedidos' />
              <Tooltip />
              <Bar dataKey='count' fill='#F59E0B' />
            </BarChart>
          </ResponsiveContainer>
          )}
    </CardWrapper>
  )
}
