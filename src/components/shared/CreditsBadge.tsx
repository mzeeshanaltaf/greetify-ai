"use client";

import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditsBadgeProps {
  credits: number;
  className?: string;
}

export default function CreditsBadge({ credits, className }: CreditsBadgeProps) {
  const outOfCredits = credits === 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors",
        outOfCredits
          ? "bg-red-500/15 text-red-400 border border-red-500/30"
          : "bg-[#d4a853]/15 text-[#d4a853] border border-[#d4a853]/30",
        className,
      )}
    >
      <Coins className="w-3 h-3" />
      {outOfCredits ? "Out of credits" : `${credits} left`}
    </span>
  );
}
