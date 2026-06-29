import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  label: string;
  sub?: string;
  className?: string;
}

export default function StatCard({
  value,
  label,
  sub,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-indigo-50 border border-indigo-100 rounded-lg p-5 flex flex-col gap-1",
        className
      )}
    >
      <span className="text-3xl font-extrabold text-indigo-900">{value}</span>
      <span className="text-xs font-semibold text-indigo-700 uppercase tracking-widest">
        {label}
      </span>
      {sub && <span className="text-xs text-indigo-400">{sub}</span>}
    </div>
  );
}
