import { forwardRef, type HTMLAttributes } from 'react'
import { clsx } from 'clsx'

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  lines?: number
  height?: 'sm' | 'md' | 'lg' | 'xl'
  width?: 'full' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'text' | 'circular' | 'rectangular'
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, lines = 1, height = 'md', width = 'full', variant = 'rectangular', ...props }, ref) => {
    const heightClasses = {
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-5',
      xl: 'h-6'
    }

    const widthClasses = {
      full: 'w-full',
      sm: 'w-16',
      md: 'w-32',
      lg: 'w-48',
      xl: 'w-64'
    }

    const variantClasses = {
      text: 'rounded',
      circular: 'rounded-full aspect-square',
      rectangular: 'rounded-md'
    }

    const baseClasses = clsx(
      'bg-gray-200 animate-pulse',
      variantClasses[variant],
      variant !== 'circular' && heightClasses[height],
      variant === 'circular' ? heightClasses[height] : widthClasses[width]
    )

    const finalClasses = clsx(baseClasses, className)

    if (lines === 1) {
      return <div ref={ref} className={finalClasses} {...props} />
    }

    return (
      <div ref={ref} className={clsx('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={clsx(
              baseClasses,
              index === lines - 1 && 'w-3/4'
            )}
          />
        ))}
      </div>
    )
  }
)

Skeleton.displayName = 'Skeleton'

export default Skeleton
