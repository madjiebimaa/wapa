import ColorPaletteSkeleton from "@/components/skeleton/color-palette-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ColorPaletteListSkeleton() {
  return (
    <ScrollArea className="flex-1">
      <div className="grid grid-cols-2 justify-items-center gap-4 p-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-10">
        {Array.from({ length: 70 }, (_, index) => index + 1).map((id) => (
          <ColorPaletteSkeleton key={id} />
        ))}
      </div>
    </ScrollArea>
  );
}
