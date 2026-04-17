"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "coral" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  asChild?: boolean;
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "gold", size = "md", children, href, onClick, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-full transition-all duration-300 cursor-pointer select-none relative overflow-hidden group";

    const variants = {
      gold: "bg-gradient-to-r from-[#d4a853] via-[#f0c96d] to-[#c49240] text-[#0d0b18] shadow-[0_0_30px_rgba(212,168,83,0.35)] hover:shadow-[0_0_45px_rgba(212,168,83,0.55)] hover:scale-[1.03] active:scale-[0.98]",
      coral:
        "bg-gradient-to-r from-[#e86f4e] via-[#f07c58] to-[#c95a38] text-white shadow-[0_0_30px_rgba(232,111,78,0.35)] hover:shadow-[0_0_45px_rgba(232,111,78,0.55)] hover:scale-[1.03] active:scale-[0.98]",
      outline:
        "border border-[#d4a853]/40 text-[#d4a853] bg-transparent hover:bg-[#d4a853]/10 hover:border-[#d4a853]/70 hover:scale-[1.03] active:scale-[0.98]",
      ghost:
        "text-[#f7f3ee]/70 bg-white/5 hover:bg-white/10 hover:text-[#f7f3ee] hover:scale-[1.03] active:scale-[0.98]",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-7 py-3.5",
      xl: "text-lg px-9 py-4.5",
    };

    const disabledClass = disabled
      ? "opacity-50 pointer-events-none"
      : "";

    const classes = cn(base, variants[variant], sizes[size], disabledClass, className);

    if (href) {
      return (
        <a href={href} className={classes}>
          <span className="relative z-10 flex items-center gap-2">{children}</span>
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      </button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
