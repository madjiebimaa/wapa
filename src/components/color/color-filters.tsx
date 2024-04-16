"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useQuery } from "@/hooks/use-query";
import { useColorActions } from "@/store/color";

export default function ColorFilters() {
  const { query, setQuery } = useQuery();
  const colorActions = useColorActions();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    colorActions.filterColors(value);
  };

  return (
    <section className="flex flex-col p-4">
      <div className="relative h-fit rounded-full bg-secondary p-1">
        <Search className="absolute left-4 top-4 size-4 shrink-0 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search color name or color code"
          className="rounded-full border-none pl-8"
          defaultValue={query}
          onChange={handleQueryChange}
        />
      </div>
    </section>
  );
}
