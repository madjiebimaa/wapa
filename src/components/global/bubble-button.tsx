"use client";

import { forwardRef } from "react";

import { Button, ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface BubbleButtonProps extends ButtonProps {}

export const bubbleButtonStyle: Pick<
  BubbleButtonProps,
  "variant" | "size" | "className"
> = {
  variant: "secondary",
  size: "icon",
  className:
    "shrink-0 rounded-full bg-white hover:bg-gray-200 focus-visible:ring-offset-0",
};

const BubbleButton = forwardRef<HTMLButtonElement, BubbleButtonProps>(
  (
    {
      className,
      variant = bubbleButtonStyle.variant,
      size = bubbleButtonStyle.size,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(bubbleButtonStyle.className, className)}
        {...props}
      />
    );
  },
);
BubbleButton.displayName = "BubbleButton";

export default BubbleButton;
