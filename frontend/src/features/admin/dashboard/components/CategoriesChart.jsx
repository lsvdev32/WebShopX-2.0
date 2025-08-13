/**
 * Gradica de torta que muestra la cantidad de categorías registradas
 * @param {Array} data - Datos de las categorías con sus respectivos conteos
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

/**
 * Colores para las secciones del gráfico de torta
 */
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function CategoriesChart ({ data }) {
  return (
    <CardWrapper className='p-6'>
      <h2 className='text-2xl font-light mb-6'>Categorías registradas</h2>
      {data.length === 0
        ? (
          <MessageBox variant='warning'>No hay categorías</MessageBox>
          )
        : (
          <ResponsiveContainer width='100%' height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey='count'
                nameKey='_id'
                cx='50%'
                cy='50%'
                outerRadius={150}
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
