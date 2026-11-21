import React from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  variant?: "default" | "mono" | "project-mono" | "featured" | "stat" | "blog-detail";
  className?: string;
}

export default function Tag({ label, variant = "default", className }: TagProps) {
  const baseClasses = "inline-block font-medium tracking-wide";

  const variantClasses = {
    default: "px-2 py-0.5 rounded-full bg-surface-alt border border-line text-accent text-[10px]",
    mono: "px-1.5 py-0.5 font-mono text-[9px] rounded bg-surface-alt/50 border border-line/30 text-accent uppercase font-medium",
    "project-mono": "px-2 py-0.5 font-mono text-[10px] rounded bg-surface-alt/60 border border-line/30 text-accent uppercase font-medium",
    featured: "px-2 py-0.5 rounded-full bg-surface/20 text-white text-[10px] backdrop-blur-md",
    stat: "bg-surface-alt border border-line text-accent text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-0.5",
    "blog-detail": "text-xs px-2 py-1 bg-surface-alt text-accent rounded-md",
    tech: "px-1.5 py-0.5 font-mono text-[9px] rounded bg-sunken border border-line text-muted uppercase font-medium",

  };

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {label}
    </span>
  );
}
