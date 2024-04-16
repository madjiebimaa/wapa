"use client";

import { Heart } from "lucide-react";
import { forwardRef } from "react";

import { Button, ButtonProps } from "@/components/ui/button";

import { Color } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useColorActions, useLovedColors } from "@/store/color";

interface LoveButtonProps extends ButtonProps {
  id: Color["id"];
}

const LoveButton = forwardRef<HTMLButtonElement, LoveButtonProps>(
  ({ id, className, ...props }, ref) => {
    const lovedColors = useLovedColors();
    const colorActions = useColorActions();

    const handleLoveClick = () => {
      colorActions.loveColor(id);
    };

    const hasLoved = Boolean(lovedColors.find((colorId) => colorId === id));

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn(
          "hover: group/love-button size-fit shrink-0 rounded-full p-0 hover:bg-transparent hover:text-foreground",
          className,
        )}
        onClick={handleLoveClick}
        {...props}
      >
        <Heart
          className={cn(
            "size-4 shrink-0 group-hover/love-button:fill-gray-200",
            hasLoved && "fill-red-400 group-hover/love-button:fill-red-200",
          )}
        />
      </Button>
    );
  },
);
LoveButton.displayName = "LoveButton";

export default LoveButton;
