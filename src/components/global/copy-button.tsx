"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import BubbleButton from "@/components/global/bubble-button";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
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
    <BubbleButton onClick={handleCopyClick}>
      <Icon className="size-4 shrink-0" />
    </BubbleButton>
  );
}
