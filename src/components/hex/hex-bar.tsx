"use client";

import { animate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { Progress } from "@/components/ui/progress";

interface HexBarProps {
  value: number;
}

export default function HexBar({ value }: HexBarProps) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<React.ComponentRef<typeof Progress>>(null);

  useEffect(() => {
    const counter = ref.current;
    if (!counter) return;

    const controls = animate(0, value, {
      ease: "easeInOut",
      duration: 0.7,
      onUpdate: (updatedValue) => {
        setProgress(updatedValue);
      },
    });

    return () => {
      controls.stop();
    };
  }, [value]);

  return (
    <Progress ref={ref} value={(progress / 255) * 100} className="h-2 w-full" />
  );
}
