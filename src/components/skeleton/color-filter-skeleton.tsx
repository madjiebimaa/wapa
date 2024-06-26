import { Skeleton } from "@/components/ui/skeleton";

export default function ColorFilterSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-12 min-w-[280px] rounded-full md:w-full" />
      <div className="flex items-center gap-2 md:justify-between">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="h-12 min-w-[180px] rounded-full" />
      </div>
    </div>
  );
}
