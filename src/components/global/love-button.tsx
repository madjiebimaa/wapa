"use client";

import { Heart } from "lucide-react";
import { forwardRef } from "react";

import BubbleButton from "@/components/global/bubble-button";
import { ButtonProps } from "@/components/ui/button";

import { Color } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useColorActions, useLovedColors } from "@/store/color";

interface LoveButtonProps extends ButtonProps {
  colorId: Color["id"];
}

const LoveButton = forwardRef<HTMLButtonElement, LoveButtonProps>(
  ({ colorId, className, ...props }, ref) => {
    const lovedColors = useLovedColors();
    const colorActions = useColorActions();

    const handleLoveClick = () => {
      colorActions.loveColor(colorId);
    };

    const hasLoved = lovedColors.includes(colorId);

    return (
      <BubbleButton
        ref={ref}
        className={cn("group/love-button", className)}
        onClick={handleLoveClick}
        {...props}
      >
        <Heart
          className={cn(
            "size-4 shrink-0 group-hover/love-button:fill-gray-200",
            hasLoved && "fill-red-400 group-hover/love-button:fill-red-200",
          )}
        />
      </BubbleButton>
    );
  },
);
LoveButton.displayName = "LoveButton";

export default LoveButton;
