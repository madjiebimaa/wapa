"use client";

import { Brush } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Color } from "@/lib/types";
import { useColorActions } from "@/store/color";

interface SelectBackgroundColorButtonProps {
  hexCode: Color["hexCode"];
}

export default function SelectBackgroundColorButton({
  hexCode,
}: SelectBackgroundColorButtonProps) {
  const colorActions = useColorActions();

  const handleSelectBackgroundColorClick = () => {
    colorActions.selectBackgroundColor(hexCode);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="shrink-0 rounded-full hover:bg-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-0"
      onClick={handleSelectBackgroundColorClick}
    >
      <Brush className="size-4 shrink-0" />
    </Button>
  );
}
