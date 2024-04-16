"use client";

import ColorPaletteList from "@/components/color/color-palette-list";

import { useSelectedBackgroundColor } from "@/store/color";

export default function Home() {
  const selectedBackgroundColor = useSelectedBackgroundColor();

  return (
    <main
      style={{ backgroundColor: selectedBackgroundColor }}
      className="flex h-screen flex-col"
    >
      <ColorPaletteList />
    </main>
  );
}
