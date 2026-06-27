import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "disabled";
  size?: "sm" | "md";
  className?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "sm",
  className,
  target,
  rel,
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-sm";

  const variantClasses = {
    primary:
      "bg-indigo-950 text-white border border-indigo-950 hover:bg-transparent hover:text-indigo-950",
    secondary:
      "border border-slate-200 bg-white text-indigo-950 hover:bg-indigo-50/50 gap-2",
    disabled:
      "bg-black/5 text-slate-400 cursor-not-allowed shadow-none",
  };

  const sizeClasses = {
    sm: "py-2 px-5",
    md: "py-3 px-6",
  };

  const isLink = href && variant !== "disabled" && !disabled;
  const actualVariant = disabled || variant === "disabled" ? "disabled" : variant;
  const finalClassName = cn(
    baseClasses,
    variantClasses[actualVariant],
    sizeClasses[size],
    className
  );

  if (isLink) {
    const isExternal = href.startsWith("http") || target === "_blank";
    return (
      <Link
        href={href}
        className={finalClassName}
        target={target}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={finalClassName}
      onClick={disabled || actualVariant === "disabled" ? undefined : onClick}
      disabled={disabled || actualVariant === "disabled"}
    >
      {children}
    </button>
  );
}
