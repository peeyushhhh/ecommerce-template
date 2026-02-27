import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EncryptedText } from '../ui/EncryptedText'

export function LoadingScreen({ onComplete }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Wait 4 seconds then fade out
    const timer = setTimeout(() => {
      setDone(true)
      setTimeout(onComplete, 800)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className='fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden'
        >
          {/* Grid background */}
          <div
            className='absolute inset-0 opacity-10'
            style={{
              backgroundImage: `
                linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Glow */}
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full'
            style={{
              background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className='relative z-10 flex flex-col items-center gap-8'>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='flex items-center gap-3'
            >
              <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30'>
                <span className='text-white font-black text-xl'>S</span>
              </div>
              <span className='text-white font-black text-3xl tracking-tight'>ShopName</span>
            </motion.div>

            {/* Encrypted welcome text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='text-2xl md:text-3xl font-bold text-center'
            >
              <EncryptedText
                text='Welcome to our store'
                encryptedClassName='text-indigo-500/60'
                revealedClassName='text-white'
                revealDelayMs={120}
                flipDelayMs={60}
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className='text-sm text-neutral-500 tracking-widest uppercase'
            >
              <EncryptedText
                text='Premium products for modern living'
                encryptedClassName='text-neutral-700'
                revealedClassName='text-neutral-500'
                revealDelayMs={80}
                flipDelayMs={40}
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}