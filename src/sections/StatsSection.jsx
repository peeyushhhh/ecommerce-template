import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Container } from '../components/layout/Container'
import { GradientText } from '../components/shared/GradientText'

const stats = [
  { value: 50000, suffix: '+', label: 'Happy Customers', decimals: 0 },
  { value: 4.9, suffix: '★', label: 'Average Rating', decimals: 1 },
  { value: 120000, suffix: '+', label: 'Orders Delivered', decimals: 0 },
  { value: 99, suffix: '%', label: 'Satisfaction Rate', decimals: 0 },
]

export function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className='relative w-full py-20 bg-neutral-950 overflow-hidden'>

      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />

      <Container>
        <div ref={ref} className='grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'>
          {stats.map((stat, i) => (
            <div key={i} className='text-center'>
              <div className='text-4xl md:text-5xl lg:text-6xl font-black mb-2'>
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.decimals}
                    delay={i * 0.2}
                  >
                    {({ countUpRef }) => (
                      <GradientText>
                        <span ref={countUpRef} />
                        {stat.suffix}
                      </GradientText>
                    )}
                  </CountUp>
                ) : (
                  <GradientText>0{stat.suffix}</GradientText>
                )}
              </div>
              <p className='text-neutral-300 text-sm md:text-base font-medium'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>

    </section>
  )
}