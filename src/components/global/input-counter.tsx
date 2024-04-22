"use client";

import React, { forwardRef, useRef } from "react";

import { Input } from "@/components/ui/input";

import useProgress from "@/hooks/use-progress";
import { cn, mergeRefs } from "@/lib/utils";

interface InputCounterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue: string | number | readonly string[] | undefined;
}

const InputCounter = forwardRef<HTMLInputElement, InputCounterProps>(
  ({ className, value, defaultValue, ...props }, ref) => {
    const inputRef = useRef<React.ComponentRef<typeof Input> | null>(null);

    useProgress(
      inputRef,
      parseInt(defaultValue as string),
      parseInt(value as string),
      {
        onUpdate: (latest) => {
          const input = inputRef.current;

          if (input) {
            input.value = Math.round(latest).toString();
          }
        },
      },
    );

    return (
      <Input
        ref={mergeRefs(ref, inputRef)}
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
