"use client";

import { useIsClient } from "@uidotdev/usehooks";
import React from "react";

interface ClinetOnlyProps {
  children: React.ReactNode;
}

export default function ClinetOnly({ children }: ClinetOnlyProps) {
  const isClient = useIsClient();

  return isClient ? children : null;
}
