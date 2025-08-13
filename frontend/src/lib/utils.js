import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Funcion para combinar clases de Tailwind CSS y clsx
 * @param  {...any} inputs - Clases a combinar
 * @returns {string} - Clases combinadas
 */
export function cn (...inputs) {
  return twMerge(clsx(inputs))
}
