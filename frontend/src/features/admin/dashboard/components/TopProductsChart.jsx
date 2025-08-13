/**
 * Grafica de productos más vendidos
 */

import CardWrapper from '@/components/common/CardWrapper'
import { MessageBox } from '@/components/common/MessageBox'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function TopProductsChart ({ data }) {
  return (
    <CardWrapper className='p-6'>
      <h2 className='text-2xl font-light mb-6'>Productos más vendidos</h2>
      {data.length === 0
        ? (
          <MessageBox variant='warning'>No hay datos de productos</MessageBox>
          )
        : (
          <ResponsiveContainer width='100%' height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey='sales'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          )}
    </CardWrapper>
  )
}
