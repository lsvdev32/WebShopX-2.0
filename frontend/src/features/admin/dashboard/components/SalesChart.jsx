/**
 * Grafica de ventas diarias
 */

import CardWrapper from '@/components/common/CardWrapper'
import { MessageBox } from '@/components/common/MessageBox'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

export default function SalesChart ({ data }) {
  return (
    <CardWrapper className='p-6'>
      <h2 className='text-2xl font-light mb-6'>Ventas diarias</h2>
      {data.length === 0
        ? (
          <MessageBox variant='warning'>Aún no hay ventas</MessageBox>
          )
        : (
          <ResponsiveContainer width='100%' height={400}>
            <AreaChart data={data} margin={{ top: 0, right: 10, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='_id' aria-label='Fechas de ventas' />
              <YAxis aria-label='Monto de ventas' />
              <Tooltip />
              <Area type='monotone' dataKey='sales' stroke='#3B82F6' fill='#BFDBFE' />
            </AreaChart>
          </ResponsiveContainer>
          )}
    </CardWrapper>
  )
}
