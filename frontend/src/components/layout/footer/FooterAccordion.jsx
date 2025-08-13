/**
 * Este es el componente que usamos para recoger los enlaces del footer
 * al momento de hacerlo responsive y mostrarlos en dispositivos mobiles
 * @component que hace parte del footer
 * @param section {object} - objeto que contiene los enlaces y el titulo de cada sección
 * @param section.title {string} - titulo de la sección
  */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Link } from 'react-router'

export default function FooterAccordion ({ sections }) {
  return (
    <Accordion type='single' collapsible className='w-full'>
      {Object.entries(sections).map(([key, section]) => (
        <AccordionItem key={key} value={key} className='border-b border-gray-800'>
          <AccordionTrigger className='text-white hover:text-white hover:no-underline py-4'>
            {section.title}
          </AccordionTrigger>
          <AccordionContent>
            <ul className='space-y-2 pb-4'>
              {section.links.map((link) => (
                <li key={link.text}>
                  <Link to={link.href} className='text-gray-400 hover:text-white transition-colors text-sm block py-1'>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
