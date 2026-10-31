"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollHint({ targetId }: { targetId?: string }) {
  const scroll = () => {
    const el = targetId ? document.getElementById(targetId) : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center mt-1">
      <motion.div
        className="flex flex-col items-center cursor-pointer select-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0.8, 1], y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        onClick={scroll}
      >
        <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </motion.div>
    </div>
  );
}
