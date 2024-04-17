"use client";

import { Heart, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useQuery } from "@/hooks/use-query";
import { cn } from "@/lib/utils";
import { useColorActions } from "@/store/color";

export default function ColorFilters() {
  const [query, setQuery] = useQuery<string>("query", "");
  const [love, setLove] = useQuery<boolean>("love", false);
  const colorActions = useColorActions();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    colorActions.filterColors({ query: value, love });
  };

  const handleLoveClick = () => {
    const nextLove = !love;
    
    setLove(nextLove);
    colorActions.filterColors({ query, love: nextLove });
  };

  return (
    <section className="flex flex-col gap-2 p-4">
      <div className="relative h-fit rounded-full bg-secondary p-1 shadow-md">
        <Search className="absolute left-4 top-4 size-4 shrink-0 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search color name or color code"
          className="rounded-full border-none pl-8"
          defaultValue={query}
          onChange={handleQueryChange}
        />
      </div>
      <div className="w-fit rounded-full bg-secondary p-1 shadow-md">
        <Button
          variant="secondary"
          size="icon"
          className="shrink-0 rounded-full bg-white hover:bg-gray-200 focus-visible:ring-offset-0"
          onClick={handleLoveClick}
        >
          <Heart className={cn("size-4 shrink-0", love && "fill-red-400")} />
        </Button>
      </div>
    </section>
  );
}
