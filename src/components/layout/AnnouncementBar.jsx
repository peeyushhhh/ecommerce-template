import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiArrowRight } from 'react-icons/fi'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='relative z-50 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 overflow-hidden'
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            className='absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12'
          />

          <div className='relative flex items-center justify-center gap-3 px-4 py-2.5'>
            <div className='flex items-center gap-2 text-white text-sm font-medium'>
              <span className='hidden sm:inline bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
                NEW
              </span>
              <span>Free shipping on all orders over $50 — Limited time offer</span>
              <button className='flex items-center gap-1 text-white/90 hover:text-white font-semibold underline underline-offset-2 transition-colors'>
                Shop Now
                <FiArrowRight size={14} />
              </button>
            </div>

            <button
              onClick={() => setVisible(false)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1'
            >
              <FiX size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}