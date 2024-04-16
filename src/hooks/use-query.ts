"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = searchParams.get("query") || "";

  const setQuery = (value: string) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set("query", value) : params.delete("query");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { query, setQuery };
};
