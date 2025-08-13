/**
 * columnas mostradas en el footer
 * recibe e parametros el title que es lo que se muetra como opcion en el footer
 * y links que son los enlaces a donde redirige el title
 * @component
 * @param {string} title - el titulo de la columna
 * @param {Array} links - los enlaces que se muestran en la columna
*/

import { Link } from 'react-router'

export function FooterColumn ({ title, links }) {
  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-medium text-white'>{title}</h2>
      <ul className='space-y-2'>
        {links.map((link) => (
          <li key={link.text}>
            <Link to={link.href} className='text-gray-400 hover:text-white transition-colors text-sm'>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
