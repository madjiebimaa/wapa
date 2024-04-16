"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

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
    <Button
      variant="ghost"
      size="icon"
      className="shrink-0 rounded-full bg-white hover:bg-gray-200 focus-visible:ring-offset-0"
      onClick={handleCopyClick}
    >
      <Icon className="size-4 shrink-0" />
    </Button>
  );
}
