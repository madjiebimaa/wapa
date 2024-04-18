"use client";

import Link from "next/link";
import { useState } from "react";

import { Color } from "@/lib/types";
import { cn, getOppositeContrast, hexCodeToRGB } from "@/lib/utils";

interface ColorLinkProps {
  color: Color;
}

export default function ColorLink({ color }: ColorLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { r, g, b } = hexCodeToRGB(color.hexCode);

  return (
    <Link
      href={`/colors/${color.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${isHovered ? 0.7 : 1})`,
      }}
      className={cn(
        "flex items-center justify-between p-2 shadow-md hover:bg-transparent/50",
        getOppositeContrast(color.hexCode),
      )}
    >
      <span>{color.name}</span>
      <span>{color.code}</span>
    </Link>
  );
}
