import { Skeleton } from "@/components/ui/skeleton";

export default function ColorPaletteSkeleton() {
  return (
    <div className="flex min-w-[130px] max-w-[130px] flex-col items-center justify-center gap-2">
      <Skeleton className="size-20 rounded-full shadow-md" />
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="invisible h-12 w-full rounded-full shadow-md" />
    </div>
  );
}
