"use client";

import { useMediaQuery } from "@uidotdev/usehooks";

export default function useDevices() {
  const isSmallDevice = useMediaQuery(
    "only screen and (min-width : 320px) and (max-width : 768px)",
  );

  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 768px) and (max-width : 1024px)",
  );

  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");

  return { isSmallDevice, isMediumDevice, isLargeDevice };
}
