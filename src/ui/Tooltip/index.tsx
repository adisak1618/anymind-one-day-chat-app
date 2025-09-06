import { cn } from '@/lib/cn'
import { forwardRef, type ReactNode, useState, useRef, useEffect } from 'react'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

type TooltipProps = {
  content: ReactNode
  position?: TooltipPosition
  delay?: number
  disabled?: boolean
  children: ReactNode
  className?: string
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, position = 'top', delay = 200, disabled = false, children, className, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<number | null>(null)

    const handleMouseEnter = () => {
      if (disabled || !content) return
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true)
      }, delay)
    }

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setIsVisible(false)
    }

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2', 
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    }

    const arrowClasses = {
      top: 'top-full left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gray-900',
      left: 'left-full top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900',
      right: 'right-full top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900'
    }

    return (
      <div 
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        
        {isVisible && content && (
          <div
            role="tooltip"
            className={cn(
              'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap',
              'animate-in fade-in-0 zoom-in-95 duration-200',
              positionClasses[position]
            )}
          >
            {content}
            {/* Arrow */}
            <div 
              className={cn('absolute w-0 h-0', arrowClasses[position])}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export default Tooltip
