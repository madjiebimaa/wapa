"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import useProgress from "@/hooks/use-progress";

interface CounterProps extends React.ComponentPropsWithoutRef<typeof motion.p> {
  from: number;
  to: number;
}

export default function Counter({ from, to, ...props }: CounterProps) {
  const ref = useRef<React.ComponentRef<typeof motion.p> | null>(null);

  useProgress(ref, from, to, {
    onUpdate: (latest) => {
      const counter = ref.current;

      if (counter) {
        counter.textContent = String(latest.toFixed(0));
      }
    },
  });

  return <motion.p ref={ref} {...props} />;
}
