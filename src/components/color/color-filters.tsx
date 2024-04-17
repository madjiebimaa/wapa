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

import BubbleContainer from "@/components/global/bubble-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useQuery } from "@/hooks/use-query";
import { DEFAULT_COLOR_SORTING_OPTION } from "@/lib/constants";
import { ColorSortingOption } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useColorActions } from "@/store/color";

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
  const colorActions = useColorActions();

  useEffect(() => {
    colorActions.filterColors({ query, love, sort });
  }, [query, love, sort, colorActions]);

  return (
    <section className="flex flex-col gap-2 p-4">
      <BubbleContainer className="relative">
        <Search className="absolute left-4 top-4 size-4 shrink-0 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search color name or color code"
          className="min-w-[280px] rounded-full border-none pl-8"
          defaultValue={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </BubbleContainer>
      <div className="flex items-center justify-between">
        <BubbleContainer>
          <Button
            variant="secondary"
            size="icon"
            className="shrink-0 rounded-full bg-white hover:bg-gray-200 focus-visible:ring-offset-0"
            onClick={() => setLove(!love)}
          >
            <Heart className={cn("size-4 shrink-0", love && "fill-red-400")} />
          </Button>
        </BubbleContainer>
        <BubbleContainer className="gap-1">
          {sortingOptions.map(({ id, Icon }) => {
            const isSelectedSortOption = sort === id;

            return (
              <Button
                key={id}
                variant="secondary"
                size="icon"
                className={cn(
                  "shrink-0 rounded-full bg-white hover:bg-gray-200 focus-visible:ring-offset-0",
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
              </Button>
            );
          })}
        </BubbleContainer>
      </div>
    </section>
  );
}
