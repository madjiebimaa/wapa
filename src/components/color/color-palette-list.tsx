"use client";

import { AnimatePresence, motion } from "framer-motion";

import ColorPalette from "@/components/color/color-palette";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useFilteredColors } from "@/store/color";

export default function ColorPaletteList() {
  const colors = useFilteredColors();

  return (
    <ScrollArea className="flex-1">
      <AnimatePresence mode="popLayout">
        <motion.section
          layout
          className="grid grid-cols-2 justify-items-center gap-4 overflow-hidden p-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-10"
        >
          {colors.map((color, index) => (
            <ColorPalette key={color.id} color={color} index={index} />
          ))}
        </motion.section>
      </AnimatePresence>
    </ScrollArea>
  );
}
