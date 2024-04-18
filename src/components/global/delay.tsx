"use client";

import React, { useEffect, useState } from "react";

interface DelayProps {
  duration: number;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export default function Delay({ duration, fallback, children }: DelayProps) {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDisplayed(true);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration]);

  if (!isDisplayed) {
    return fallback ?? null;
  } else {
    return children;
  }
}
