"use client";

import { ValueAnimationTransition, animate } from "framer-motion";
import React, { useEffect } from "react";

export default function useProgress<T, U>(
  ref: React.RefObject<T>,
  initialValue: U,
  value: U,
  options: ValueAnimationTransition<U> | undefined = {
    ease: "easeInOut",
    duration: 0.7,
  },
) {
  useEffect(() => {
    const progress = ref.current;

    if (progress) {
      const controls = animate(initialValue, value, {
        ease: "easeInOut",
        duration: 0.7,
        ...options,
      });

      return () => {
        controls.stop();
      };
    }
  }, [initialValue, ref, value, options]);

  return ref;
}
