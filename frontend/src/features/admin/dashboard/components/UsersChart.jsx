/**
 * Grafica de usuarios nuevos por día
 * @param {Object[]} data - Datos de usuarios con fecha y cantidad
 */

import CardWrapper from '@/components/common/CardWrapper'
import { MessageBox } from '@/components/common/MessageBox'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

export default function UsersChart ({ data }) {
  return (
    <CardWrapper className='p-6'>
      <h2 className='text-2xl font-light mb-6'>Nuevos usuarios por día</h2>
      {data.length === 0
        ? (
          <MessageBox variant='warning'>No hay datos de usuarios</MessageBox>
          )
        : (
          <ResponsiveContainer width='100%' height={400}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='_id' aria-label='Fechas de registro' />
              <YAxis aria-label='Cantidad de usuarios' />
              <Tooltip />
              <Line type='monotone' dataKey='count' stroke='#10B981' />
            </LineChart>
          </ResponsiveContainer>
          )}
    </CardWrapper>
  )
}
