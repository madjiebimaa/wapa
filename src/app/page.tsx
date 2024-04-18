"use client";

import { Suspense } from "react";

import ColorFilters from "@/components/color/color-filters";
import ColorPaletteList from "@/components/color/color-palette-list";
import Delay from "@/components/global/delay";
import ColorFilterSkeleton from "@/components/skeleton/color-filter-skeleton";
import ColorPaletteListSkeleton from "@/components/skeleton/color-palette-list-skeleton";

import { cn, getOppositeContrast } from "@/lib/utils";
import { useSelectedBackgroundColor } from "@/store/color";

export default function Home() {
  const selectedBackgroundColor = useSelectedBackgroundColor();

  return (
    <main
      style={{
        backgroundColor: selectedBackgroundColor,
      }}
      className={cn(
        "flex h-screen flex-col transition-colors duration-500 md:flex-row",
        getOppositeContrast(selectedBackgroundColor),
      )}
    >
      <Suspense fallback={<ColorFilterSkeleton />}>
        <ColorFilters />
      </Suspense>
      <Delay duration={500} fallback={<ColorPaletteListSkeleton />}>
        <ColorPaletteList />
      </Delay>
    </main>
  );
}
