"use client";

import { forwardRef } from "react";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

interface InputCounterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputCounter = forwardRef<HTMLInputElement, InputCounterProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        className={cn(
          "size-fit rounded-full border-none p-2 text-xs text-secondary-foreground focus-visible:ring-offset-0",
          className,
        )}
        {...props}
      />
    );
  },
);
InputCounter.displayName = "InputCounter";

export default InputCounter;
