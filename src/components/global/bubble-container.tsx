import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const BubbleContainer = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-fit items-center justify-center rounded-full bg-secondary p-1 shadow-md",
        className,
      )}
      {...props}
    />
  );
});
BubbleContainer.displayName = "BubbleContainer";

export default BubbleContainer;
