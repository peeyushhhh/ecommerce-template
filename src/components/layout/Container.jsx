import { cn } from '../../utils/cn'

export function Container({ children, className, narrow = false }) {
  return (
    <div className={cn(
      'mx-auto w-full px-4 sm:px-6 lg:px-8',
      narrow ? 'max-w-3xl' : 'max-w-7xl',
      className
    )}>
      {children}
    </div>
  )
}