"use client";

import {
  ArrowDown01,
  ArrowDownAZ,
  ArrowUp10,
  ArrowUpZA,
  Heart,
  LucideIcon,
  Search,
} from "lucide-react";
import { useEffect } from "react";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import { Input } from "@/components/ui/input";

import { useQuery } from "@/hooks/use-query";
import { DEFAULT_COLOR_SORTING_OPTION } from "@/lib/constants";
import { ColorSortingOption } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useColorActions, useLovedColors } from "@/store/color";

const sortingOptions: {
  id: ColorSortingOption;
  Icon: LucideIcon;
}[] = [
  { id: "descending-name", Icon: ArrowDownAZ },
  { id: "ascending-name", Icon: ArrowUpZA },
  { id: "descending-code", Icon: ArrowDown01 },
  { id: "ascending-code", Icon: ArrowUp10 },
];

export default function ColorFilters() {
  const [query, setQuery] = useQuery<string>("query", "");
  const [love, setLove] = useQuery<boolean>("love", false);
  const [sort, setSort] = useQuery<ColorSortingOption>(
    "sort",
    DEFAULT_COLOR_SORTING_OPTION,
  );
  const lovedColors = useLovedColors();
  const colorActions = useColorActions();

  useEffect(() => {
    colorActions.filterColors({ query, love, sort });
  }, [query, love, sort, lovedColors, colorActions]);

  return (
    <section className="flex flex-col gap-2">
      <BubbleContainer className="relative">
        <Search className="absolute left-4 top-4 size-4 shrink-0 text-muted-foreground" />
        <Input
          name="search-color"
          type="text"
          placeholder="Search color name or color code"
          className="min-w-[280px] rounded-full border-none pl-8 text-secondary-foreground focus-visible:ring-offset-0"
          defaultValue={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </BubbleContainer>
      <div className="flex items-center gap-2 md:justify-between">
        <BubbleContainer>
          <BubbleButton onClick={() => setLove(!love)}>
            <Heart className={cn("size-4 shrink-0", love && "fill-red-400")} />
          </BubbleButton>
        </BubbleContainer>
        <BubbleContainer className="gap-1">
          {sortingOptions.map(({ id, Icon }) => {
            const isSelectedSortOption = sort === id;

            return (
              <BubbleButton
                key={id}
                className={cn(
                  isSelectedSortOption && "bg-foreground hover:bg-gray-500",
                )}
                onClick={() =>
                  setSort(sort === id ? DEFAULT_COLOR_SORTING_OPTION : id)
                }
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    isSelectedSortOption && "text-background",
                  )}
                />
              </BubbleButton>
            );
          })}
        </BubbleContainer>
      </div>
    </section>
  );
}
