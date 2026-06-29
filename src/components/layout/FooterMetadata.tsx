import React from "react";
import { cn } from "@/lib/utils";

interface FooterMetadataProps {
  className?: string;
  children?: React.ReactNode;
  updatedText?: string;
}

export default function FooterMetadata({
  className,
  children,
  updatedText = "Updated June 2026",
}: FooterMetadataProps) {
  return (
    <div
      className={cn(
        "mt-12 pt-6 border-t border-gray-100 flex flex-wrap justify-between items-center gap-2 text-xs text-gray-400 font-mono",
        className
      )}
    >
      <span>{updatedText}</span>
      {children && <div className="flex gap-4">{children}</div>}
    </div>
  );
}
