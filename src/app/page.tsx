"use client";

import { Image, LucideIcon, Palette } from "lucide-react";
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

  const links: { id: string; Icon: LucideIcon }[] = [
    { id: "hexs", Icon: Palette },
    { id: "images", Icon: Image },
  ];

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
        <section className="flex items-center gap-2">
          {links.map(({ id, Icon }) => (
            <BubbleContainer key={id}>
              <Link
                href={`/${id}`}
                className={cn(
                  buttonVariants({
                    variant: bubbleButtonStyle.variant,
                    size: bubbleButtonStyle.size,
                  }),
                  bubbleButtonStyle.className,
                )}
              >
                <Icon className="size-4 shrink-0" />
              </Link>
            </BubbleContainer>
          ))}
        </section>
      </div>
      <Delay duration={500} fallback={<ColorPaletteListSkeleton />}>
        <ColorPaletteList />
      </Delay>
    </main>
  );
}
