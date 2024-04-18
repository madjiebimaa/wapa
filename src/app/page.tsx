"use client";

import { Suspense } from "react";

import ColorFilters from "@/components/color/color-filters";
import ColorPaletteList from "@/components/color/color-palette-list";
import ColorFilterSkeleton from "@/components/skeleton/color-filter-skeleton";

import { useSelectedBackgroundColor } from "@/store/color";

export default function Home() {
  const selectedBackgroundColor = useSelectedBackgroundColor();

  return (
    <main
      style={{ backgroundColor: selectedBackgroundColor }}
      className="flex h-screen flex-col md:flex-row"
    >
      <Suspense fallback={<ColorFilterSkeleton />}>
        <ColorFilters />
      </Suspense>
      <ColorPaletteList />
    </main>
  );
}
