import { cn } from '../../utils/cn'

export function GradientText({ children, className }) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400',
        'bg-clip-text text-transparent ','isolate',
        'font-black',
        className
      )}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'none',
      }}
    >
      {children}
    </span>
  )
}