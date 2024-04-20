"use client";

import { Check, Copy } from "lucide-react";
import { forwardRef, useState } from "react";

import BubbleButton from "@/components/global/bubble-button";
import { ButtonProps } from "@/components/ui/button";

interface CopyButtonProps extends ButtonProps {
  text: string;
}

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ text, ...props }, ref) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    };

    const Icon = isCopied ? Check : Copy;

    return (
      <BubbleButton ref={ref} onClick={handleCopyClick} {...props}>
        <Icon className="size-4 shrink-0" />
      </BubbleButton>
    );
  },
);
CopyButton.displayName = "CopyButton";

export default CopyButton;
