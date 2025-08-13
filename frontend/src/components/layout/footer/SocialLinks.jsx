/**
 * Seccion de enlaces de redes sociales mostrados en el footer
 * @section sección de enlaces de redes sociales
 * @component
 */

import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router'

export default function SocialLinks () {
  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com',
      label: 'Instagram'
    },
    {
      icon: Facebook,
      href: 'https://facebook.com',
      label: 'Facebook'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn'
    }
  ]
  return (
    <div className='flex items-center space-x-4'>
      {socialLinks.map((social) => (
        <Link
          key={social.label}
          to={social.href}
          className='text-gray-400 hover:text-white transition-colors'
          aria-label={social.label}
        >
          <social.icon className='w-6 h-6' />
        </Link>
      ))}
    </div>
  )
}
