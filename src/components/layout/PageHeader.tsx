"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  className,
  animate = true,
}: PageHeaderProps) {
  const content = (
    <div className={cn("mb-10", className)}>
      <h1 className="text-4xl leading-10 font-extrabold text-indigo-900 hover:text-purple-500 transition-colors duration-300 mb-3 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-500 leading-8 text-lg max-w-2xl font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
