import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'

export function GlassCard({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md',
        'shadow-xl shadow-black/20 p-6',
        hover && 'hover:border-indigo-500/30 hover:shadow-indigo-500/10 hover:shadow-2xl',
        'transition-shadow duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}