import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const BubbleContainer = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }) => {
  return (
    <div
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
