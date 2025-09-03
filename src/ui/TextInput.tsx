import { forwardRef, type TextareaHTMLAttributes } from 'react'

type TextInputProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const TextInput = forwardRef<HTMLTextAreaElement, TextInputProps>(
  ({ className, rows, ...props }, ref) => {
    const base =
      'w-full rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 ' +
      'px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ' +
      'disabled:bg-gray-100 disabled:cursor-not-allowed'
    const resizeRule = rows ? ' resize-none' : ''
    const finalCls = className ? `${base}${resizeRule} ${className}` : `${base}${resizeRule}`

    return (
        <textarea ref={ref} className={finalCls} rows={rows} {...props} />
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput