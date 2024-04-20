"use client";

import { Palette } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import ColorFilters from "@/components/color/color-filters";
import ColorPaletteList from "@/components/color/color-palette-list";
import { bubbleButtonStyle } from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import Delay from "@/components/global/delay";
import ColorFilterSkeleton from "@/components/skeleton/color-filter-skeleton";
import ColorPaletteListSkeleton from "@/components/skeleton/color-palette-list-skeleton";
import { buttonVariants } from "@/components/ui/button";

import { cn, getOppositeContrast } from "@/lib/utils";
import { useSelectedBackgroundColor } from "@/store/color";

export default function HomePage() {
  const selectedBackgroundColor = useSelectedBackgroundColor();

  return (
    <main
      style={{
        backgroundColor: selectedBackgroundColor,
      }}
      className={cn(
        "flex h-dvh flex-col transition-colors duration-500 md:flex-row",
        getOppositeContrast(selectedBackgroundColor),
      )}
    >
      <div className="flex flex-col gap-2 p-4">
        <Suspense fallback={<ColorFilterSkeleton />}>
          <ColorFilters />
        </Suspense>
        <BubbleContainer>
          <Link
            href="/hexs"
            className={cn(
              buttonVariants({
                variant: bubbleButtonStyle.variant,
                size: bubbleButtonStyle.size,
              }),
              bubbleButtonStyle.className,
            )}
          >
            <Palette className="size-4 shrink-0" />
          </Link>
        </BubbleContainer>
      </div>
      <Delay duration={500} fallback={<ColorPaletteListSkeleton />}>
        <ColorPaletteList />
      </Delay>
    </main>
  );
}
