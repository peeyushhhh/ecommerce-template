import { cn } from '../../utils/cn'

export function SectionWrapper({ children, className, dark = false, id }) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-20 md:py-32 overflow-hidden',
        dark ? 'bg-neutral-950 text-white' : 'bg-neutral-900 text-white',
        className
      )}
    >
      {children}
    </section>
  )
}