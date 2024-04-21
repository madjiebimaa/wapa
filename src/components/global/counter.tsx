"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps extends React.ComponentPropsWithoutRef<typeof motion.p> {
  from: number;
  to: number;
}

export default function Counter({ from, to, ...props }: CounterProps) {
  const ref = useRef<React.ComponentRef<typeof motion.p>>(null);

  useEffect(() => {
    const counter = ref.current;
    if (!counter) return;

    const controls = animate(from, to, {
      ease: "easeInOut",
      duration: 0.7,
      onUpdate: (value) => {
        counter.textContent = String(value.toFixed(0));
      },
    });

    return () => {
      controls.stop();
    };
  }, [from, to]);

  return <motion.p ref={ref} {...props} />;
}
