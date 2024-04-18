"use client";

import { Brush } from "lucide-react";

import BubbleButton from "@/components/global/bubble-button";

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
    <BubbleButton onClick={handleSelectBackgroundColorClick}>
      <Brush className="size-4 shrink-0" />
    </BubbleButton>
  );
}
