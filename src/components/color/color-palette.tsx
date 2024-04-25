"use client";

import { Variants, motion } from "framer-motion";

import ColorPaletteTools from "@/components/color/color-palette-tools";
import LoveButton from "@/components/global/love-button";

import { Color } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ColorPaletteProps {
  color: Color;
  index: number;
}

export default function ColorPalette({ color, index }: ColorPaletteProps) {
  const showWhenHoverStyle =
    "invisible opacity-0 transition-all duration-300 ease-in group-hover/color-palette:visible group-hover/color-palette:opacity-100 group-hover/color-palette:transition-all group-hover/color-palette:duration-500 group-hover/color-palette:ease-out";

  const paletteVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      transition: { type: "spring", duration: 2 },
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <motion.div
      layout
      variants={paletteVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      custom={index}
      className="group/color-palette relative flex min-w-[130px] max-w-[130px] flex-col items-center justify-center gap-2"
    >
      <LoveButton
        colorId={color.id}
        variant="ghost"
        className={cn(
          "absolute right-0 top-0 size-fit bg-transparent p-0 text-secondary-foreground hover:bg-transparent hover:text-foreground",
          showWhenHoverStyle,
        )}
      />
      <div
        style={{ background: color.hexCode }}
        className="size-20 rounded-full shadow-md transition-transform duration-300 ease-in group-hover/color-palette:scale-110 group-hover/color-palette:transition-transform group-hover/color-palette:duration-500 group-hover/color-palette:ease-out"
      />
      <div className="flex w-full items-center justify-between">
        <span className="text-xs">{color.name}</span>
        <span className="text-xs">{color.code}</span>
      </div>
      <ColorPaletteTools
        colorId={color.id}
        hexCode={color.hexCode}
        className={showWhenHoverStyle}
      />
    </motion.div>
  );
}
