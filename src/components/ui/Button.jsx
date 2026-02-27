import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/30',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm',
  outline: 'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white',
  ghost: 'text-indigo-400 hover:bg-indigo-500/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

export function Button({ children, variant = 'primary', size = 'md', className, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'font-semibold transition-all duration-200 cursor-pointer inline-flex items-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}