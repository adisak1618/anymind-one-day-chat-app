import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, children, ...props }, ref) => {
    return (
              <select
          className={cn(
            "py-2.5 pl-2.5 pr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
            "focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none",
            "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')]",
            "bg-no-repeat bg-[position:right_12px_center] bg-[length:12px_8px]",
            className
          )}
          ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
