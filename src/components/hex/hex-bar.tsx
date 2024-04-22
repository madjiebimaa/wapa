"use client";

import { useRef } from "react";

import { Progress } from "@/components/ui/progress";

import useProgress from "@/hooks/use-progress";

interface HexBarProps {
  value: number;
}

export default function HexBar({ value }: HexBarProps) {
  const ref = useRef<React.ComponentRef<typeof Progress> | null>(null);

  useProgress(ref, 0, value, {
    onUpdate: (latest) => {
      const progress = ref.current;

      if (progress) {
        const indicator = progress.firstElementChild as HTMLElement;
        const value = (latest / 255) * 100;

        indicator.style.transform = `translateX(-${100 - (value || 0)}%)`;
      }
    },
  });

  return <Progress ref={ref} className="h-2 w-full" />;
}
