import { motion } from 'framer-motion'

const brands = [
  'Nike', 'Apple', 'Samsung', 'Sony', 'Adidas',
  'Puma', 'LG', 'Bose', 'Canon', 'Dell'
]

export function BrandStrip() {
  return (
    <div className='relative w-full py-8 bg-neutral-900 border-y border-white/5 overflow-hidden'>

      {/* Left fade */}
      <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-900 to-transparent z-10' />
      {/* Right fade */}
      <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-900 to-transparent z-10' />

      {/* Scrolling track */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className='flex items-center gap-16 w-max'
      >
        {/* Render twice for seamless loop */}
        {[...brands, ...brands].map((brand, i) => (
          <div key={i} className='flex items-center gap-3 text-neutral-500 hover:text-neutral-300 transition-colors duration-300 cursor-default select-none'>
            <div className='w-2 h-2 rounded-full bg-indigo-500/50' />
            <span className='text-lg font-semibold tracking-wide whitespace-nowrap'>{brand}</span>
          </div>
        ))}
      </motion.div>

    </div>
  )
}