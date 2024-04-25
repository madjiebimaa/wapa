"use client";

import { ValueAnimationTransition, animate } from "framer-motion";
import { useEffect } from "react";

export default function useProgress<T>(
  initialValue: T,
  value: T,
  options?: ValueAnimationTransition<T>,
) {
  useEffect(() => {
    const controls = animate(initialValue, value, {
      ease: "easeInOut",
      duration: 0.7,
      ...options,
    });

    return () => {
      controls.stop();
    };
  }, [initialValue, value, options]);
}
