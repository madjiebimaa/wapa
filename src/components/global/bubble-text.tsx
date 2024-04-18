import { cn } from "@/lib/utils";

interface BubbleTextProps extends React.ComponentPropsWithoutRef<"div"> {}

export default function BubbleText({ className, ...props }: BubbleTextProps) {
  return (
    <div
      className={cn(
        "flex h-10 shrink-0 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary-foreground",
        className,
      )}
      {...props}
    />
  );
}
