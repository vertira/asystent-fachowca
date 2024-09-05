import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border text-myText bg-cardBackground/0 borderColor px-3 py-3  text-base ring-offset-cardBackground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-myText-muted placeholder:py-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-first  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
