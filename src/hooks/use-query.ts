"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQuery = <T>(
  name: string,
  defalutValue: T,
): [T, (value: T) => void] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = searchParams.get(name) || defalutValue;

  const setQuery = (value: T) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(name, String(value)) : params.delete(name);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return [query as T, setQuery];
};
