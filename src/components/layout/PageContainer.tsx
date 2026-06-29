import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "default" | "large";
}

export default function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  const maxWidthClass =
    size === "narrow"
      ? "max-w-3xl"
      : size === "large"
      ? "max-w-5xl"
      : "max-w-4xl";

  const paddingClass = size === "large" ? "px-8" : "px-6";

  return (
    <main
      className={cn(
        "w-full mx-auto min-h-screen overflow-x-hidden pt-16 pb-24",
        maxWidthClass,
        paddingClass,
        className
      )}
    >
      {children}
    </main>
  );
}
