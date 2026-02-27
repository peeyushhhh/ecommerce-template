import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'

export function HoverEffect({ items, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className='relative group block p-2 h-full w-full cursor-pointer'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 h-full w-full bg-neutral-800 block rounded-2xl'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          <div className='rounded-2xl h-full w-full overflow-hidden bg-black border border-white/10 group-hover:border-white/20 relative z-20 transition-colors duration-300'>
            <div className='p-8'>
              {item.icon && (
                <item.icon size={24} className={item.iconColor || 'text-indigo-400'} />
              )}
              {item.emoji && (
                <span className='text-2xl'>{item.emoji}</span>
              )}
              <h4 className='text-white font-bold text-xl mt-6 mb-4 tracking-tight'>
                {item.title}
              </h4>
              <p className='text-neutral-400 leading-relaxed text-sm'>
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}