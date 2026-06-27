import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-8 md:py-12 first:pt-0 last:pb-0", className)}
    >
      {children}
    </section>
  );
}
