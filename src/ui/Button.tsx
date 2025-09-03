import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, icon, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium ' +
      'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ' +
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
    const cls = className ? `${base} ${className}` : base

    return (
      <button ref={ref} className={cls} {...props}>
        <span>{children}</span>
        {icon ? <span className="shrink-0">{icon}</span> : null}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button