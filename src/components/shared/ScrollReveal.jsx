import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp } from '../../utils/animations'

export function ScrollReveal({ children, variant = fadeUp, delay = 0, className }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}