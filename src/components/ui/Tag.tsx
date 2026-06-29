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
    default: "px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px]",
    mono: "px-1.5 py-0.5 font-mono text-[9px] rounded bg-indigo-50/50 border border-indigo-100/30 text-indigo-600 uppercase font-medium",
    "project-mono": "px-2 py-0.5 font-mono text-[10px] rounded bg-indigo-50/60 border border-indigo-100/30 text-indigo-700 uppercase font-medium",
    featured: "px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] backdrop-blur-md",
    stat: "bg-indigo-50 border border-indigo-100 text-indigo-500 text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-0.5",
    "blog-detail": "text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md",
    tech: "px-1.5 py-0.5 font-mono text-[9px] rounded bg-slate-100 border border-slate-200 text-slate-600 uppercase font-medium",

  };

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {label}
    </span>
  );
}
